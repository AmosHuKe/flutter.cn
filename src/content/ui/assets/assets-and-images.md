---
# title: Adding assets and images
title: 添加资源和图片
# description: How to use images (and other assets) in your Flutter app.
description: 如何在你的 Flutter 应用中使用图片或者其他类型的资源。
# short-title: Assets and images
short-title: 资源和图片
tags: 用户界面,Flutter UI,布局
keywords: Flutter资源优化,添加图片
---

<?code-excerpt path-base="ui/assets_and_images/lib"?>

Flutter apps can include both code and _assets_
(sometimes called resources). An asset is a file
that is bundled and deployed with your app,
and is accessible at runtime. Common types of assets include
static data (for example, JSON files),
configuration files, icons, and images
(JPEG, WebP, GIF, animated WebP/GIF, PNG, BMP, and WBMP).

Flutter 应用程序包含代码和 **assets**（也为资源）。资源是被打包到应用程序安装包中，
可以在运行时访问的一种文件。常见的资源类型包括静态数据（例如 JSON 文件），配置文件，图标和
图片（JPEG，WebP，GIF，动画 WebP / GIF，PNG，BMP 和 WBMP）。

## Specifying assets

## 指定资源

Flutter uses the [`pubspec.yaml`][] file,
located at the root of your project,
to identify assets required by an app.

Flutter 使用 [`pubspec.yaml`][] 文件，
位于项目根目录，来识别应用程序所需的资源。

Here is an example:

下面举个例子:

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

To include all assets under a directory,
specify the directory name with the `/` character at the end:

如果要包含一个目录下的所有 assets，
需要在目录名称的结尾加上  `/`：

```yaml
flutter:
  assets:
    - directory/
    - directory/subdirectory/
```

:::note

