---
# title: Layouts in Flutter
title: Flutter 中的布局
# short-title: Layout
short-title: 布局
# description: >-
#  Learn how Flutter's layout mechanism works and how to build your app's layout.
description: 了解 Flutter 的布局机制和如何构建布局。
tags: 用户界面,Flutter UI,布局
keywords: Flutter布局核心介绍,核心机制,Flutter布局
---

{% assign api = site.api | append: '/flutter' -%}
{% capture examples -%} {{site.repo.this}}/tree/{{site.branch}}/examples {%- endcapture -%}

<?code-excerpt path-base=""?>

## Overview

## 概览

:::secondary 要点
<!-- What's the point? -->

* Layouts in Flutter are built with widgets.

  Flutter 中的布局是用 widget 构建的。

* Widgets are classes used to build UIs.

  Widget 是用于构建 UI 的类。

* Widgets are also used to build UI elements.

  Widget 也用于构建 UI 元素。

* Compose simple widgets to build complex widgets.

  通过组合简单的 widget 来构建复杂的 widget。

:::

The core of Flutter's layout mechanism is widgets.
In Flutter, almost everything is a widget&mdash;even
layout models are widgets. The images, icons,
and text that you see in a Flutter app are all widgets.
But things you don't see are also widgets,
such as the rows, columns, and grids that arrange,
constrain, and align the visible widgets.
You create a layout by composing widgets to build more
complex widgets.

Flutter 布局的核心机制是 widget。
在 Flutter 中，几乎所有东西都是 widget &mdash; 甚至布局模型都是 widget。
你在 Flutter 应用程序中看到的图像，图标和文本都是 widget。
此外不能直接看到的也是 widget，
例如用来排列、限制和对齐可见 widget 的行、列和网格。

## Conceptual example

## 示例

In the following example, the first screenshot displays
three icons with labels and the second screenshot includes
the visual layout for rows and columns. In the second
screenshot, `debugPaintSizeEnabled` is set to `true` so you
can see the visual layout.

在下面的示例中，第一张截图显示三个带标签的图标，
第二张截图包括行和列的可视化布局。
在第二张截图中，`debugPaintSizeEnabled` 被设置为 `true`，
因此可以看到可视化布局。

<div class="side-by-side">
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/lakes-icons.png' alt="Sample layout">
  </div>
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/lakes-icons-visual.png' alt="Sample layout with visual debugging">
  </div>
</div>

Here's a diagram of the widget tree for the previous
example:

以下是上方示例的 widget 树示意图：

<img src='/assets/images/docs/ui/layout/sample-flutter-layout.png' class="text-center diagram-wrap" alt="Node tree">

Most of this should look as you might expect, but you might be wondering
about the containers (shown in pink). [`Container`][] is a widget class
that allows you to customize its child widget. Use a `Container` when
you want to add padding, margins, borders, or background color,
to name some of its capabilities.

图上大部分应该和你预想的一样，但你可能会疑惑 container（图上粉色显示的）是什么。
[`Container`][] 是一个 widget，允许你自定义其子 widget。
举几个例子，如果要添加 padding、margin、边框或背景颜色，
你就可以用上 `Container` 了。

Each [`Text`][] widget is placed in a `Container`
to add margins. The entire [`Row`][] is also placed in a
`Container` to add padding around the row.

每个 [`Text`][] widget 都被放在一个 `Container` 以添加 margin。
整个 [`Row`][] 也被放在一个 `Container` 中，以便添加 padding。

The rest of the UI is controlled by properties.
Set an [`Icon`][]'s color using its `color` property.
Use the `Text.style` property to set the font, its color, weight, and so on.
Columns and rows have properties that allow you to specify how their
children are aligned vertically or horizontally, and how much space
the children should occupy.

UI 的其余部分由属性控制。通过 [`Icon`][] 的 `color` 属性来设置它的颜色，
通过 `Text.style` 属性来设置文字的字体、颜色、字重等等。
Column 和 Row 有一些属性可以让你指定子项垂直或水平的对齐方式以及子项应占用的空间大小。

:::note

Most of the screenshots in this tutorial are displayed with
`debugPaintSizeEnabled` set to `true` so you can see the
visual layout. For more information, see
[Debugging layout issues visually][].

本教程中的大部分截图都是在将 `debugPaintSizeEnabled` 设置为 `true` 时显示的，
因此你可以看到可视化布局。
相关详细信息，请参阅 [可视化地调试布局问题][Debugging layout issues visually]。

:::

[`Container`]: {{api}}/widgets/Container-class.html
[Debugging layout issues visually]: /tools/devtools/inspector#debugging-layout-issues-visually
[`Icon`]: {{api}}/material/Icons-class.html
[`Row`]: {{api}}/widgets/Row-class.html
[`Text`]: {{api}}/widgets/Text-class.html

## Lay out a widget

## 布局 widget

How do you lay out a single widget in Flutter? This section
shows you how to create and display a simple widget.
It also shows the entire code for a simple Hello World app.

如何在 Flutter 中布局单个 widget？本节将介绍如何创建和显示单个 widget。
本节还包括一个简单的 Hello World app 的完整代码。

In Flutter, it takes only a few steps to put text, an icon,
or an image on the screen.

在 Flutter 中，只需几步就可以在屏幕上显示文本、图标或图像。

### 1. Select a layout widget

### 1. 选择一个布局 widget

Choose from a variety of [layout widgets][] based
on how you want to align or constrain a visible widget,
as these characteristics are typically passed on to the
contained widget.

根据你想要对齐或限制可见 widget 的方式，从各种
[布局 widget][layout widgets] 中进行选择，
因为这些特性通常会传递给它所包含的 widget。

For example, you could use the
[`Center`][] layout widget to center a visible widget
horizontally and vertically:

例如，你可以使用 [`Center`][] 布局 widget 将可见的 widget 
水平和垂直居中。

```dart
Center(
  // Content to be centered here.
)
```

[`Center`]: {{api}}/widgets/Center-class.html
[layout widgets]: /ui/widgets/layout

### 2. Create a visible widget

### 2. 创建一个可见 widget

Choose a [visible widget][] for your app to contain
visible elements, such as [text][], [images][], or
[icons][].

为你的应用程序选择 [可见的 widget][visible widget]，
以包含可见元素，如 [text][]、[images][] 或 [icons][]。

For example, you could use the [`Text`][] widget display
some text:

例如，你可以使用 [`Text`][] widget 显示一些文本：

```dart
Text('Hello World')
```

[icons]: {{api}}/material/Icons-class.html
[images]: {{api}}/widgets/Image-class.html
[text]: {{api}}/widgets/Text-class.html
[`Text`]: {{api}}/widgets/Text-class.html
[visible widget]: /ui/widgets

### 3. Add the visible widget to the layout widget

### 3. 将可见 widget 添加到布局 widget

<?code-excerpt path-base="layout/base"?>

All layout widgets have either of the following:

所有布局 widget 都具有以下任一项：

* A `child` property if they take a single child&mdash;for example,
  `Center` or `Container`

  一个 `child` 属性，如果它们只包含一个子项 &mdash; 例如 `Center` 和 `Container`

* A `children` property if they take a list of widgets&mdash;for example,
  `Row`, `Column`, `ListView`, or `Stack`.

  一个 `children` 属性，如果它们包含多个子项 &mdash; 例如 `Row`、`Column`、`ListView` 和 `Stack`

Add the `Text` widget to the `Center` widget:

将 `Text` widget 添加进 `Center` widget：

<?code-excerpt "lib/main.dart (centered-text)" replace="/body: //g"?>
```dart
const Center(
  child: Text('Hello World'),
),
```

### 4. Add the layout widget to the page

### 4. 将布局 widget 添加到页面

A Flutter app is itself a widget, and most widgets have a [`build()`][]
method. Instantiating and returning a widget in the app's `build()` method
displays the widget.

