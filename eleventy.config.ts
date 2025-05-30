// This file is the entry point for all 11ty configuration.
// It configures the core 11ty behavior and registers
// plugins and customization that live in `/src/_11ty`.

import { registerFilters } from './src/_11ty/filters.js';
import { registerShortcodes } from './src/_11ty/shortcodes.js';
import { markdown } from './src/_11ty/plugins/markdown.js';
import { configureHighlighting } from './src/_11ty/plugins/highlight.js';
import { UserConfig } from '@11ty/eleventy';

import swcHtml from '@swc/html';
import yaml from 'js-yaml';
import { EleventyRenderPlugin } from '@11ty/eleventy';

import * as path from 'node:path';
import * as sass from 'sass';

// noinspection JSUnusedGlobalSymbols
export default function (eleventyConfig: UserConfig) {
  const isProduction = process.env['PRODUCTION'] === 'true';
  const shouldOptimize = process.env['OPTIMIZE'] === 'true';

  eleventyConfig.on('eleventy.before', async () => {
    await configureHighlighting(markdown);
  });

  eleventyConfig.addGlobalData('isProduction', isProduction);

  eleventyConfig.setLibrary('md', markdown);

  eleventyConfig.addDataExtension('yml,yaml', (contents: string) =>
      yaml.load(contents),
  );

  eleventyConfig.setLiquidOptions({
    cache: true,
    strictFilters: true,
    lenientIf: true,
    jekyllInclude: true,
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  registerFilters(eleventyConfig);
  registerShortcodes(eleventyConfig);

  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addWatchTarget('src/_sass');
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    compile: function (inputContent: string, inputPath: string) {
      const parsedPath = path.parse(inputPath);
      if (parsedPath.name.startsWith('_')) {
        return;
      }

      const result = sass.compileString(inputContent, {
        style: shouldOptimize ? 'compressed' : 'expanded',
        quietDeps: true,
        loadPaths: [parsedPath.dir, 'src/_sass'],
      });

      const dependencies = result.loadedUrls
        .filter(
          (loadedUrl) =>
            loadedUrl.protocol === 'file:' && loadedUrl.pathname !== '',
        )
        .map((url) => path.relative('.', url.pathname));

      this.addDependencies(inputPath, dependencies);

      return () => result.css;
    },
  });

  eleventyConfig.addPassthroughCopy('src/content/assets/js');
  // inject_dartpad 暂时放置在本地 tool/inject_dartpad/
  // eleventyConfig.addPassthroughCopy({'site-shared/pkgs/inject_dartpad/lib/inject_dartpad.js': 'assets/js/inject_dartpad.js'});
  eleventyConfig.addPassthroughCopy({'tool/inject_dartpad/lib/inject_dartpad.js': 'assets/js/inject_dartpad.js'});
  eleventyConfig.addPassthroughCopy('src/content/assets/images', { expand: true });
  // docs.flutter.cn - translator
  eleventyConfig.addPassthroughCopy('src/content/assets/translator');
  eleventyConfig.addPassthroughCopy('src/content/cookbook/img-files', { expand: true });
  eleventyConfig.addPassthroughCopy('src/content/f', {
    expand: true,
    filter: /^(?!_).+/,
  });
  eleventyConfig.addPassthroughCopy('src/content/tools/devtools/release-notes', {
    filter: (path: string) => path.includes('src') || path.includes('images'),
  });

  if (shouldOptimize) {
    // If building for production, minify/optimize the HTML output.
    // Doing so during serving isn't worth the extra build time.
    eleventyConfig.addTransform('minify-html', async function (content: string) {
      if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
        // Minify the page's content if it's an HTML file.
        // Other options can be enabled, but each should be tested.

        const minifiedHtml = await swcHtml.minify(content, {
          scriptingEnabled: true,
          removeComments: true,
          collapseWhitespaces: 'smart',
          removeRedundantAttributes: 'smart',
          minifyCss: true,
          minifyConditionalComments: true,
          quotes: true,
        });

        return minifiedHtml.code;
      }

      return content;
    });
  }

  eleventyConfig.setQuietMode(true);

  eleventyConfig.setServerOptions({
    port: 4000,
    watch: ['src/_sass'],
  });

  return {
    htmlTemplateEngine: 'liquid',
    dir: {
      input: 'src/content',
      output: '_site',
      layouts: '../_layouts',
      includes: '../_includes',
      data: '../_data',
    },
  };
}