Only files located directly in the directory are included.
[Resolution-aware asset image variants](#resolution-aware) are the only exception.
To add files located in subdirectories, create an entry per directory.

仅包含当前目录下的所有文件，以及子目录下（与主目录中的文件）的同名文件
（请参阅 [Asset 变体](#resolution-aware)）。如果想要添加子文件夹中的文件，
请为每个目录创建一个条目。

:::

:::note

Indentation matters in YAML. If you see an error like
`Error: unable to find directory entry in pubspec.yaml`
then you _might_ have indented incorrectly in your
pubspec file. Consider the following [broken] example:

YAML 中的缩进很重要。如果你看到类似 
`Error: unable to find directory entry in pubspec.yaml`
这样的错误，那么你 _可能_ 在 pubspec 文件中存在缩进错误。
请看下面这个 [错误] 的例子：

```yaml
flutter:
assets:
  - directory/
```

The `assets:` line should be indented by exactly
two spaces below the `flutter:` line:

`assets:` 这一行应该在 `flutter:` 下方缩进两个空格：

```yaml
flutter:
  assets:
    - directory/
```

:::

### Asset bundling

### Asset bundling (应用打包资源)

The `assets` subsection of the `flutter` section
specifies files that should be included with the app.
Each asset is identified by an explicit path
(relative to the `pubspec.yaml` file) where the asset
file is located. The order in which the assets are
declared doesn't matter. The actual directory name used
(`assets` in first example or `directory` in the above
example) doesn't matter.

`yaml` 文件 `flutter` 下面的 `assets` 部分指定了需要包含在应用中的文件。
每个资源都通过相对于 `pubspec.yaml` 文件所在位置的路径进行标识。
资源的声明顺序是无关紧要的。
资源的实际目录可以是任意文件夹（在第一个样例中是 `assets`，其他的是 `directory`）

During a build, Flutter places assets into a special
archive called the _asset bundle_ that apps read
from at runtime.

在一次构建中，Flutter 将 assets 放到 **asset bundle**
的特殊归档中，以便应用在运行时读取它们。

### Automatic transformation of asset files at build time

Flutter supports using a Dart package to transform asset files when building your app.
To do this, specify the asset files and transformer package in your pubspec file.
To learn how to do this and write your own asset-transforming packages, see
[Transforming assets at build time][].

## Loading assets

## 加载 assets

Your app can access its assets through an
[`AssetBundle`][] object.

你的应用程序可以通过 [`AssetBundle`][] 对象访问其资源。

The two main methods on an asset bundle allow you to load a
string/text asset (`loadString()`) or an image/binary asset (`load()`)
out of the bundle, given a logical key. The logical key maps to the path
to the asset specified in the `pubspec.yaml` file at build time.

Asset bundle 通过指定一个逻辑键（key），允许你读取 string/text（`loadString`）
和 image/binary（`load`）。在编译期间，
这个逻辑键（key）会映射在 `pubspec.yaml` 中指定的资源路径。

### Loading text assets

### 加载文本 assets

Each Flutter app has a [`rootBundle`][]
object for easy access to the main asset bundle.
It is possible to load assets directly using the
`rootBundle` global static from
`package:flutter/services.dart`.

每个 Flutter 应用程序都有一个 [`rootBundle`][] 对象， 
可以轻松访问主资源 bundle 。还可以直接使用
`package:flutter/services.dart` 中
全局静态的 `rootBundle` 来加载资源。

However, it's recommended to obtain the `AssetBundle`
for the current `BuildContext` using
[`DefaultAssetBundle`][], rather than the default
asset bundle that was built with the app; this
approach enables a parent widget to substitute a
different `AssetBundle` at run time,
which can be useful for localization or testing
scenarios.

但是，如果获取当前 `BuildContext` 的 `AssetBundle`，建议
使用 [`DefaultAssetBundle`][]。
这种方式不是使用应用程序构建的默认资源 bundle，而是让父级 widget 在
运行时替换的不同的 AssetBundle，这对于本地化或测试场景很有用。

Typically, you'll use `DefaultAssetBundle.of()`
to indirectly load an asset, for example a JSON file,
from the app's runtime `rootBundle`.

通常，你可以从应用程序运行时的 `rootBundle` 中，间接使用 `DefaultAssetBundle.of()` 
来加载资源（例如 JSON 文件）。

{% comment %}
  Need example here to show obtaining the AssetBundle for the current
  BuildContext using DefaultAssetBundle.of
{% endcomment %}

Outside of a `Widget` context, or when a handle
to an `AssetBundle` is not available,
you can use `rootBundle` to directly load such assets.
For example:

在 Widget 上下文之外，或 AssetBundle 的句柄不可用时，你可以使用 `rootBundle` 
直接加载这些 assets，例如：

<?code-excerpt "main.dart (root-bundle-load)"?>
```dart
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### Loading images

### 加载图片

To load an image, use the [`AssetImage`][]
class in a widget's `build()` method.

你可以在 `build()` 方法中使用 [`AssetImage`][] 加载图片。

For example, your app can load the background
image from the asset declarations in the previous example:

举个例子，下面的代码加载了先前声明的背景图片：

<?code-excerpt "main.dart (background-image)"?>
```dart
return const Image(image: AssetImage('assets/background.png'));
```

### Resolution-aware image assets {:#resolution-aware}

### 分辨率自适应图片资源

Flutter can load resolution-appropriate images for
the current [device pixel ratio][].

Flutter 可以为当前设备加载适合其
[设备像素比][device pixel ratio] 的图像。

[`AssetImage`][] will map a logical requested
asset onto one that most closely matches the current
[device pixel ratio][].

[`AssetImage`][] 可以将请求资源映射到最接近当前
[设备像素比][device pixel ratio] 的资源。

For this mapping to work, assets should be arranged
according to a particular directory structure:

为了使这种映射起作用，资源应该根据特定的目录结构来保存：

```plaintext
.../image.png
.../Mx/image.png
.../Nx/image.png
...etc.
```

Where _M_ and _N_ are numeric identifiers that correspond
to the nominal resolution of the images contained within.
In other words, they specify the device pixel ratio that
the images are intended for.

其中 _M_ 和 _N_  是数字标识符，对应于其中包含的图像的分辨率，换句话说，
它们指定不同设备像素比例的图片。

In this example, `image.png` is considered the *main asset*,
while `Mx/image.png` and `Nx/image.png` are considered to be
*variants*.

在示例中，`image.png` 是 **主资源**，
而 `Mx/image.png` 和 `Nx/image.png` 则被认为是 **变体**。

The main asset is assumed to correspond to a resolution of 1.0.
For example, consider the following asset layout for an
image named `my_icon.png`:

主资源默认对应于 1.0 倍的分辨率图片。比如下面的图片 `my_icon.png`：

```plaintext
.../my_icon.png       (mdpi baseline)
.../1.5x/my_icon.png  (hdpi)
.../2.0x/my_icon.png  (xhdpi)
.../3.0x/my_icon.png  (xxhdpi)
.../4.0x/my_icon.png  (xxxhdpi)
```

On devices with a device pixel ratio of 1.8, the asset
`.../2.0x/my_icon.png` is chosen.
For a device pixel ratio of 2.7, the asset
`.../3.0x/my_icon.png` is chosen.

而在设备像素比率为 1.8 的设备上，对应是 `.../2.0x/my_icon.png` 。
如果是 2.7 的设备像素比，对应是 `.../3.0x/my_icon.png` 。

If the width and height of the rendered image are not specified
on the `Image` widget, the nominal resolution is used to scale
the asset so that it occupies the same amount of screen space
as the main asset would have, just with a higher resolution.
That is, if `.../my_icon.png` is 72px by 72px, then
`.../3.0x/my_icon.png` should be 216px by 216px;
but they both render into 72px by 72px (in logical pixels),
if width and height are not specified.

如果在 `Image` widget 上未指定渲染图像的宽度和高度，
通常会扩展资源来保证与主资源相同的屏幕空间量，
并不是相同的物理像素，只是分辨率更高。
换句话说，`.../my_icon.png` 是 72 px 乘 72 px，
那么 `.../3.0x/my_icon.png` 应该是 216 px 乘 216 px；
但如果未指定宽度和高度，
它们都将渲染为 72 px 乘 72 px（以逻辑像素为单位）。

:::note

[Device pixel ratio][] depends on [MediaQueryData.size][], which requires having either
[MaterialApp][] or [CupertinoApp][] as an ancestor of your [`AssetImage`][].

[设备像素比][device pixel ratio] 依赖于 [MediaQueryData.size][]，
它们需要你的 [`AssetImage`][] 的上层节点中存在 [MaterialApp][] 或者 [CupertinoApp][]。 

:::

#### Bundling of resolution-aware image assets {:#resolution-aware-bundling}

You only need to specify the main asset or its parent directory
in the `assets` section of `pubspec.yaml`.
Flutter bundles the variants for you.
Each entry should correspond to a real file, with the exception of
the main asset entry. If the main asset entry doesn't correspond
to a real file, then the asset with the lowest resolution
is used as the fallback for devices with device pixel
ratios below that resolution. The entry should still
be included in the `pubspec.yaml` manifest, however.

你只需要在 `pubspec.yaml` 的 `assets` 部分指定主要资源，
Flutter 会自动帮你绑定其他变体。
在 `pubspec.yaml` 中资源部分的每一项都应与实际文件相对应，
除过主资源节点。当主资源缺少某个文件时，会按分辨率从低到高的顺序去选择，
也就是说 1x 中没有的话会在 2x 中找，2x 中还没有的话就在 3x 中找。
该条目需要在 `pubspec.yaml` 中指定。

Anything using the default asset bundle inherits resolution
awareness when loading images. (If you work with some of the lower
level classes, like [`ImageStream`][] or [`ImageCache`][],
you'll also notice parameters related to scale.)

使用默认的资源 bundle 加载资源时，系统会自动处理分辨率等。
（如果你使用一些更低级别的类，如 [`ImageStream`][] 或
[`ImageCache`][]，你需要注意 scale 相关的参数）。

### Asset images in package dependencies {:#from-packages}

### 依赖包中的资源图片

To load an image from a [package][] dependency,
the `package` argument must be provided to [`AssetImage`][].

加载依赖 [package][] 中的图像，
必须给 [`AssetImage`][] 提供 `package` 参数。

For instance, suppose your application depends on a package
called `my_icons`, which has the following directory structure:

例如，你的应用程序依赖于一个名为 `my_icons` 的 package，它的目录结构如下：

```plaintext
.../pubspec.yaml
.../icons/heart.png
.../icons/1.5x/heart.png
.../icons/2.0x/heart.png
...etc.
```

To load the image, use:

然后加载 image, 使用：

<?code-excerpt "main.dart (package-image)"?>
```dart
return const AssetImage('icons/heart.png', package: 'my_icons');
```

Assets used by the package itself should also be fetched
using the `package` argument as above.

package 使用本身的 Assets 也需要加上 `package` 参数来获取。

#### Bundling of package assets

#### 打包 assets

If the desired asset is specified in the `pubspec.yaml`
file of the package, it's bundled automatically with the
application. In particular, assets used by the package
itself must be specified in its `pubspec.yaml`.

如果期望的资源文件被指定在 package 的 `pubspec.yaml` 文件中，它会被自动打包到应用程序中。
特别是，package 本身使用的资源必须在 `pubspec.yaml` 中指定。

A package can also choose to have assets in its `lib/`
folder that are not specified in its `pubspec.yaml` file.
In this case, for those images to be bundled,
the application has to specify which ones to include in its
`pubspec.yaml`. For instance, a package named `fancy_backgrounds`
could have the following files:

package 也可以选择在其 `lib/`
文件夹中包含未在 `pubspec.yaml` 文件中声明的资源。
在这种情况下，对于要打包的图片，
应用程序必须在 `pubspec.yaml` 中指定包含哪些图像。 
例如，一个名为 `fancy_backgrounds` 的包，
可能包含以下文件：

```plaintext
.../lib/backgrounds/background1.png
.../lib/backgrounds/background2.png
.../lib/backgrounds/background3.png
```

To include, say, the first image, the `pubspec.yaml` of the
application should specify it in the `assets` section:

总而言之，要包含第一张图像，必须在 `pubspec.yaml` 的 `assets` 部分中声明它：

```yaml
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

The `lib/` is implied,
so it should not be included in the asset path.

`lib/` 是隐含的，所以它不应该包含在资源路径中。

If you are developing a package, to load an asset within the package, specify it in the `pubspec.yaml` of the package:

如果你正在开发 package，想要从 package 中加载资源，首先要在 `pubspec.yaml` 中定义：

```yaml
flutter:
  assets:
    - assets/images/
```

To load the image within your package, use:

在 package 中加载图片，按以下方式：

```dart
return const AssetImage('packages/fancy_backgrounds/backgrounds/background1.png');
```

## Sharing assets with the underlying platform

## 平台共享 assets

Flutter assets are readily available to platform code
using the `AssetManager` on Android and `NSBundle` on iOS.

在不同平台读取 Flutter assets，
Android 是通过 `AssetManager`，iOS 是 `NSBundle`。

### Loading Flutter assets in Android

### 在 Android 中加载 Flutter 资源文件

On Android the assets are available through the
[`AssetManager`][] API.  The lookup key used in,
for instance [`openFd`][], is obtained from
`lookupKeyForAsset` on [`PluginRegistry.Registrar`][] or
`getLookupKeyForAsset` on [`FlutterView`][].
`PluginRegistry.Registrar` is available when developing a plugin
while `FlutterView` would be the choice when developing an
app including a platform view.

在 Android 平台上，assets 通过 [`AssetManager`][] API 读取。
通过 [`PluginRegistry.Registrar`][] 的 `lookupKeyForAsset` 方法，
或者 [`FlutterView`][] 的 `getLookupKeyForAsset` 方法来获取文件路径，
然后 [`AssetManager`][] 的 [`openFd`][] 根据文件路径得到文件描述符。
开发插件时可以使用 `PluginRegistry.Registrar`，
而开发应用程序使用平台视图时，[`FlutterView`][] 是最好的选择。

As an example, suppose you have specified the following
in your pubspec.yaml

举个例子，假设你在 pubspec.yaml 中这样指定：

```yaml
flutter:
  assets:
    - icons/heart.png
```

This reflects the following structure in your Flutter app.

在你的 Flutter 应用程序对应以下结构。

```plaintext
.../pubspec.yaml
.../icons/heart.png
...etc.
```

To access `icons/heart.png` from your Java plugin code,
do the following:

想要在 Java 插件中访问 `icons/heart.png`；

```java
AssetManager assetManager = registrar.context().getAssets();
String key = registrar.lookupKeyForAsset("icons/heart.png");
AssetFileDescriptor fd = assetManager.openFd(key);
```

### Loading Flutter assets in iOS

### 在 iOS 中加载 Flutter 资源文件

On iOS the assets are available through the [`mainBundle`][].
The lookup key used in, for instance [`pathForResource:ofType:`][],
is obtained from `lookupKeyForAsset` or `lookupKeyForAsset:fromPackage:`
on [`FlutterPluginRegistrar`][], or `lookupKeyForAsset:` or
`lookupKeyForAsset:fromPackage:` on [`FlutterViewController`][].
`FlutterPluginRegistrar` is available when developing
a plugin while `FlutterViewController` would be the choice
when developing an app including a platform view.

在 iOS 平台上，assets 资源文件通过 [`mainBundle`][] 读取。
通过 [`pathForResource:ofType:`][] 的 `lookupKeyForAsset` 
或者 `lookupKeyForAsset:fromPackage:` 方法获取文件路径，
同样，[`FlutterViewController`][] 的 `lookupKeyForAsset:` 
或者 `lookupKeyForAsset:fromPackage:` 方法也可以获取文件路径。
开发插件时可以使用 `FlutterPluginRegistrar`，
而开发应用程序使用平台视图时， `FlutterViewController` 是最好的选择。

As an example, suppose you have the Flutter setting from above.

举个例子，假设你的 Flutter 配置和上面一样。

To access `icons/heart.png` from your Objective-C plugin code you
would do the following:

要在 Objective-C 插件中访问 `icons/heart.png`：

```objc
NSString* key = [registrar lookupKeyForAsset:@"icons/heart.png"];
NSString* path = [[NSBundle mainBundle] pathForResource:key ofType:nil];
```

To access `icons/heart.png` from your Swift app you
would do the following:

要在 Swift 应用程序中访问 `icons/heart.png`：

```swift
let key = controller.lookupKey(forAsset: "icons/heart.png")
let mainBundle = Bundle.main
let path = mainBundle.path(forResource: key, ofType: nil)
```

For a more complete example, see the implementation of the
Flutter [`video_player` plugin][] on pub.dev.

这有一个更完整的实例可以理解 Flutter 的应用：
pub.dev 上的 [`video_player` plugin][] 实现。

### Loading iOS images in Flutter

### 在 Flutter 中加载 iOS 的图片

When implementing Flutter by
[adding it to an existing iOS app][add-to-app],
you might have images hosted in iOS that you
want to use in Flutter. To accomplish
that, use [platform channels][] to pass the image
data to Dart as `FlutterStandardTypedData`.

在实现 [将 Flutter 添加到现有 iOS 应用][add-to-app] 时，
你可能会有一些托管在 iOS 中的图片，
而你希望在 Flutter 中使用这些图片。
为此，请使用 [平台通道][platform channels] 
将图像数据作为 `FlutterStandardTypedData` 传递给 Dart。

## Platform assets

## 平台 assets

There are other occasions to work with assets in the
platform projects directly. Below are two common cases
where assets are used before the Flutter framework is
loaded and running.

某些场景可以直接在平台项目中使用 assets。
以下是在 Flutter 框架加载并运行之前使用资源的两种常见情况。

### Updating the app icon

### 更新桌面图标

Updating a Flutter application's launch icon works
the same way as updating launch icons in native
Android or iOS applications.

更新你的 Flutter 应用程序启动图标，
和原生 Android 或 iOS 应用程序中更新启动图标的方法相同。

![Launch icon](/assets/images/docs/assets-and-images/icon.png)

#### Android

In your Flutter project's root directory, navigate to
`.../android/app/src/main/res`. The various bitmap resource
folders such as `mipmap-hdpi` already contain placeholder
images named `ic_launcher.png`. Replace them with your
desired assets respecting the recommended icon size per
screen density as indicated by the [Android Developer Guide][].

在 Flutter 项目的根目录中，导航到 `.../android/app/src/main/res` 路径。
各种位图资源文件夹，比如 `mipmap-hdpi`，已包含占位符图像 `ic_launcher.png`。 
只需按照 [Android 开发者指南][Android Developer Guide] 中的说明，
将其替换为所需的资源，并遵守每种屏幕分辨率的建议图标大小标准。

![Android icon location](/assets/images/docs/assets-and-images/android-icon-path.png)

:::note

If you rename the `.png` files, you must also update the
corresponding name in your `AndroidManifest.xml`'s
`<application>` tag's `android:icon` attribute.

如果你重命名了 `.png` 文件，则还必须在 `AndroidManifest.xml` 
中 `<application>` 标签的 `android:icon` 属性中更新名称。

:::

#### iOS

In your Flutter project's root directory,
navigate to `.../ios/Runner`. The
`Assets.xcassets/AppIcon.appiconset` directory already contains
placeholder images. Replace them with the appropriately
sized images as indicated by their filename as dictated by the
Apple [Human Interface Guidelines][].
Keep the original file names.

在你的 Flutter 项目的根目录中，导航到 `.../ios/Runner` 路径。
该目录中 `Assets.xcassets/AppIcon.appiconset`已经包含占位符图片，
只需将它们替换为适当大小的图片，
并且根据 [iOS 开发指南][Human Interface Guidelines]，文件名称保持不变。

![iOS icon location](/assets/images/docs/assets-and-images/ios-icon-path.png)

### Updating the launch screen

### 更新启动图

<p align="center">
  <img src="/assets/images/docs/assets-and-images/launch-screen.png" alt="Launch screen" />
</p>

Flutter also uses native platform mechanisms to draw
transitional launch screens to your Flutter app while the
Flutter framework loads. This launch screen persists until
Flutter renders the first frame of your application.

在 Flutter 框架加载时，Flutter 会使用原生平台机制绘制启动页。
此启动页将持续到 Flutter 渲染应用程序的第一帧。

:::note

This implies that if you don't call [`runApp()`][] in the
`main()` function of your app (or more specifically,
if you don't call [`FlutterView.render()`][] in response to
[`PlatformDispatcher.onDrawFrame`][]),
the launch screen persists forever.

这意味着如果你不在应用程序的 `main()` 方法中调用 [`runApp()`][] 函数
（或者更具体地说，如果你不调用 [`FlutterView.render()`][] 去响应 
[`PlatformDispatcher.onDrawFrame`][] 的话， 启动页将永远持续显示。

:::

[`FlutterView.render()`]: {{site.api}}/flutter/dart-ui/FlutterView/render.html
[`PlatformDispatcher.onDrawFrame`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher/onDrawFrame.html

#### Android

To add a launch screen (also known as "splash screen") to your
Flutter application, navigate to `.../android/app/src/main`.
In `res/drawable/launch_background.xml`,
use this [layer list drawable][] XML to customize
the look of your launch screen. The existing template provides
an example of adding an image to the middle of a white splash
screen in commented code. You can uncomment it or use other
[drawables][] to achieve the intended effect.

将启动屏幕「splash screen」添加到你的 Flutter 应用程序， 
请导航至 `.../android/app/src/main` 路径。
在 `res/drawable/launch_background.xml` 文件中 ，通过使用
[图层列表][layer list drawable]  XML 来实现自定义启动页。
现有模板提供了一个示例，用于将图片添加到白色启动页的中间（注释代码中）。
你也可以取消注释使用 [可绘制对象资源][drawables] 来实现预期效果。

For more details, see
[Adding a splash screen to your Android app][].

更多详细信息，请查看
[在 Android 应用中添加闪屏页与启动页][Adding a splash screen to your Android app]。

#### iOS

To add an image to the center of your "splash screen",
navigate to `.../ios/Runner`.
In `Assets.xcassets/LaunchImage.imageset`,
drop in images named `LaunchImage.png`,
`LaunchImage@2x.png`, `LaunchImage@3x.png`.
If you use different filenames,
update the `Contents.json` file in the same directory.

将图片添加到启动屏幕「splash screen」的中心，请导航至 `.../ios/Runner` 路径。
在 `Assets.xcassets/LaunchImage.imageset` ，拖入图片，
并命名为 `LaunchImage.png`， `LaunchImage@2x.png`，`LaunchImage@3x.png`。 
如果你使用不同的文件名，
那你还必须更新同一目录中的 `Contents.json` 文件中对应的名称。

You can also fully customize your launch screen storyboard
in Xcode by opening `.../ios/Runner.xcworkspace`.
Navigate to `Runner/Runner` in the Project Navigator and
drop in images by opening `Assets.xcassets` or do any
customization using the Interface Builder in
`LaunchScreen.storyboard`.

你也可以通过打开 `.../ios/Runner.xcworkspace` ，完全自定义 storyboard。
在 Project Navigator 中导航到 `Runner/Runner` ，然后打开 `Assets.xcassets` 拖入图片，或者
在 `LaunchScreen.storyboard` 中使用 Interface Builder 进行自定义。

![Adding launch icons in Xcode](/assets/images/docs/assets-and-images/ios-launchscreen-xcode.png){:width="100%"}

For more details, see
[Adding a splash screen to your iOS app][].

更多详细信息，请查看 
[在 iOS 应用中添加闪屏页与启动页][Adding a splash screen to your iOS app]。

[add-to-app]: /add-to-app/ios
[Adding a splash screen to your Android app]: /platform-integration/android/splash-screen
[Adding a splash screen to your iOS app]: /platform-integration/ios/launch-screen
[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[`AssetImage`]: {{site.api}}/flutter/painting/AssetImage-class.html
[`DefaultAssetBundle`]: {{site.api}}/flutter/widgets/DefaultAssetBundle-class.html
[`ImageCache`]: {{site.api}}/flutter/painting/ImageCache-class.html
[`ImageStream`]: {{site.api}}/flutter/painting/ImageStream-class.html
[Android Developer Guide]: {{site.android-dev}}/training/multiscreen/screendensities
[`AssetManager`]: {{site.android-dev}}/reference/android/content/res/AssetManager
[device pixel ratio]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[Device pixel ratio]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[drawables]: {{site.android-dev}}/guide/topics/resources/drawable-resource
[`FlutterPluginRegistrar`]: {{site.api}}/ios-embedder/protocol_flutter_plugin_registrar-p.html
[`FlutterView`]: {{site.api}}/javadoc/io/flutter/view/FlutterView.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[Human Interface Guidelines]: {{site.apple-dev}}/design/human-interface-guidelines/app-icons
[platform channels]: /platform-integration/platform-channels
[layer list drawable]: {{site.android-dev}}/guide/topics/resources/drawable-resource#LayerList
[`mainBundle`]: {{site.apple-dev}}/documentation/foundation/nsbundle/1410786-mainbundle
[`openFd`]: {{site.android-dev}}/reference/android/content/res/AssetManager#openFd(java.lang.String)
[package]: /packages-and-plugins/using-packages
[`pathForResource:ofType:`]: {{site.apple-dev}}/documentation/foundation/nsbundle/1410989-pathforresource
[`PluginRegistry.Registrar`]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html
[`pubspec.yaml`]: {{site.dart-site}}/tools/pub/pubspec
[`rootBundle`]: {{site.api}}/flutter/services/rootBundle.html
[`runApp()`]: {{site.api}}/flutter/widgets/runApp.html
[`video_player` plugin]: {{site.pub}}/packages/video_player
[MediaQueryData.size]: {{site.api}}/flutter/widgets/MediaQueryData/size.html
[MaterialApp]: {{site.api}}/flutter/material/MaterialApp-class.html
[CupertinoApp]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[Transforming assets at build time]: /ui/assets/asset-transformation
[flavors feature]: /deployment/flavors