一个 Flutter 应用本身就是一个 widget，
大多数 widget 都有一个 [`build()`][] 方法，
在应用的 `build()` 方法中实例化和返回一个 widget 会让它显示出来。

<a id="non-material-apps" aria-hidden="true"></a>
<a id="material-apps" aria-hidden="true"></a>
<a id="cupertino-apps" aria-hidden="true"></a>

{% tabs "app-type-tabs", true %}

{% tab "标准应用" %}

For a general app, you can add the `Container` widget to
the app's `build()` method:

对于一般应用程序，你可以将 `Container` widget 
添加到应用程序的 `build()` 方法中：

<?code-excerpt path-base="layout/non_material"?>
<?code-excerpt "lib/main.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(color: Colors.white),
      child: const Center(
        child: Text(
          'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(fontSize: 32, color: Colors.black87),
        ),
      ),
    );
  }
}
```

By default, a general app doesn't include an `AppBar`,
title, or background color. If you want these features in a
general app, you have to build them yourself. This app
changes the background color to white and the text to
dark grey to mimic a Material app.

默认情况下，一般应用程序不包含 `AppBar`、标题或背景颜色。
如果你想在普通应用中使用这些功能，就必须自己创建。
此应用程序会将背景颜色改为白色，将文字改为深灰色，
以模仿 Material 应用程序。

{% endtab %}

{% tab "Material 应用" %}

For a `Material` app, you can use a [`Scaffold`][] widget;
it provides a default banner, background color,
and has API for adding drawers, snack bars, and bottom sheets.
Then you can add the `Center` widget directly to the `body`
property for the home page.

对于 `Material` 应用，你可以使用 [`Scaffold`][] widget，
它提供默认的 banner 背景颜色，
还有用于添加抽屉、提示条和底部列表弹窗的 API。
你可以将 `Center` widget 直接添加到主页 `body` 的属性中。

<?code-excerpt path-base="layout/base"?>
<?code-excerpt "lib/main.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const String appTitle = 'Flutter layout demo';
    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

:::note

The [Material library][] implements widgets that follow [Material
Design][] principles. When designing your UI, you can exclusively use
widgets from the standard [widgets library][], or you can use
widgets from the Material library. You can mix widgets from both
libraries, you can customize existing widgets,
or you can build your own set of custom widgets.

[Material 库][Material library] 实现了一些遵循 [Material Design][] 原则的 widget。
在设计 UI 时，你可以只使用标准 [widget 库][widgets library] 中的 widget，
也可以使用 Material 库中的 widget。
你可以混合来自两个库的 widget，
可以自定义现有 widget，也可以构建自己的一组自定义 widget。

:::

{% endtab %}

{% tab "Cupertino 应用" %}

To create a `Cupertino` app,
use the `CupertinoApp` and [`CupertinoPageScaffold`][] widgets.

你可以使用 `CupertionApp` 和 [`CupertinoPageScaffold`][] widget
来创建一个基于 `Cupertino` 的应用。

Unlike `Material`, it doesn't provide a default banner or background color.
You need to set these yourself.

与 `Material` 不同的是它并没有自带横幅和背景颜色。你需要手动设置它们。

* To set default colors, pass in a configured [`CupertinoThemeData`][]
  to your app's `theme` property.

  你可以通过 `theme` 属性设置配置好的 [`CupertinoThemeData`][] 来更改默认颜色。

* To add an iOS-styled navigation bar to the top of your app, add a
  [`CupertinoNavigationBar`][] widget to the `navigationBar`
  property of your scaffold.
  You can use the colors that [`CupertinoColors`][] provides to
  configure your widgets to match iOS design.

  你可以通过 `navigationBar` 属性设置 [`CupertinoNavigationBar`][]
  来展示 iOS 风格的导航栏。同时你还可以利用 [`CupertinoColors`][]
  来为 widget 配置与 iOS 设计风格相符的颜色。

* To lay out the body of your app, set the `child` property of your scaffold
  with the desired widget as its value, like `Center` or `Column`.

  你可以设置脚手架 (`CupertinoScaffold`) 的 `child` 属性来构建你的主体内容，
  例如 `Center` 或者 `Column`。

To learn what other UI components you can add, check out the
[Cupertino library][].

若你想了解更多可以添加的 UI 组件，参阅 [Cupertino 库][Cupertino library] 文档。

<?code-excerpt "lib/cupertino.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Flutter layout demo',
      theme: CupertinoThemeData(
        brightness: Brightness.light,
        primaryColor: CupertinoColors.systemBlue,
      ),
      home: CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          backgroundColor: CupertinoColors.systemGrey,
          middle: Text('Flutter layout demo'),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Text('Hello World')],
          ),
        ),
      ),
    );
  }
}
```

:::note

The [Cupertino library][] implements widgets that follow
[Apple's Human Interface Guidelines for iOS][].
When designing your UI, you can use
widgets from the standard [widgets library][] or the Cupertino library.
You can mix widgets from both libraries, you can customize existing widgets,
or you can build your own set of custom widgets.

[Cupertino 库][Cupertino library] 实现了
[Apple 的人机界面指南][Apple's Human Interface Guidelines for iOS]。
你可以利用基础 [widget 库][widgets library] 和 Cupertino 库，把它们加入你的界面设计中。
无论是混合这些库、自定义已有的 widget，还是构建你自己的一套 widget，
都不失为一种选择。

:::

{% endtab %}

{% endtabs %}

[`CupertinoColors`]: {{api}}/cupertino/CupertinoColors-class.html
[`CupertinoPageScaffold`]: {{api}}/cupertino/CupertinoPageScaffold-class.html
[`CupertinoThemeData`]: {{api}}/cupertino/CupertinoThemeData-class.html
[`CupertinoNavigationBar`]: {{api}}/cupertino/CupertinoNavigationBar-class.html
[Cupertino library]: {{api}}/cupertino/cupertino-library.html
[Apple's Human Interface Guidelines for iOS]: {{site.apple-dev}}/design/human-interface-guidelines/designing-for-ios
[`build()`]: {{api}}/widgets/StatelessWidget/build.html
[Material library]: {{api}}/material/material-library.html
[`Scaffold`]: {{api}}/material/Scaffold-class.html
[widgets library]: {{api}}/widgets/widgets-library.html

### 5. Run your app

### 5. 运行应用

<div class="side-by-side">
<div>

After you've added your widgets, run your app. When you run
the app, you should see _Hello World_.

添加完 widget 后，运行这个应用，
你应该能看到 _Hello World_。

App source code:

App 源码：

* [Material app]({{examples}}/layout/base)

* [Non-Material app]({{examples}}/layout/non_material)

  [非 Material app]({{examples}}/layout/non_material)

</div>
{% render docs/app-figure.md, image:"ui/layout/hello-world.png", alt:"Screenshot of app displaying Hello World", img-style:"max-height: 400px;"  %}
</div>
<hr>

## Lay out multiple widgets vertically and horizontally

## 横向或纵向布局多个 widget

<?code-excerpt path-base=""?>

One of the most common layout patterns is to arrange
widgets vertically or horizontally. You can use a
`Row` widget to arrange widgets horizontally,
and a `Column` widget to arrange widgets vertically.

最常见的布局模式之一是垂直或水平 widget。
你可以使用 `Row` widget 水平排列 widget，
使用 `Column` widget 垂直排列 widget。

:::secondary 要点
<!-- What's the point? -->

* `Row` and `Column` are two of the most commonly used layout patterns.

  `Row` 和 `Column` 是两种最常用的布局模式。

* `Row` and `Column` each take a list of child widgets.

  `Row` 和 `Column` 每个都有一个子 widget 列表。

* A child widget can itself be a `Row`, `Column`,
  or other complex widget.

  一个子 widget 本身可以是 `Row`、`Column` 或其他复杂 widget。

* You can specify how a `Row` or `Column` aligns its children,
  both vertically and horizontally.

  可以指定 `Row` 或 `Column` 如何在垂直和水平方向上对齐其子项。

* You can stretch or constrain specific child widgets.

  可以拉伸或限制特定的子 widget。

* You can specify how child widgets use the `Row`'s or
  `Column`'s available space.

  可以指定子 widget 如何占用 `Row` 或 `Column` 的可用空间。

:::

To create a row or column in Flutter, you add a list of children
widgets to a [`Row`][] or [`Column`][] widget. In turn,
each child can itself be a row or column, and so on.
The following example shows how it is possible to nest rows or
columns inside of rows or columns.

要在 Flutter 中创建行或列，可以将子 widget 列表添加到
[`Row`][] 或 [`Column`][] widget 中。
反过来，每个子项本身可以是一行或一列，依此类推。
以下示例演示了如何在行或列中嵌套行或列。

This layout is organized as a `Row`. The row contains two children:
a column on the left, and an image on the right:

这个布局被组织为 `Row`。这一行包含两个子项：左侧的列和右侧的图像：

<img src='/assets/images/docs/ui/layout/pavlova-diagram.png' class="diagram-wrap" alt="Screenshot with callouts showing the row containing two children">

The left column's widget tree nests rows and columns.

左侧列的 widget 树嵌套着行和列。

<img src='/assets/images/docs/ui/layout/pavlova-left-column-diagram.png' class="diagram-wrap" alt="Diagram showing a left column broken down to its sub-rows and sub-columns">

You'll implement some of Pavlova's layout code in
[Nesting rows and columns](#nesting-rows-and-columns).

你将在 [嵌套行和列](#nesting-rows-and-columns) 中实现蛋糕介绍示例的一些布局代码。

:::note

`Row` and `Column` are basic primitive widgets for horizontal
and vertical layouts&mdash;these low-level widgets allow for maximum
customization. Flutter also offers specialized, higher-level widgets
that might be sufficient for your needs. For example,
instead of `Row` you might prefer [`ListTile`][],
an easy-to-use widget with properties for leading and trailing icons,
and up to 3 lines of text.  Instead of Column, you might prefer
[`ListView`][], a column-like layout that automatically scrolls
if its content is too long to fit the available space.
For more information, see [Common layout widgets][].

Row 和 Column 是水平和垂直布局的基本原始 widget &mdash; 这些低级 widget 允许最大程度的自定义。
Flutter 还提供专门的、更高级别的 widget，可能可以直接满足需求。
例如，和 Row 相比你可能更喜欢 [`ListTile`][]，
这是一个易于使用的 widget，有属性可以设置头尾图标，最多可以显示 3 行文本；
和 Column 相比你也可能更喜欢 [`ListView`][]，
这是一种类似于列的布局，但如果其内容太长导致可用空间不够容纳时会自动滚动。
更多信息可以查看 [通用布局 widget][Common layout widgets]。

:::

[Common layout widgets]: #common-layout-widgets
[`Column`]: {{api}}/widgets/Column-class.html
[`ListTile`]: {{api}}/material/ListTile-class.html
[`ListView`]: {{api}}/widgets/ListView-class.html
[`Row`]: {{api}}/widgets/Row-class.html

### Aligning widgets

### 对齐 widget

You control how a row or column aligns its children using the
`mainAxisAlignment` and `crossAxisAlignment` properties.
For a row, the main axis runs horizontally and the cross axis runs
vertically. For a column, the main axis runs vertically and the cross
axis runs horizontally.

你可以使用 `mainAxisAlignment` 和 `crossAxisAlignment`
属性控制行或列如何对齐其子项。
对于一行来说，主轴水平延伸，交叉轴垂直延伸。
对于一列来说，主轴垂直延伸，交叉轴水平延伸。

<div class="side-by-side">
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/row-diagram.png' class="diagram-wrap" alt="Diagram showing the main axis and cross axis for a row">
  </div>
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/column-diagram.png' class="diagram-wrap" alt="Diagram showing the main axis and cross axis for a column">
  </div>
</div>

The [`MainAxisAlignment`][] and [`CrossAxisAlignment`][]
enums offer a variety of constants for controlling alignment.

[`MainAxisAlignment`][] 和 [`CrossAxisAlignment`][] 这两个枚举
提供了很多用于控制对齐的常量。

:::note

When you add images to your project,
you need to update the `pubspec.yaml` file to access
them&mdash;this example uses `Image.asset` to display
the images.  For more information, see this example's
[`pubspec.yaml` file][] or [Adding assets and images][].
You don't need to do this if you're referencing online
images using `Image.network`.

当你将图像添加到项目中时，你需要更新 `pubspec.yaml` 文件来访问它们
&mdash; 本例使用 `Image.asset` 来显示图像。
更多信息可以查看本例的 [pubspec.yaml 文件][`pubspec.yaml` file]，
或文档：[添加资源和图片][Adding assets and images]。
如果你正在使用 `Image.network` 引用在线图像，则不需要这些操作。

:::

In the following example, each of the 3 images is 100 pixels wide.
The render box (in this case, the entire screen)
is more than 300 pixels wide, so setting the main axis
alignment to `spaceEvenly` divides the free horizontal
space evenly between, before, and after each image.

在以下示例中，3 个图像每个都是是 100 像素宽。
渲染框（在本例中是整个屏幕）宽度超过 300 像素，
因此设置主轴对齐方式为 `spaceEvenly` 会将
空余空间在每个图像之间、之前和之后均匀地划分。

<div class="code-and-content">
<div>

<?code-excerpt "layout/row_column/lib/main.dart (row)" replace="/Row/[!$&!]/g"?>
```dart
[!Row!](
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Image.asset('images/pic1.jpg'),
    Image.asset('images/pic2.jpg'),
    Image.asset('images/pic3.jpg'),
  ],
);
```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/row-spaceevenly-visual.png' class="small-diagram-wrap" alt="Row with 3 evenly spaced images">

  **App source:** [row_column]({{examples}}/layout/row_column)

  **App 源码:** [row_column]({{examples}}/layout/row_column)
</div>
</div>

Columns work the same way as rows. The following example shows a column
of 3 images, each is 100 pixels high. The height of the render box
(in this case, the entire screen) is more than 300 pixels, so
setting the main axis alignment to `spaceEvenly` divides the free vertical
space evenly between, above, and below each image.

列的工作方式与行的工作方式相同。
以下示例展示了包含 3 个图像的列，每个图像的高度为 100 像素。
渲染框（在本例中是整个屏幕）高度超过 300 像素，
因此设置主轴对齐方式为 `spaceEvenly` 会将空余空间
在每个图像之间、之上和之下均匀地划分。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/row_column/lib/main.dart (column)" replace="/Column/[!$&!]/g"?>
  ```dart
  [!Column!](
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset('images/pic1.jpg'),
      Image.asset('images/pic2.jpg'),
      Image.asset('images/pic3.jpg'),
    ],
  );
  ```

</div>
<div class="text-center">
  <img src='/assets/images/docs/ui/layout/column-visual.png' height="250px" class="small-diagram-wrap" alt="Column showing 3 images spaced evenly">

  **App source:** [row_column]({{examples}}/layout/row_column)

  **App 源码:** [row_column]({{examples}}/layout/row_column)
</div>
</div>

[`CrossAxisAlignment`]: {{api}}/rendering/CrossAxisAlignment.html
[`MainAxisAlignment`]: {{api}}/rendering/MainAxisAlignment.html
[`pubspec.yaml` file]: {{examples}}/layout/row_column/pubspec.yaml

### Sizing widgets

### 调整 widget 大小

When a layout is too large to fit a device, a yellow
and black striped pattern appears along the affected edge.
Here is an [example][sizing] of a row that is too wide:

当某个布局太大而超出屏幕时，受影响的边缘会出现黄色和黑色条纹图案。
这里有一个行太宽的 [例子][sizing]：

<img src='/assets/images/docs/ui/layout/layout-too-large.png' class="text-center" style="max-height: 15rem;" alt="Overly-wide row">

Widgets can be sized to fit within a row or column by using the
[`Expanded`][] widget. To fix the previous example where the
row of images is too wide for its render box,
wrap each image with an `Expanded` widget.

通过使用 [`Expanded`][] widget，可以调整 widget 的大小以适合行或列。
要修复上一个图像行对其渲染框来说太宽的示例，
可以用 `Expanded` widget 把每个图像包起来。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/sizing/lib/main.dart (expanded-images)" replace="/Expanded/[!$&!]/g"?>
  ```dart
  Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      [!Expanded!](child: Image.asset('images/pic1.jpg')),
      [!Expanded!](child: Image.asset('images/pic2.jpg')),
      [!Expanded!](child: Image.asset('images/pic3.jpg')),
    ],
  );
  ```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/row-expanded-2-visual.png' class="small-diagram-wrap" alt="Row of 3 images that are too wide, but each is constrained to take only 1/3 of the space">

  **App source:** [sizing]({{examples}}/layout/sizing)

  **App 源码:** [sizing]({{examples}}/layout/sizing)
</div>
</div>

Perhaps you want a widget to occupy twice as much space as its
siblings. For this, use the `Expanded` widget `flex` property,
an integer that determines the flex factor for a widget.
The default flex factor is 1. The following code sets
the flex factor of the middle image to 2:

也许你想要一个 widget 占用的空间是兄弟项的两倍。
为了达到这个效果，可以使用 `Expanded` widget 的 `flex` 属性，
这是一个用来确定 widget 的弹性系数的整数。
默认的弹性系数为 1，以下代码将中间图像的弹性系数设置为 2：

<div class="code-and-content">
<div>

  <?code-excerpt "layout/sizing/lib/main.dart (expanded-images-with-flex)" replace="/flex.*/[!$&!]/g"?>
  ```dart
  Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Expanded(child: Image.asset('images/pic1.jpg')),
      Expanded([!flex: 2, child: Image.asset('images/pic2.jpg')),!]
      Expanded(child: Image.asset('images/pic3.jpg')),
    ],
  );
  ```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/row-expanded-visual.png' class="small-diagram-wrap" alt="Row of 3 images with the middle image twice as wide as the others">

  **App source:** [sizing]({{examples}}/layout/sizing)

  **App 源码:** [sizing]({{examples}}/layout/sizing)
</div>
</div>

[`Expanded`]: {{api}}/widgets/Expanded-class.html
[sizing]: {{examples}}/layout/sizing

### Packing widgets

### 组合 widget

By default, a row or column occupies as much space along its main axis
as possible, but if you want to pack the children closely together,
set its `mainAxisSize` to `MainAxisSize.min`. The following example
uses this property to pack the star icons together.

默认情况下，行或列沿其主轴会占用尽可能多的空间，
但如果要将子项紧密组合在一起，
请将其 `mainAxisSize` 设置为 `MainAxisSize.min`。
以下示例使用此属性将星形图标组合在一起。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/pavlova/lib/main.dart (stars)" replace="/mainAxisSize.*/[!$&!]/g; /\w+ \w+ = //g; /;//g"?>
  ```dart
  Row(
    [!mainAxisSize: MainAxisSize.min,!]
    children: [
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      const Icon(Icons.star, color: Colors.black),
      const Icon(Icons.star, color: Colors.black),
    ],
  )
  ```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/packed.png' class="small-diagram-wrap" alt="Row of 5 stars, packed together in the middle of the row">

  **App source:** [pavlova]({{examples}}/layout/pavlova)

  **App 源码:** [pavlova]({{examples}}/layout/pavlova)
</div>
</div>

### Nesting rows and columns

### 嵌套行和列

The layout framework allows you to nest rows and columns
inside of rows and columns as deeply as you need.
Let's look at the code for the outlined
section of the following layout:

布局框架允许你根据需要在行和列内嵌套行和列。
让我们看看以下布局的概述部分的代码：

<img src='/assets/images/docs/ui/layout/pavlova-large-annotated.png' class="border text-center" alt="Screenshot of the pavlova app, with the ratings and icon rows outlined in red">

The outlined section is implemented as two rows. The ratings row contains
five stars and the number of reviews. The icons row contains three
columns of icons and text.

概述的部分实现为两行，评级一行包含五颗星和评论的数量，
图标一行包含由图标与文本组成的三列。

The widget tree for the ratings row:

以下是评级行的 widget 树形图：

<img src='/assets/images/docs/ui/layout/widget-tree-pavlova-rating-row.png' class="text-center diagram-wrap" alt="Ratings row widget tree">

The `ratings` variable creates a row containing a smaller row
of 5-star icons, and text:

`ratings` 变量创建了一个行，
其中包含较小的由 5 个星形图标和文本组成的一行：

<?code-excerpt "layout/pavlova/lib/main.dart (ratings)" replace="/ratings/[!$&!]/g"?>
```dart
final stars = Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    const Icon(Icons.star, color: Colors.black),
    const Icon(Icons.star, color: Colors.black),
  ],
);

final [!ratings!] = Container(
  padding: const EdgeInsets.all(20),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      stars,
      const Text(
        '170 Reviews',
        style: TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.w800,
          fontFamily: 'Roboto',
          letterSpacing: 0.5,
          fontSize: 20,
        ),
      ),
    ],
  ),
);
```

:::tip

To minimize the visual confusion that can result from
heavily nested layout code, implement pieces of the UI
in variables and functions.

为了最大限度地减少高度嵌套的布局代码可能导致的视觉混乱，
可以在变量和函数中实现 UI 的各个部分。

:::

The icons row, below the ratings row, contains 3 columns;
each column contains an icon and two lines of text,
as you can see in its widget tree:

评级行下方的图标行包含 3 列，每列包含一个图标和两行文本，
你可以在其 widget 树中看到：

<img src='/assets/images/docs/ui/layout/widget-tree-pavlova-icon-row.png' class="text-center diagram-wrap" alt="Icon widget tree">

The `iconList` variable defines the icons row:

`iconList` 变量定义了图标行:

<?code-excerpt "layout/pavlova/lib/main.dart (icon-list)" replace="/iconList/[!$&!]/g"?>
```dart
const descTextStyle = TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.w800,
  fontFamily: 'Roboto',
  letterSpacing: 0.5,
  fontSize: 18,
  height: 2,
);

// DefaultTextStyle.merge() allows you to create a default text
// style that is inherited by its child and all subsequent children.
final [!iconList!] = DefaultTextStyle.merge(
  style: descTextStyle,
  child: Container(
    padding: const EdgeInsets.all(20),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Column(
          children: [
            Icon(Icons.kitchen, color: Colors.green[500]),
            const Text('PREP:'),
            const Text('25 min'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.timer, color: Colors.green[500]),
            const Text('COOK:'),
            const Text('1 hr'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.restaurant, color: Colors.green[500]),
            const Text('FEEDS:'),
            const Text('4-6'),
          ],
        ),
      ],
    ),
  ),
);
```

The `leftColumn` variable contains the ratings and icons rows,
as well as the title and text that describes the Pavlova:

`leftColumn` 变量包含评级和图标行，
以及蛋糕介绍的标题和文本：

<?code-excerpt "layout/pavlova/lib/main.dart (left-column)" replace="/leftColumn/[!$&!]/g"?>
```dart
final [!leftColumn!] = Container(
  padding: const EdgeInsets.fromLTRB(20, 30, 20, 20),
  child: Column(children: [titleText, subTitle, ratings, iconList]),
);
```

The left column is placed in a `SizedBox` to constrain its width.
Finally, the UI is constructed with the entire row (containing the
left column and the image) inside a `Card`.

左列放置在 `Container` 中以限制其宽度。最后，UI 由 `Card` 内的整行（包含左列和图像）构成。

The [Pavlova image][] is from [Pixabay][].
You can embed an image from the net using `Image.network()` but,
for this example, the image is saved to an images directory in the project,
added to the [pubspec file][], and accessed using `Images.asset()`.
For more information, see [Adding assets and images][].

[蛋糕图片][Pavlova image] 来自 [Pixabay][] 网站。
你可以使用 `Image.network()` 从网络上引用图像，
但是在本例图像将保存到项目中的一个图像目录中，
添加到 [pubspec 文件][pubspec file]，并使用 `Images.asset()` 访问。
更多信息可以查看文档中关于 [添加资源和图片][Adding assets and images] 这一章。

<?code-excerpt "layout/pavlova/lib/main.dart (body)"?>
```dart
body: Center(
  child: Container(
    margin: const EdgeInsets.fromLTRB(0, 40, 0, 30),
    height: 600,
    child: Card(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 440, child: leftColumn),
          mainImage,
        ],
      ),
    ),
  ),
),
```

:::tip

The Pavlova example runs best horizontally on a wide device,
such as a tablet.  If you are running this example in the iOS simulator,
you can select a different device using the **Hardware > Device** menu.
For this example, we recommend the iPad Pro.
You can change its orientation to landscape mode using
**Hardware > Rotate**. You can also change the size of the
simulator window (without changing the number of logical pixels)
using **Window > Scale**.

蛋糕介绍的例子在宽屏设备（如平板电脑）上横向运行效果最佳。
如果在 iOS 模拟器中运行这个示例，
可以使用 **Hardware > Device** 菜单选择不同的设备。
在本例中，我们推荐 iPad Pro。
你可以使用 **Hardware > Rotate** 将其方向更改为横向模式。
你还可以使用 **Window > Scale** 更改模拟器窗口的大小
（不改变逻辑像素的数量）。

:::

**App source:** [pavlova]({{examples}}/layout/pavlova)

**App 源码:** [pavlova]({{examples}}/layout/pavlova)

<hr>

[Pavlova image]: https://pixabay.com/en/photos/pavlova
[蛋糕图片]: https://pixabay.com/en/photos/pavlova
[Pixabay]: https://pixabay.com/en/photos/pavlova
[pubspec file]: {{examples}}/layout/pavlova/pubspec.yaml

## Common layout widgets

## 通用布局 widget

Flutter has a rich library of layout widgets.
Here are a few of those most commonly used.
The intent is to get you up and running as quickly as possible,
rather than overwhelm you with a complete list.
For information on other available widgets,
refer to the [Widget catalog][],
or use the Search box in the [API reference docs][].
Also, the widget pages in the API docs often make suggestions
about similar widgets that might better suit your needs.

Flutter 有一个丰富的布局 widget 仓库，里面有很多经常会用到的布局 widget。
目的是为了让你更快的上手，而不是被一个完整的列表吓跑。
关于其他有用的 widget 的信息，可以参考 [Widget 目录][Widget catalog]，
或者使用 [API 参考文档][API reference docs] 中的搜索框。
而且，API 文档中的 widget 页面中经常会给出一些
关于相似的 widget 哪个会更适合你的建议。

The following widgets fall into two categories: standard widgets
from the [widgets library][], and specialized widgets from the
[Material library][]. Any app can use the widgets library but
only Material apps can use the Material Components library.

下面的 widget 会分为两类：[widget 库][widgets library] 中的标准 widget 和
[Material 库][Material library] 中的 widget。
任何 app 都可以使用 widget 库，
但是 Material 库中的组件只能在 Material app 中使用。

<a id="standard-widgets" aria-hidden="true"></a>
<a id="materials-widgets" aria-hidden="true"></a>

{% tabs "widget-types-tabs", true %}

{% tab "标准 widget" %}

[`Container`](#container)
<br> Adds padding, margins, borders,
  background color, or other decorations to a widget.

[`Container`](#container)：向 widget 增加 
<br> padding、margins、borders、background color 或者其他的“装饰”。

[`GridView`](#gridview)
<br> Lays widgets out as a scrollable grid.

[`GridView`](#gridview)
<br> 将 widget 展示为一个可滚动的网格。

[`ListView`](#listview)
<br> Lays widgets out as a scrollable list.

[`ListView`](#listview)
<br> 将 widget 展示为一个可滚动的列表。

[`Stack`](#stack)
<br> Overlaps a widget on top of another.

[`Stack`](#stack)
<br> 将 widget 覆盖在另一个的上面。

{% endtab %}

{% tab "Material widget" %}

[`Scaffold`][]
<br> Provides a structured layout framework
  with slots for common Material Design app elements.

[`Scaffold`][]
<br> 提供结构化的布局框架，
  为常用的 Material Design 应用元素提供插槽。

[`AppBar`][]
<br> Creates a horizontal bar that's typically
  displayed at the top of a screen.

[`AppBar`][]
<br> 创建一个显示在屏幕顶部的横条。

[`Card`](#card)
<br> Organizes related info into a box with
  rounded corners and a drop shadow.

[`Card`](#card)
<br> 将相关信息整理到一个有圆角和阴影的盒子中。

[`ListTile`](#listtile)
<br> Organizes up to 3 lines of text,
  and optional leading and trailing icons, into a row.

[`ListTile`](#listtile)
<br> 将最多三行的文本、
  可选的导语以及后面的图标组织在一行中。

{% endtab %}

{% tab "Cupertino widget" %}

[`CupertinoPageScaffold`][]
: Provides the basic layout structure for an iOS-style page.

[`CupertinoNavigationBar`][]
: Creates an iOS-style  navigation bar at the top of the screen.

[`CupertinoSegmentedControl`][]
: Creates a segmented control for selecting.

[`CupertinoTabBar`][] and [`CupertinoTabScaffold`][]
: Creates the characteristic iOS bottom tab bar.

{% endtab %}

{% endtabs %}

[`Scaffold`]: {{api}}/material/Scaffold-class.html
[`AppBar`]: {{api}}/material/AppBar-class.html
[`Container`]: {{api}}/widgets/Container-class.html
[`CupertinoPageScaffold`]: {{api}}/cupertino/CupertinoPageScaffold-class.html
[`CupertinoNavigationBar`]: {{api}}/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSegmentedControl`]: {{api}}/cupertino/CupertinoSegmentedControl-class.html
[`CupertinoTabBar`]: {{api}}/cupertino/CupertinoTabBar-class.html
[`CupertinoTabScaffold`]: {{api}}/cupertino/CupertinoTabScaffold-class.html
[`GridView`]: {{api}}/widgets/GridView-class.html
[`ListTile`]: {{api}}/material/ListTile-class.html
[`ListView`]: {{api}}/widgets/ListView-class.html
[Material library]: {{api}}/material/material-library.html
[widgets library]: {{api}}/widgets/widgets-library.html

### Container

Many layouts make liberal use of [`Container`][]s to separate
widgets using padding, or to add borders or margins.
You can change the device's background by placing the
entire layout into a `Container` and changing its background
color or image.

许多布局都可以随意的用 [`Container`][]，它可以将使用了 padding 或者
增加了 borders/margins 的 widget 分开。
你可以通过将整个布局放到一个 `Container` 中，
并且改变它的背景色或者图片，来改变设备的背景。

<div class="side-by-side">
<div>

[`Container`]: {{api}}/widgets/Container-class.html

#### Summary (Container)

#### 摘要 (Container)

* Add padding, margins, borders

  增加 padding、margins、borders

* Change background color or image

  改变背景色或者图片

* Contains a single child widget, but that child can be a `Row`,
  `Column`, or even the root of a widget tree

  只包含一个子 widget，但是这个子 widget 可以是 `Row`、`Column` 或者是 widget 树的根 widget

</div>
<div class="text-center">
  <img src='/assets/images/docs/ui/layout/margin-padding-border.png' class="diagram-wrap" alt="Diagram showing: margin, border, padding, and content">
</div>
</div>

#### Examples (Container)

#### 示例 (Container)

This layout consists of a column with two rows, each containing
2 images. A [`Container`][] is used to change the background color
of the column to a lighter grey.

这个布局包含一个有两行的列，每行有两张图片。
[`Container`][] 用来将列的背景色变为浅灰色。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/container/lib/main.dart (column)" replace="/\bContainer/[!$&!]/g;"?>
  ```dart
  Widget _buildImageColumn() {
    return [!Container!](
      decoration: const BoxDecoration(color: Colors.black26),
      child: Column(children: [_buildImageRow(1), _buildImageRow(3)]),
    );
  }
  ```

</div>
<div class="text-center">
  <img src='/assets/images/docs/ui/layout/container.png' class="mb-4" width="230px" alt="Screenshot showing 2 rows, each containing 2 images">
</div>
</div>

A `Container` is also used to add a rounded border and margins
to each image:

`Container` 还用来为每个图片添加圆角和外边距：

<?code-excerpt "layout/container/lib/main.dart (row)" replace="/\bContainer/[!$&!]/g;"?>
```dart
Widget _buildDecoratedImage(int imageIndex) => Expanded(
  child: [!Container!](
    decoration: BoxDecoration(
      border: Border.all(width: 10, color: Colors.black38),
      borderRadius: const BorderRadius.all(Radius.circular(8)),
    ),
    margin: const EdgeInsets.all(4),
    child: Image.asset('images/pic$imageIndex.jpg'),
  ),
);

Widget _buildImageRow(int imageIndex) => Row(
  children: [
    _buildDecoratedImage(imageIndex),
    _buildDecoratedImage(imageIndex + 1),
  ],
);
```

You can find more `Container` examples in the [tutorial][].

你可以在 [布局构建教程][tutorial] 中
发现更多关于 `Container` 的例子。

**App source:** [container]({{examples}}/layout/container)

**App 源码:** [container]({{examples}}/layout/container)

<hr>

[`Container`]: {{api}}/widgets/Container-class.html
[tutorial]: /ui/layout/tutorial

### GridView

Use [`GridView`][] to lay widgets out as a two-dimensional
list. `GridView` provides two pre-fabricated lists,
or you can build your own custom grid. When a `GridView`
detects that its contents are too long to fit the render box,
it automatically scrolls.

使用 [`GridView`][] 将 widget 作为二维列表展示。
`GridView` 提供两个预制的列表，或者你可以自定义网格。
当 `GridView` 检测到内容太长而无法适应渲染盒时，
它就会自动支持滚动。

[`GridView`]: {{api}}/widgets/GridView-class.html

#### Summary (GridView)

#### 摘要 (GridView)

* Lays widgets out in a grid

  在网格中使用 widget

* Detects when the column content exceeds the render box
  and automatically provides scrolling

  当列的内容超出渲染容器的时候，它会自动支持滚动。

* Build your own custom grid, or use one of the provided grids:

  创建自定义的网格，或者使用下面提供的网格的其中一个：

  * `GridView.count` allows you to specify the number of columns

    `GridView.count` 允许你制定列的数量

  * `GridView.extent` allows you to specify the maximum pixel
  width of a tile
  
    `GridView.extent` 允许你制定单元格的最大宽度

{% comment %}
* Use `MediaQuery.of(context).orientation` to create a grid
  that changes its layout depending on whether the device
  is in landscape or portrait mode.
  
  使用 `MediaQuery.of(context).orientation` 创建一个网格，
  它会根据设备处于宽屏模式还是竖屏模式来改变布局。

{% endcomment %}

:::note

When displaying a two-dimensional list where it's important which
row and column a cell occupies (for example,
it's the entry in the "calorie" column for the "avocado" row), use
[`Table`][] or [`DataTable`][].

当展示二维列表中的单元格所在的行和列的位置很重要的
（例如，它是 “calorie” 行和 “avocado” 列的条目）的时候，
使用 [`Table`][] 或者 [`DataTable`][].。

:::

[`DataTable`]: {{api}}/material/DataTable-class.html
[`Table`]: {{api}}/widgets/Table-class.html

#### Examples (GridView)

#### 示例 (GridView)

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/gridview-extent.png' class="text-center" alt="A 3-column grid of photos" height="440px">

  Uses `GridView.extent` to create a grid with tiles a maximum
  150 pixels wide.

  使用 `GridView.extent` 创建一个最大宽度为 150 像素的网格。

  **App source:** [grid_and_list]({{examples}}/layout/grid_and_list)

  **App 源码：** [grid_and_list]({{examples}}/layout/grid_and_list)

</div>
<div>
  <img src='/assets/images/docs/ui/layout/gridview-count-flutter-gallery.png' class="text-center" alt="A 2 column grid with footers" height="440px">

  Uses `GridView.count` to create a grid that's 2 tiles
  wide in portrait mode, and 3 tiles wide in landscape mode.
  The titles are created by setting the `footer` property for
  each [`GridTile`][].

  使用 `GridView.count` 创建一个网格，它在竖屏模式下有两行，在横屏模式下有三行。
  可以通过为每个 [`GridTile`][] 设置 `footer` 属性来创建标题。

  **Dart code:**
  [`grid_list_demo.dart`]({{examples}}/layout/gallery/lib/grid_list_demo.dart)

  **Dart 代码：** 
  [`grid_list_demo.dart`]({{examples}}/layout/gallery/lib/grid_list_demo.dart)

</div>
</div>

<?code-excerpt "layout/grid_and_list/lib/main.dart (grid)" replace="/\GridView/[!$&!]/g;"?>
```dart
Widget _buildGrid() => [!GridView!].extent(
  maxCrossAxisExtent: 150,
  padding: const EdgeInsets.all(4),
  mainAxisSpacing: 4,
  crossAxisSpacing: 4,
  children: _buildGridTileList(30),
);

// The images are saved with names pic0.jpg, pic1.jpg...pic29.jpg.
// The List.generate() constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Widget> _buildGridTileList(int count) =>
    List.generate(count, (i) => Image.asset('images/pic$i.jpg'));
```

<hr>

[`GridTile`]: {{api}}/material/GridTile-class.html

### ListView

[`ListView`][], a column-like widget, automatically
provides scrolling when its content is too long for
its render box.

[`ListView`][]，一个和列很相似的 widget，
当内容长于自己的渲染盒时，就会自动支持滚动。

[`ListView`]: {{api}}/widgets/ListView-class.html

#### Summary (ListView)

#### 摘要 (ListView)

* A specialized [`Column`][] for organizing a list of boxes

  一个用来组织盒子中列表的专用 [`Column`][]

* Can be laid out horizontally or vertically

  可以水平或者垂直布局

* Detects when its content won't fit and provides scrolling

  当监测到空间不足时，会提供滚动

* Less configurable than `Column`, but easier to use and
  supports scrolling

  比 `Column` 的配置少，使用更容易，并且支持滚动

[`Column`]: {{api}}/widgets/Column-class.html

#### Examples (ListView)

#### 示例 (ListView)

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/listview.png' height="400px" class="simple-border text-center" alt="ListView containing movie theaters and restaurants">

  Uses `ListView` to display a list of businesses using
  `ListTile`s. A `Divider` separates the theaters from
  the restaurants.

  使用 `ListView` 的业务列表，它使用了多个 `ListTile`。`Divider` 将餐厅从剧院中分隔开。

  **App source:** [grid_and_list]({{examples}}/layout/grid_and_list)

  **App 源码：** [grid_and_list]({{examples}}/layout/grid_and_list)

</div>
<div>
  <img src='/assets/images/docs/ui/layout/listview-color-gallery.png' height="400px" class="simple-border text-center" alt="ListView containing shades of blue">

  Uses `ListView` to display the [`Colors`][] from
  the [Material 2 Design palette][]
  for a particular color family.

  使用 `ListView` 展示特定颜色系列 
  [Material 2 Design 调色板][Material 2 Design palette] 中的 [`Colors`][]。

  **Dart code:**
  [`colors_demo.dart`]({{examples}}/layout/gallery/lib/colors_demo.dart)

  **Dart 代码：** 
  [`colors_demo.dart`]({{examples}}/layout/gallery/lib/colors_demo.dart)
  
</div>
</div>

<?code-excerpt "layout/grid_and_list/lib/main.dart (list)" replace="/\ListView/[!$&!]/g;"?>
```dart
Widget _buildList() {
  return [!ListView!](
    children: [
      _tile('CineArts at the Empire', '85 W Portal Ave', Icons.theaters),
      _tile('The Castro Theater', '429 Castro St', Icons.theaters),
      _tile('Alamo Drafthouse Cinema', '2550 Mission St', Icons.theaters),
      _tile('Roxie Theater', '3117 16th St', Icons.theaters),
      _tile(
        'United Artists Stonestown Twin',
        '501 Buckingham Way',
        Icons.theaters,
      ),
      _tile('AMC Metreon 16', '135 4th St #3000', Icons.theaters),
      const Divider(),
      _tile('K\'s Kitchen', '757 Monterey Blvd', Icons.restaurant),
      _tile('Emmy\'s Restaurant', '1923 Ocean Ave', Icons.restaurant),
      _tile('Chaiya Thai Restaurant', '272 Claremont Blvd', Icons.restaurant),
      _tile('La Ciccia', '291 30th St', Icons.restaurant),
    ],
  );
}

ListTile _tile(String title, String subtitle, IconData icon) {
  return ListTile(
    title: Text(
      title,
      style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
    ),
    subtitle: Text(subtitle),
    leading: Icon(icon, color: Colors.blue[500]),
  );
}
```

<hr>

[`Colors`]: {{api}}/material/Colors-class.html
[Material 2 Design palette]: {{site.material2}}/design/color/the-color-system.html#tools-for-picking-colors

### Stack

Use [`Stack`][] to arrange widgets on top of a base
widget&mdash;often an image. The widgets can completely
or partially overlap the base widget.

可以使用 [`Stack`][] 在基础 widget（通常是图片）上排列 widget，
widget 可以完全或者部分覆盖基础 widget。

[`Stack`]: {{api}}/widgets/Stack-class.html

#### Summary (Stack)

#### 摘要 (Stack)

* Use for widgets that overlap another widget

  用于覆盖另一个 widget

* The first widget in the list of children is the base widget;
  subsequent children are overlaid on top of that base widget

  子列表中的第一个 widget 是基础 widget；后面的子项覆盖在基础 widget 的顶部

* A `Stack`'s content can't scroll

  `Stack` 的内容是无法滚动的

* You can choose to clip children that exceed the render box

  你可以剪切掉超出渲染框的子项

#### Examples (Stack)

#### 示例 (Stack)

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/stack.png' class="text-center" height="200px" alt="Circular avatar image with a label">

  Uses `Stack` to overlay a `Container`
  (that displays its `Text` on a translucent
  black background) on top of a `CircleAvatar`.
  The `Stack` offsets the text using the `alignment` property and
  `Alignment`s.

  在 `CircleAvatar` 的上面使用 `Stack` 覆盖 `Container`
  （在透明的黑色背景上展示它的 `Text`）。
  `Stack` 使用 `alignment` 属性和 `Alignment` 让文本偏移。

  **App source:** [card_and_stack]({{examples}}/layout/card_and_stack)

  **App 源码：** [card_and_stack]({{examples}}/layout/card_and_stack)

</div>
<div>
  <img src='/assets/images/docs/ui/layout/stack-flutter-gallery.png' class="text-center" height="200px" alt="An image with a icon overlaid on top">

  Uses `Stack` to overlay an icon on top of an image.

  使用 `Stack` 将渐变叠加到图片的顶部，
  渐变可以将工具栏的图标和图片区分开来。

  **Dart code:**
  [`bottom_navigation_demo.dart`]({{examples}}/layout/gallery/lib/bottom_navigation_demo.dart)

  **Dart 代码：**
  [`bottom_navigation_demo.dart`]({{examples}}/layout/gallery/lib/bottom_navigation_demo.dart)

</div>
</div>

<?code-excerpt "layout/card_and_stack/lib/main.dart (stack)" replace="/\bStack/[!$&!]/g;"?>
```dart
Widget _buildStack() {
  return [!Stack!](
    alignment: const Alignment(0.6, 0.6),
    children: [
      const CircleAvatar(
        backgroundImage: AssetImage('images/pic.jpg'),
        radius: 100,
      ),
      Container(
        decoration: const BoxDecoration(color: Colors.black45),
        child: const Text(
          'Mia B',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    ],
  );
}
```

<hr>

### Card

A [`Card`][], from the [Material library][],
contains related nuggets of information and can
be composed of almost any widget, but is often used with
[`ListTile`][]. `Card` has a single child,
but its child can be a column, row, list, grid,
or other widget that supports multiple children.
By default, a `Card` shrinks its size to 0 by 0 pixels.
You can use [`SizedBox`][] to constrain the size of a card.

[Material 库][Material library] 中的 [`Card`][] 包含相关有价值的信息，
几乎可以由任何 widget 组成，但是通常和 [`ListTile`][] 一起使用。
`Card` 只有一个子项，
这个子项可以是列、行、列表、网格或者其他支持多个子项的 widget。
默认情况下，`Card` 的大小是 0x0 像素。
你可以使用 [`SizedBox`][] 控制 card 的大小。

In Flutter, a `Card` features slightly rounded corners
and a drop shadow, giving it a 3D effect.
Changing a `Card`'s `elevation` property allows you to control
the drop shadow effect. Setting the elevation to 24,
for example, visually lifts the `Card` further from the
surface and causes the shadow to become more dispersed.
For a list of supported elevation values, see [Elevation][] in the
[Material guidelines][Material Design].
Specifying an unsupported value disables the drop shadow entirely.

在 Flutter 中，`Card` 有轻微的圆角和阴影来使它具有 3D 效果。
改变 `Card` 的 `elevation` 属性可以控制阴影效果。
例如，把 elevation 设置为 24，可以从视觉上更多的把 `Card` 抬离表面，
使阴影变得更加分散。关于支持的 elevation 的值的列表，
可以查看 [Material guidelines][Material Design] 中的 [Elevation][]。
使用不支持的值则会使阴影无效。

[`Card`]: {{api}}/material/Card-class.html
[Elevation]: {{site.material}}/styles/elevation
[`ListTile`]: {{api}}/material/ListTile-class.html
[Material Design]: {{site.material}}/styles
[`SizedBox`]: {{api}}/widgets/SizedBox-class.html
[Material library]: {{api}}/material/material-library.html

#### Summary (Card)

#### 摘要 (Card)

* Implements a [Material card][]

  实现一个 [Material card][]

* Used for presenting related nuggets of information

  用于呈现相关有价值的信息

* Accepts a single child, but that child can be a `Row`,
  `Column`, or other widget that holds a list of children

  接收单个子项，但是子项可以是 `Row`、`Column` 或者其他
  可以包含列表子项的 widget

* Displayed with rounded corners and a drop shadow

  显示圆角和阴影

* A `Card`'s content can't scroll

  `Card` 的内容无法滚动

* From the [Material library][]

  来自 [Material 库][Material library]

[Material card]: {{site.material}}/components/cards
[Material library]: {{api}}/material/material-library.html

#### Examples (Card)

#### 示例 (Card)

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/card.png' height="200px" class="text-center" alt="Card containing 3 ListTiles">

  A `Card` containing 3 ListTiles and sized by wrapping
  it with a `SizedBox`. A `Divider` separates the first
  and second `ListTiles`.

  包含 3 个 ListTile 的 `Card`，并且通过被 `SizedBox` 包住来调整大小。
  `Divider` 分隔了第一个和第二个 `ListTiles`。

  **App source:** [card_and_stack]({{examples}}/layout/card_and_stack)

  **App 源码：** [card_and_stack]({{examples}}/layout/card_and_stack)

</div>
<div>
  <img src='/assets/images/docs/ui/layout/card-flutter-gallery.png' height="200px" class="text-center" alt="Tappable card containing an image and multiple forms of text">

  A `Card` containing an image and text.

  包含图片和文本的 `Card`。

  **Dart code:**
  [`cards_demo.dart`]({{examples}}/layout/gallery/lib/cards_demo.dart)

  **Dart 代码：**
  [`cards_demo.dart`]({{examples}}/layout/gallery/lib/cards_demo.dart)

</div>
</div>

<?code-excerpt "layout/card_and_stack/lib/main.dart (card)" replace="/\bCard/[!$&!]/g;"?>
```dart
Widget _buildCard() {
  return SizedBox(
    height: 210,
    child: [!Card!](
      child: Column(
        children: [
          ListTile(
            title: const Text(
              '1625 Main Street',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: const Text('My City, CA 99984'),
            leading: Icon(Icons.restaurant_menu, color: Colors.blue[500]),
          ),
          const Divider(),
          ListTile(
            title: const Text(
              '(408) 555-1212',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            leading: Icon(Icons.contact_phone, color: Colors.blue[500]),
          ),
          ListTile(
            title: const Text('costa@example.com'),
            leading: Icon(Icons.contact_mail, color: Colors.blue[500]),
          ),
        ],
      ),
    ),
  );
}
```

<hr>

### ListTile

Use [`ListTile`][], a specialized row widget from the
[Material library][], for an easy way to create a row
containing up to 3 lines of text and optional leading
and trailing icons. `ListTile` is most commonly used in
[`Card`][] or [`ListView`][], but can be used elsewhere.

[`ListTile`][] 是 [Material 库][Material library] 中专用的行 widget，
它可以很轻松的创建一个包含三行文本以及可选的行前和行尾图标的行。
`ListTile` 在 [`Card`][] 或者 [`ListView`][] 中最常用，但是也可以在别处使用。

[`Card`]: {{api}}/material/Card-class.html
[`ListTile`]: {{api}}/material/ListTile-class.html
[`ListView`]: {{api}}/widgets/ListView-class.html
[Material library]: {{api}}/material/material-library.html

#### Summary (ListTile)

#### 摘要 (ListTile)

* A specialized row that contains up to 3 lines of text and
  optional icons

  一个可以包含最多 3 行文本和可选的图标的专用的行

* Less configurable than `Row`, but easier to use

  比 `Row` 更少的配置，更容易使用

* From the [Material library][]

  来自 [Material 库][Material library]

[Material library]: {{api}}/material/material-library.html

#### Examples (ListTile)

#### 示例 (ListTile)

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/card.png' class="text-center" alt="Card containing 3 ListTiles">

  A `Card` containing 3 `ListTile`s.

  包含 3 个 `ListTiles` 的 `Card`。

  **App source:** [card_and_stack]({{examples}}/layout/card_and_stack)

  **App 源码：** [card_and_stack]({{examples}}/layout/card_and_stack)

</div>
<div>
  <img src='/assets/images/docs/ui/layout/listtile-flutter-gallery.png' height="200px" class="simple-border text-center" alt="4 ListTiles, each containing a leading avatar">

  Uses `ListTile` with leading widgets.

  leading widget 使用 `ListTile`。

  **Dart code:**
  [`list_demo.dart`]({{examples}}/layout/gallery/lib/list_demo.dart)

  **Dart 代码：**
  [`list_demo.dart`]({{examples}}/layout/gallery/lib/list_demo.dart)

</div>
</div>

<hr>

## Constraints

To fully understand Flutter's layout system, you need
to learn how Flutter positions and sizes
the components in a layout. For more information,
see [Understanding constraints][].

你需要学习 Flutter 如何在布局时定位组件和决定组件大小，
才能掌握 Flutter 的布局系统。
请参阅 [深入理解 Flutter 布局约束][Understanding constraints] 了解更多内容。

[Understanding constraints]: /ui/layout/constraints

## Videos

## 视频

The following videos, part of the
[Flutter in Focus][] series,
explain `Stateless` and `Stateful` widgets.

下面的视频是 [Flutter in Focus][] 系列的一部分，
解释了 Stateless 和 Stateful 的 widget。

<iframe width="560" height="315" src="{{site.bili.embed}}?bvid=BV15441157Jm&page=1&autoplay=false" title="How to create stateless widgets" {{site.bili.set}}></iframe>
<iframe width="560" height="315" src="{{site.bili.embed}}?bvid=BV1s441157db&page=1&autoplay=false" title="How and when stateful widgets are best used" {{site.bili.set}}></iframe>

---

Each episode of the [Widget of the Week series][] focuses on a widget.
Several of them include layout widgets.

[每周 Widget 系列]({{site.bili.video}}/BV15441157cc)
的每一集都会介绍一个 widget。其中也包括一些布局的 widget。

<iframe width="560" height="315" src="{{site.bili.embed}}?bvid=BV15441157cc&page=1&autoplay=false" title="Introducing widget of the week" {{site.bili.set}}></iframe>

[Flutter Widget of the Week playlist]({{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

[每周 Flutter Widget 播放列表]({{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

[Widget of the Week series]: {{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG
[Flutter in Focus]: {{site.yt.watch}}?v=wgTBLj7rMPM&list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2

## Other resources

## 其他资源

The following resources might help when writing layout code.

当写布局代码时，下面的资源可能会帮助到你。

[Layout tutorial][]
<br> Learn how to build a layout.
  
[Layout 教程][Layout tutorial]
<br> 学习如何构建布局。

[Widget catalog][]
<br> Describes many of the widgets available in Flutter.
  
[核心 Widget 目录][Widget catalog]<br>
描述了 Flutter 中很多可用的 widget。

[HTML/CSS Analogs in Flutter][]
<br> For those familiar with web programming,
  this page maps HTML/CSS functionality to Flutter features.

[给 Web 开发者的 Flutter 指南][HTML/CSS Analogs in Flutter]
<br> 对那些熟悉 web 开发的人来说，这页将 HTML/CSS 的功能映射到 Flutter 特性上。

[API reference docs][]
<br> Reference documentation for all of the Flutter libraries.
  
[Flutter API 文档][API reference docs]
<br> 所有 Flutter 库的参考文档。

[Adding assets and images][]
<br> Explains how to add images and other assets to your app's package.

[在 Flutter 中添加资源和图片][Adding assets and images]
<br> 解释在你的 app 中如何添加图片和其他资源。

[Zero to One with Flutter][]
<br> One person's experience writing their first Flutter app.

[Flutter 从 0 到 1][Zero to One with Flutter]
<br> 一位开发者编写的 Flutter 应用的经验分享文章。

[Layout tutorial]: /ui/layout/tutorial
[Widget catalog]: /ui/widgets
[HTML/CSS Analogs in Flutter]: /get-started/flutter-for/web-devs
[API reference docs]: {{api}}
[Adding assets and images]: /ui/assets/assets-and-images
[Zero to One with Flutter]: {{site.medium}}/@mravn/zero-to-one-with-flutter-43b13fd7b354
