---
# title: Developing packages & plugins
title: Flutter Packages 的开发和提交
# short-title: Developing
short-title: 开发和提交
# description: How to write packages and plugins for Flutter.
description: 如何编写和提交你的 Packages。
tags: Packages,插件
keywords: 插件开发,Flutter插件教程
---

## Package introduction

## Package 介绍

Packages enable the creation of modular code that can be shared easily.
A minimal package consists of the following:

通过使用 package（的模式）可以创建易于共享的模块化代码。
一个最基本的 package 由以下内容构成：

**`pubspec.yaml`**
<br> A metadata file that declares the package name,
  version, author, and so on.

**`pubspec.yaml` 文件**
<br> 用于定义 package 名称、版本号、作者等其他信息的元数据文件。

**`lib`**
<br> The `lib` directory contains the public code in
  the package, minimally a single `<package-name>.dart` file.
  
**`lib` 目录**
<br> 包含共享代码的 `lib` 目录，
其中至少包含一个 `<package-name>.dart` 文件。

:::note

For a list of dos and don'ts when writing an effective plugin,
see the Medium article by Mehmet Fidanboylu,
[Writing a good plugin][].

有关编写高效插件的注意事项列表，请参考 Medium 上的文章：
[Writing a good plugin][]。

:::

### Package types {:#types}

### Package 类别

Packages can contain more than one kind of content:

Package 包含以下几种类别：

**Dart packages**
<br> General packages written in Dart,
  for example the [`path`][] package.
  Some of these might contain Flutter specific
  functionality and thus have a dependency on the
  Flutter framework, restricting their use to Flutter only,
  for example the [`fluro`][] package.
  
**纯 Dart 库 (Dart packages)**
<br> 用 Dart 编写的传统 package，比如 [`path`][]。
  其中一些可能包含 Flutter 的特定功能，因此依赖于 Flutter 框架，
  其使用范围仅限于 Flutter，比如 [`fluro`][]。

**Plugin packages**
<br> A specialized Dart package that contains an API written in
  Dart code combined with one or more platform-specific
  implementations.

**原生插件 (Plugin packages)**
<br> 使用 Dart 编写的，按需使用 Java 或 Kotlin、Objective-C
  或 Swift 分别在 Android 和/或 iOS 平台实现的 package。

  Plugin packages can be written for Android (using Kotlin or Java), iOS (using
  Swift or Objective-C), web, macOS, Windows, or Linux, or any combination
  thereof.

  插件 package 可以针对 Android（使用 Kotlin 或 Java）、
  iOS（使用 Swift 或 Objective-C）、Web、macOS、Windows 或 Linux，
  又或者它们的各种组合方式，进行编写。

  A concrete example is the [`url_launcher`][] plugin package.
  To see how to use the `url_launcher` package, and how it
  was extended to implement support for web,
  see the Medium article by Harry Terkelsen,
  [How to Write a Flutter Web Plugin, Part 1][].

  一个较为具体的实现例子是 [`url_launcher`][] 插件 package。
  想了解如何使用 `url_launcher` package，以及它如何扩展 Web 的实现，
  请阅读 Medium 上由 Harry Terkelsen 撰写的文章
  [如何编写 Flutter Web 插件，第一部分][How to Write a Flutter Web Plugin, Part 1]。


**FFI Plugin packages**
<br> A specialized Dart package that contains an API written in
  Dart code combined with one or more platform-specific
  implementations that use Dart FFI([Android][Android], [iOS][iOS], [macOS][macOS]).

**FFI 插件**
<br> 用 Dart 语言编写针对一个或多个特定平台的 API，
使用 Dart FFI ([Android][Android]、[iOS][iOS]、[macOS][macOS])。

## Developing Dart packages {:#dart}

## 开发纯 Dart 的 packages

The following instructions explain how to write a Flutter
package.

下面会为你介绍如何写 Flutter package。

### Step 1: Create the package

### 第一步：创建 package

To create a starter Flutter package,
use the `--template=package` flag with `flutter create`:

想要创建初始的 Flutter package，
请使用带有 `--template=package` 标志的
`flutter create` 命令：

```console
$ flutter create --template=package hello
```

This creates a package project in the `hello`
folder with the following content:

这将在 `hello` 目录下创建一个 package 项目，其中包含以下内容：

**LICENSE**
<br> A (mostly) empty license text file.

**LICENSE 文件**
<br> 大概率会是空的一个许可证文件。

**test/hello_test.dart**
<br> The [unit tests][] for the package.

**test/hello_test.dart 文件**
<br> Package 的 [单元测试][unit tests] 文件。

**hello.iml**
<br> A configuration file used by the IntelliJ IDEs.

**hello.iml 文件**
<br> 由 IntelliJ 生成的配置文件。

**.gitignore**
<br> A hidden file that tells Git which files or
  folders to ignore in a project.

**.gitignore 文件**
<br> 告诉 Git 系统应该隐藏哪些文件或文件夹的一个隐藏文件。

**.metadata**
<br> A hidden file used by IDEs to track the properties
  of the Flutter project.

**.metadata 文件**
<br> IDE 用来记录某个 Flutter 项目属性的的隐藏文件。

**pubspec.yaml**
<br> A yaml file containing metadata that specifies
  the package's dependencies. Used by the pub tool.

**pubspec.yaml 文件**
<br> pub 工具需要使用的，包含 package 依赖的 yaml 格式的文件。

**README.md**
<br> A starter markdown file that briefly describes
  the package's purpose.

**README.md 文件**
<br> 起步文档，用于描述 package。

**lib/hello.dart**
<br> A starter app containing Dart code for the package.

**lib/hello.dart 文件**
<br> package 的 Dart 实现代码。

**.idea/modules.xml**, **.idea/workspace.xml**
<br> A hidden folder containing configuration files
  for the IntelliJ IDEs.

**.idea/modules.xml**、**.idea/workspace.xml 文件**
<br> IntelliJ 的各自配置文件（包含在 .idea 隐藏文件夹下）。

**CHANGELOG.md**
<br> A (mostly) empty markdown file for tracking
  version changes to the package.

**CHANGELOG.md 文件**
<br> 又一个大概率为空的文档，用于记录 package 的版本变更。

### Step 2: Implement the package

### 第二步：实现 package

For pure Dart packages, simply add the functionality
inside the main `lib/<package name>.dart` file,
or in several files in the `lib` directory.

对于纯 Dart 库的 package，只要在 `lib/<package name>.dart` 文件中添加功能实现，
或在 `lib` 目录中的多个文件中添加功能实现。

To test the package, add [unit tests][]
in a `test` directory.

如果要对 package 进行测试，
在 `test` 目录下添加 [单元测试][unit tests]。

For additional details on how to organize the
package contents,
see the [Dart library package][] documentation.

关于如何组织 package 内容的更多详细信息，
请参考 [Dart library package][] 文档。

## Developing plugin packages {:#plugin}

## 开发原生插件类型的 packages

If you want to develop a package that calls into platform-specific APIs, you
need to develop a plugin package.

如果想要开发一个调用特定平台 API 的 package，你需要开发一个原生插件 packgae。

The API is connected to the platform-specific implementation(s) using a
[platform channel][].

它的 API 通过 [平台通道][platform channel] 连接到平台特定的实现。

### Federated plugins

### 联合插件

Federated plugins are a way of splitting support for different platforms into
separate packages. So, a federated plugin can use one package for iOS, another
for Android, another for web, and yet another for a car (as an example of an IoT
device). Among other benefits, this approach allows a domain expert to extend an
existing plugin to work for the platform they know best.

Federated plugins (联合插件) 是一种将对不同平台的支持分为单独的软件包。
所以，联合插件能够使用针对 iOS、Android、Web 甚至是针对汽车
(例如在 IoT 设备上)分别使用对应的 package。
除了这些好处之外，它还能够让领域专家在他们最了解的平台上扩展现有平台插件。

A federated plugin requires the following packages:

联合插件需要以下 package：

**app-facing package**
<br> The package that plugin users depend on to use the plugin.
  This package specifies the API used by the Flutter app.

**面向应用的 package**
<br> 该 package 是用户使用插件的的直接依赖。
  它指定了 Flutter 应用使用的 API。

**platform package(s)**
<br> One or more packages that contain the platform-specific
  implementation code. The app-facing package calls into
  these packages&mdash;they aren't included into an app,
  unless they contain platform-specific functionality
  accessible to the end user.

**平台 package**
<br> 一个或多个包含特定平台代码的 package。
  面向应用的 package 会调用这些平台 package&mdash;&mdash;
  除非它们带有一些终端用户需要的特殊平台功能，否则它们不会包含在应用中。

**platform interface package**
<br> The package that glues the app-facing package
  to the platform package(s). This package declares an
  interface that any platform package must implement to
  support the app-facing package. Having a single package
  that defines this interface ensures that all platform
  packages implement the same functionality in a uniform way.

**平台接口 package**
<br> 将面向应用的 package 与平台 package 进行整合的 package。
  该 package 会声明平台 package 需要实现的接口，供面向应用的 package 使用。
  使用单一的平台接口 package 可以确保所有平台 package
  都按照各自的方法实现了统一要求的功能。

#### Endorsed federated plugin

#### 整合的联合插件

Ideally, when adding a platform implementation to
a federated plugin, you will coordinate with the package
author to include your implementation.
In this way, the original author _endorses_ your
implementation.

理想情况下，当你在为一个联合插件添加某个平台的实现时，
你会与 package 的作者合作，将你的实现纳入 package。

For example, say you write a `foobar_windows`
implementation for the (imaginary) `foobar` plugin.
In an endorsed plugin, the original `foobar` author
adds your Windows implementation as a dependency
in the pubspec for the app-facing package.
Then, when a developer includes the `foobar` plugin
in their Flutter app, the Windows implementation,
as well as the other endorsed implementations,
are automatically available to the app.

假设你开发了 `foobar_windows` 插件，用于对应 `foobar` 插件的实现。
在整合的联合插件里，`foobar` 的原作者会将你的 Windows
实现作为依赖添加在 pubspec 文件中，供面向应用的 package 调用。
而后在开发者使用 `foobar` 插件时，Windows
及已包含的其他平台的实现就自动可用了。

#### Non-endorsed federated plugin

#### 未整合的联合插件

If you can't, for whatever reason, get your implementation
added by the original plugin author, then your plugin
is _not_ endorsed. A developer can still use your
implementation, but must manually add the plugin
to the app's `pubspec.yaml` file:

```yaml
dependencies:
  foobar: ^1.0.0
  foobar_windows: ^1.0.0 # Non-endorsed plugin implementation
```

This approach also works for overriding an already
endorsed plugin implementation of `foobar`.

如果你的实现出于某些原因无法被原作者整合，
那么你的插件属于 **未整合** 的联合插件。
开发者仍然可以使用你的实现，但是必须手动在 pubspec 文件里添加引用。
意味着开发者需要同时引用 `foobar` **和** `foobar_windows` 依赖，
才能使用对应平台的完整功能。

For more information on federated plugins,
why they are useful, and how they are
implemented, see the Medium article by Harry Terkelsen,
[How To Write a Flutter Web Plugin, Part 2][].

有关联合插件的更多信息、它为什么非常强大，以及如何实现联合插件，
你可以阅读 Harry Terkelsen 在 Medium 撰写的
[如何撰写 Flutter Web 插件，第 2 部分][How To Write a Flutter Web Plugin, Part 2]。

### Specifying a plugin's supported platforms {:#plugin-platforms}

### 指定一个插件支持的平台

Plugins can specify the platforms they support by adding keys to the `platforms`
map in the `pubspec.yaml` file. For example, the following pubspec file shows
the `flutter:` map for the `hello` plugin, which supports only iOS and Android:

插件可以通过向 `pubspec.yaml` 中的 `platforms` map 
添加 keys 来指定其支持的平台。
例如，以下是 `hello` 插件的 `flutter:` map，
它仅支持 Android 和 iOS：

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
```

When adding plugin implementations for more platforms, the `platforms` map
should be updated accordingly. For example, here's the map in the pubspec file
for the `hello` plugin, when updated to add support for macOS and web:

当为更多平台添加插件实现时，应相应地更新 `platforms` map，
例如这是支持 Android、iOS、macOS 和 web 的 `hello` 插件的 map：

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      macos:
        pluginClass: HelloPlugin
      web:
        pluginClass: HelloPlugin
        fileName: hello_web.dart
```

#### Federated platform packages

#### 联合平台 package

A platform package uses the same format, but includes an `implements` entry
indicating which app-facing package it is an implementation for. For example,
a `hello_windows` plugin containing the Windows implementation for `hello`
would have the following `flutter:` map:

平台 package 有着同样的格式，但会包含 `implements` 入口，
用于指明 package 实现的平台。
例如，实现了 `hello` package 的 Windows 平台的 `hello_windows` 插件，
会在 `flutter:` 映射下包含以下内容：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        pluginClass: HelloPlugin
```

#### Endorsed implementations

#### 认可的实现

An app facing package can endorse a platform package by adding a
dependency on it, and including it as a `default_package` in the
`platforms:` map. If the `hello` plugin above endorsed `hello_windows`,
it would look like this:

提供给 App 项目使用的 package
可以通过在 `platform:` 映射下声明 `default_package`，
认可一个平台实现插件。
如果 `hello` 插件认可了 `hello_windows`，它看起来会是这样：

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      windows:
        default_package: hello_windows

dependencies:
  hello_windows: ^1.0.0
```

Note that as shown here, an app-facing package can have
some platforms implemented within the package,
and others in endorsed federated implementations.

注意如上所示，面向 App 项目的 package 可能已经包含了某些平台的实现，
同时也有认可的其他平台的实现。

#### Shared iOS and macOS implementations

#### 共享 iOS 和 macOS 的实现

Many frameworks support both iOS and macOS with identical
or mostly identical APIs, making it possible to implement
some plugins for both iOS and macOS with the same codebase.
Normally each platform's implementation is in its own
folder, but the `sharedDarwinSource` option allows iOS
and macOS to use the same folder instead:

许多框架支持 iOS 和 macOS，其 API 完全相同或大部分相同，
这使得可以用同一代码库来实现一些适用于 iOS 和 macOS 的插件。
通常，每个平台的实现都在自己的文件夹中，
但 `sharedDarwinSource` 选项允许 iOS 和 macOS 使用相同的文件夹：

```yaml
flutter:
  plugin:
    platforms:
      ios:
        pluginClass: HelloPlugin
        sharedDarwinSource: true
      macos:
        pluginClass: HelloPlugin
        sharedDarwinSource: true

environment:
  sdk: ^3.0.0
  # Flutter versions prior to 3.7 did not support the
  # sharedDarwinSource option.
  flutter: ">=3.7.0"
```

When `sharedDarwinSource` is enabled, instead of
an `ios` directory for iOS and a `macos` directory
for macOS, both platforms use a shared `darwin`
directory for all code and resources. When enabling
this option, you need to move any existing files
from `ios` and `macos` to the shared directory. You
also need to update the podspec file to set the
dependencies and deployment targets for both platforms,
for example:

当 `sharedDarwinSource` 启用时，
iOS 的 `ios` 目录和 macOS 的 `macos` 目录将被共享的 `darwin` 目录取代，
此目录包含所有的代码和资源。启用此选项后，
你需要将任何现有的 `ios` 和 `macos` 文件移动到共享目录。
你还需要更新 `podspec` 文件，设置两个平台的依赖关系和部署目标，例如：

```ruby
  s.ios.dependency 'Flutter'
  s.osx.dependency 'FlutterMacOS'
  s.ios.deployment_target = '11.0'
  s.osx.deployment_target = '10.14'
```

### Step 1: Create the package

### 第一步：创建 package

To create a plugin package, use the `--template=plugin`
flag with `flutter create`.

想要创建原生插件 package，
请使用带有 `--template=plugin` 标志的 `flutter create` 命令。

Use the `--platforms=` option followed by a
comma-separated list to specify the platforms
that the plugin supports. Available platforms are:
`android`, `ios`, `web`, `linux`, `macos`, and `windows`.
If no platforms are specified, the
resulting project doesn't support any platforms.

你可以使用 `--platforms=` 命令行选项指定插件支持的平台，
后面参数是用逗号分隔的列表。
可用的平台有：`android`、`ios`、`web`、`linux`、`macos` 和 `windows`。
如果没有指定平台，则生成的项目不支持任何平台。

Use the `--org` option to specify your organization,
using reverse domain name notation. This value is used
in various package and bundle identifiers in the
generated plugin code.

使用 `--org` 选项，以反向域名表示法来指定你的组织。
该值用于生成的 Android 及 iOS 代码。

By default, the plugin project uses Swift for iOS code and
Kotlin for Android code. If you prefer Objective-C or Java,
you can specify the iOS language using `-i` and the
Android language using `-a`.
Please choose **one** of the following:

默认情况下，插件项目中 iOS 代码使用 Swift 编写，
Android 代码使用 Kotlin 编写。
如果你更喜欢 Objective-C 或 Java，
你可以通过 `-i` 指定 iOS 所使用的语言，
以及通过 `-a` 指定 Android 所使用的语言。
请选择以下 **任一项**：

```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -a kotlin hello
```
```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -a java hello
```
```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -i objc hello
```
```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -i swift hello
```

This creates a plugin project in the `hello` folder
with the following specialized content:

这将在 `hello` 目录下创建一个插件项目，其中包含以下内容：

**`lib/hello.dart`**
<br> The Dart API for the plugin.

**`lib/hello.dart` 文件**
<br> Dart 插件 API 实现。

**`android/src/main/java/com/example/hello/HelloPlugin.kt`**
<br> The Android platform-specific implementation of the plugin API
  in Kotlin.

**`android/src/main/java/com/example/hello/HelloPlugin.kt` 文件**
<br> Android 平台原生插件 API 实现（使用 Kotlin 编程语言）。

**`ios/Classes/HelloPlugin.m`**
<br> The iOS-platform specific implementation of the plugin API
  in Objective-C.

**`ios/Classes/HelloPlugin.m` 文件**
<br> iOS 平台原生插件 API 实现（使用 Objective-C 编程语言）。

**`example/`**
<br> A Flutter app that depends on the plugin,
  and illustrates how to use it.

**`example/` 文件**
<br> 一个依赖于该插件并说明了如何使用它的 Flutter 应用。

### Step 2: Implement the package {:#edit-plugin-package}

### 第二步：实现 package

As a plugin package contains code for several platforms
written in several programming languages,
some specific steps are needed to ensure a smooth experience.

由于原生插件类型的 package 包含了使用多种编程语言编写的多个平台代码，
因此需要一些特定步骤来保证体验的流畅性。

#### Step 2a: Define the package API (.dart)

#### 步骤 2a：定义 package API（.dart）

The API of the plugin package is defined in Dart code.
Open the main `hello/` folder in your favorite [Flutter editor][].
Locate the file `lib/hello.dart`.

原生插件类型 package 的 API 在 Dart 代码中要首先定义好，
使用你钟爱的 [Flutter 编辑器][Flutter editor]，
打开 `hello` 主目录，并找到 `lib/hello.dart` 文件。

#### Step 2b: Add Android platform code (.kt/.java)

#### 步骤 2b：添加 Android 平台代码（.kt/.java）

We recommend you edit the Android code using Android Studio.

我们建议你使用 Android Studio 来编辑 Android 代码。

Before editing the Android platform code in Android Studio,
first make sure that the code has been built at least once
(in other words, run the example app from your IDE/editor,
or in a terminal execute
`cd hello/example; flutter build apk --config-only`).

在 Android Studio 中编辑 Android 平台的代码之前，
请先确保代码至少已经构建过一次
（换句话说，在 IDE 或编辑器中运行一次示例应用，或者在终端中执行指令
`cd hello/example; flutter build apk --config-only`）。

Then use the following steps:

接下来进行如下步骤：

1. Launch Android Studio.

   启动 Android Studio；

1. Select **Open an existing Android Studio Project**
   in the **Welcome to Android Studio** dialog,
   or select **File > Open** from the menu,
   and select the `hello/example/android/build.gradle` file.

   在 Android Studio 的欢迎菜单 (**Welcome to Android Studio**) 对话框中
   选择打开现有的 Android Studio 项目
   (**Open an existing Android Studio Project**)，
   或在菜单中选择 **File > Open**，
   然后选择 `hello/example/android/build.gradle` 文件；

1. In the **Gradle Sync** dialog, select **OK**.

    在**Gradle Sync** 对话框中，选择 **OK**；
   
1. In the **Android Gradle Plugin Update** dialog,
   select **Don't remind me again for this project**.

   在“Android Gradle Plugin Update”对话框中，
   选择“Don't remind me again for this project”。

The Android platform code of your plugin is located in
`hello/java/com.example.hello/HelloPlugin`.

插件中与 Android 系统徐相关的代码在
`hello/java/com.example.hello/HelloPlugin` 这个文件里。

You can run the example app from Android Studio by
pressing the run (&#9654;) button.

你可以在 Android Studio 中点击运行 &#9654; 按钮来运行示例程序。

#### Step 2c: Add iOS platform code (.swift/.h+.m)

#### 步骤 2c：添加 iOS 平台代码（.swift/.h+.m）

We recommend you edit the iOS code using Xcode.

我们建议你使用 Xcode 来编辑 iOS 代码。

Before editing the iOS platform code in Xcode,
first make sure that the code has been built at least once
(in other words, run the example app from your IDE/editor,
or in a terminal execute
`cd hello/example; flutter build ios --no-codesign --config-only`).

使用 Xcode 编辑 iOS 平台代码之前，首先确保代码至少被构建过一次
（即从 IDE/编辑器执行示例程序，或在终端中执行以下命令：
`cd hello/example; flutter build ios --no-codesign --config-only`）。

Then use the following steps:

接下来执行下面步骤：

1. Launch Xcode.

   启动 Xcode
   
1. Select **File > Open**, and select the
   `hello/example/ios/Runner.xcworkspace` file.

   选择“File > Open”，
   然后选择 `hello/example/ios/Runner.xcworkspace` 文件。

The iOS platform code for your plugin is located in
`Pods/Development Pods/hello/../../example/ios/.symlinks/plugins/hello/ios/Classes`
in the Project Navigator. (If you are using `sharedDarwinSource`,
the path will end with `hello/darwin/Classes` instead.)

插件的 iOS 平台代码位于 Project Navigator 的
`Pods/Development Pods/hello/../../example/ios/.symlinks/plugins/hello/ios/Classes`。
（如果你正在使用 `sharedDarwinSource`，路径将以 `hello/darwin/Classes` 结束。）

You can run the example app by pressing the run (&#9654;) button.

你可以点击运行按钮 (&#9654;) 来运行这个示例应用。

##### Add CocoaPod dependencies

:::warning
Flutter is migrating to [Swift Package Manager][]
to manage iOS and macOS native dependencies.
Flutter's support of Swift Package Manager is under development.
The implementation might change in the future.
Swift Package Manager support is only available
on Flutter's [`main` channel][].
Flutter continues to support CocoaPods.
:::

[Swift Package Manager]: https://www.swift.org/documentation/package-manager/
[`main` channel]: /install/upgrade#switching-flutter-channels

Use the following instructions to add `HelloPod` with the version `0.0.1`:

1. Specify the dependency at the end of `ios/hello.podspec`:

   ```ruby
   s.dependency 'HelloPod', '0.0.1'
   ```

   For private pods, refer to
   [Private CocoaPods][] to ensure repo access:

   ```ruby
   s.source = {
       # For pods hosted on GitHub
       :git => "https://github.com/path/to/HelloPod.git",
       # Alternatively, for pods hosted locally
       # :path => "file:///path/to/private/repo",
       :tag => s.version.to_s
     }`
   ```

[Private CocoaPods]: https://guides.cocoapods.org/making/private-cocoapods.html

2. Installing the plugin

   - Add the plugin in the project’s `pubspec.yaml` dependencies.
   - Run `flutter pub get`.
   - In the project’s `ios/` directory, run `pod install`.

The pod should appear in the installation summary.

If your plugin requires a privacy manifest, for example,
if it uses any **required reason APIs**,
update the `PrivacyInfo.xcprivacy` file to
describe your plugin's privacy impact,
and add the following to the bottom of your podspec file:

```ruby
s.resource_bundles = {'your_plugin_privacy' => ['your_plugin/Sources/your_plugin/Resources/PrivacyInfo.xcprivacy']}
```

For more information,
check out [Privacy manifest files][] on the Apple developer site.

[Privacy manifest files]: {{site.apple-dev}}/documentation/bundleresources/privacy_manifest_files

#### Step 2d: Add Linux platform code (.h+.cc)

#### 步骤 2d：添加 Linux 平台代码（.h+.cc）

We recommend you edit the Linux code using an IDE with
C++ integration. The instructions below are for
Visual Studio Code with the "C/C++" and "CMake" extensions
installed, but can be adjusted for other IDEs.

我们建议你使用具有 C++ 集成的 IDE 编辑 Linux 代码。
以下说明适用于安装了 "C/C++" 和 "CMake" 扩展的 Visual Studio Code，
但可以调整为其他 IDE。

Before editing the Linux platform code in an IDE,
first make sure that the code has been built at least once
(in other words, run the example app from your Flutter
IDE/editor, or in a terminal execute
`cd hello/example; flutter build linux`).

在 IDE 中编辑 Linux 平台代码之前，首先确保代码至少已经构建过一次
（换句话说，从你的 Flutter IDE/编辑器运行示例应用，
或在终端执行 `cd hello/example; flutter build linux`）。

Then use the following steps:

然后按照以下步骤操作：

1. Launch Visual Studio Code.

   启动 Visual Studio Code

1. Open the `hello/example/linux/` directory.

   打开 `hello/example/linux/` 目录。

1. Choose **Yes** in the prompt asking:
   `Would you like to configure project "linux"?`.
   This will allow C++ autocomplete to work.

   在询问 `Would you like to configure project "linux"?` 
   的提示中选择 **是**。这将启用 C++ 的自动补全。

The Linux platform code for your plugin is located in
`flutter/ephemeral/.plugin_symlinks/hello/linux/`.

你的插件的 Linux 平台代码位于
`flutter/ephemeral/.plugin_symlinks/hello/linux/`。

You can run the example app using `flutter run`.
**Note:** Creating a runnable Flutter application
on Linux requires steps that are part of the `flutter`
tool, so even if your editor provides CMake
integration building and running that way won't
work correctly.

你可以使用 `flutter run` 来运行示例应用。
**注意：** 在 Linux 上创建可运行的 Flutter 应用
需要执行 `flutter` 工具中的步骤，
所以即使你的编辑器提供了 CMake 集成，
以那种方式构建和运行也不会正确工作。

#### Step 2e: Add macOS platform code (.swift)

#### 步骤 2e：添加 macOS 平台代码（.swift）

We recommend you edit the macOS code using Xcode.

我们建议你使用 Xcode 编辑 macOS 代码。

Before editing the macOS platform code in Xcode,
first make sure that the code has been built at least once
(in other words, run the example app from your IDE/editor,
or in a terminal execute
`cd hello/example; flutter build macos --config-only`).

在 Xcode 中编辑 macOS 平台代码之前，
首先确保代码至少已经构建过一次（换句话说，从你的 IDE/编辑器运行示例应用，
或在终端执行 `cd hello/example; flutter build macos --config-only`）。

Then use the following steps:

然后按照以下步骤操作：

1. Launch Xcode.
   
   启动 Xcode。

1. Select **File > Open**, and select the
   `hello/example/macos/Runner.xcworkspace` file.

   选择 **File > Open**，
   然后选择 `hello/example/macos/Runner.xcworkspace` 文件。

The macOS platform code for your plugin is located in
`Pods/Development Pods/hello/../../example/macos/Flutter/ephemeral/.symlinks/plugins/hello/macos/Classes`
in the Project Navigator. (If you are using `sharedDarwinSource`,
the path will end with `hello/darwin/Classes` instead.)

你的插件的 macOS 平台代码位于 Project Navigator 的
`Pods/Development Pods/hello/../../example/macos/Flutter/ephemeral/.symlinks/plugins/hello/macos/Classes`。 
（如果你正在使用 `sharedDarwinSource`，路径将以 `hello/darwin/Classes` 结束。）

You can run the example app by pressing the run (&#9654;) button.

你可以点击运行 &#9654; 按钮来运行示例程序。

#### Step 2f: Add Windows platform code (.h+.cpp)

#### 步骤 2d：关联 API 和平台代码

We recommend you edit the Windows code using Visual Studio.

Before editing the Windows platform code in Visual Studio,
first make sure that the code has been built at least once
(in other words, run the example app from your IDE/editor,
or in a terminal execute
`cd hello/example; flutter build windows`).

Then use the following steps:

1. Launch Visual Studio.
1. Select **Open a project or solution**, and select the
   `hello/example/build/windows/hello_example.sln` file.

The Windows platform code for your plugin is located in
`hello_plugin/Source Files` and `hello_plugin/Header Files` in
the Solution Explorer.

You can run the example app by right-clicking `hello_example` in
the Solution Explorer and selecting **Set as Startup Project**,
then pressing the run (&#9654;) button. **Important:** After
making changes to plugin code, you must select
**Build > Build Solution** before running again, otherwise
an outdated copy of the built plugin will be run instead
of the latest version containing your changes.

#### Step 2g: Connect the API and the platform code

Finally, you need to connect the API written in Dart code with
the platform-specific implementations.
This is done using a [platform channel][],
or through the interfaces defined in a platform
interface package.

最后，你需要将 Dart 编写的 API 代码与特定平台的实现相互关联。
这是通过 [平台通道][platform channel] 完成的。

### Add support for platforms in an existing plugin project

### 为现有的插件项目加入平台的支持

To add support for specific platforms to an
existing plugin project, run `flutter create` with
the `--template=plugin` flag again in the project directory.
For example, to add web support in an existing plugin, run:

要在现有的插件项目中添加对特定平台的支持，
请在项目目录运行 `flutter create` 命令，并加入 `--template=plugin`。
例如，要对现有的插件项目添加 Web 支持，请运行以下命令。

```console
$ flutter create --template=plugin --platforms=web .
```

If this command displays a message about updating the
`pubspec.yaml` file, follow the provided instructions.

如果这个命令返回了一个关于需要更新 `pubspec.yaml` 文件的提醒，
请按照提示的说明进行操作。

### Dart platform implementations

### Dart 的平台实现

In many cases, non-web platform implementations only use the
platform-specific implementation language, as shown above. However,
platform implementations can also use platform-specific Dart as well.

在很多场景中，非 web 平台的实现仅仅使用了上述的平台特定语言。
然而，Dart 也是平台特定的语言之一。

:::note

The examples below only apply to non-web platforms. Web
plugin implementations are always written in Dart, and use
`pluginClass` and `fileName` for their Dart implementations
as shown above.

下方的例子仅适用于非 web 平台。
Web 平台的插件是用 Dart 编写的，
通过 `pluginClass` 和 `fileName` 来指定实现。

:::

#### Dart-only platform implementations

#### 纯 Dart 平台的实现

In some cases, some platforms can be
implemented entirely in Dart (for example, using FFI).
For a Dart-only platform implementation on a platform other than web,
replace the `pluginClass` in pubspec.yaml with a `dartPluginClass`.
Here is the `hello_windows` example above modified for a
Dart-only implementation:

如先前描述，通常插件会使用第二种语言，实现对应平台的功能。
然而，在某些场景下，部分平台可能会完全使用 Dart 进行实现（例如使用 FFI）。
若需要仅 Dart 的平台实现，你可以将 pubspec.yaml 里的
`pluginClass` 替换为 `dartPluginClass`。
下面是 `hello_windows` 示例替换为仅 Dart 实现的代码：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
```

In this version you would have no C++ Windows code, and would instead
subclass the `hello` plugin's Dart platform interface class with a
`HelloPluginWindows` class that includes a static
`registerWith()` method.  This method is called during startup,
and can be used to register the Dart implementation:

在这样的模式下，插件内不包含 Windows 的 C++ 代码，
它将继承 `hello` 插件的 Dart 平台接口，使用包含静态 `registerWith()`
方法的 `HelloPluginWindows` 类进行实现。
该方法会在启动时调用，用于注册 Dart 实现：

```dart
class HelloPluginWindows extends HelloPluginPlatform {
  /// Registers this class as the default instance of [HelloPluginPlatform].
  static void registerWith() {
    HelloPluginPlatform.instance = HelloPluginWindows();
  }
```

#### Hybrid platform implementations

#### 混合平台的实现

Platform implementations can also use both Dart and a platform-specific
language. For example, a plugin could use a different platform channel
for each platform so that the channels can be customized per platform.

平台实现可能同时会使用 Dart 以及某个特定平台的语言。
例如，plugin 可能会在不同平台使用不同的 platform channel，
这样 channel 就可以根据不同平台进行定制。

A hybrid implementation uses both of the registration systems
described above. Here is the `hello_windows` example above modified for a
hybrid implementation:

就和之前说的那样，混合实现将会使用多种注册方式。
这里有一个使用混合实现的 `hello_windows` 样例:

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
        pluginClass: HelloPlugin
```

The Dart `HelloPluginWindows` class would use the `registerWith()`
shown above for Dart-only implementations, while the C++ `HelloPlugin`
class would be the same as in a C++-only implementation.

Dart 类 `HelloPluginWindows` 会使用 `registerWith()` 方法做纯 Dart 的实现，
`HelloPlugin` 类则用来做纯 C++ 代码的实现。

### Testing your plugin

### 测试你的插件

We encourage you test your plugin with automated tests
to ensure that functionality doesn't regress
as you make changes to your code.

我们鼓励你通过自动化测试来测试你的插件，
以确保你对代码进行更改时，功能不会退化。

To learn more about testing your plugins,
check out [Testing plugins][].
If you are writing tests for your Flutter app
and plugins are causing crashes,
check out [Flutter in plugin tests][].

要了解更多关于测试你的插件的信息，请查阅 [测试插件][Testing plugins]。
如果你正在为你的 Flutter 应用编写测试，并且插件导致崩溃，请查看 [在插件测试中的 Flutter][Flutter in plugin tests]。

[Flutter in plugin tests]: /testing/plugins-in-tests
[Testing plugins]: /testing/testing-plugins

## Developing FFI plugin packages {:#plugin-ffi}

## 开发 FFI 插件

If you want to develop a package that calls into native APIs using
Dart's FFI, you need to develop an FFI plugin package.

如果你想开发一个通过 Dart 的 FFI 调用原生 API 的 package，
你需要开发一个 FFI 插件。

Both FFI plugin packages and non-FFI plugin packages support
bundling native code. However, FFI plugin packages don't
support method channels,
but they _do_ support method channel registration code.
To implement a plugin that uses both method channels
_and_ FFI, use a non-FFI plugin.
Each platform can use either an FFI or non-FFI platform.

FFI 插件和非 FFI 插件都支持捆绑原生代码，
需要注意的是，FFI 插件不支持方法通道 (method channel)，
但支持方法通道注册码 (method channel registration code)。
如果你想实现同时使用方法通道和 FFI 的插件，请使用非 FFI 插件。
每个平台都可以使用 FFI 或非 FFI 平台。

### Step 1: Create the package

### 第 1 步：创建 package

To create a starter FFI plugin package,
use the `--template=plugin_ffi` flag with `flutter create`:

要创建 FFI 插件，
请在 `flutter create` 指令中使用 `--template=plugin_ffi` 标志：

```console
$ flutter create --template=plugin_ffi hello
```

This creates an FFI plugin project in the `hello`
folder with the following specialized content:

上面的指令执行完成后，会在 `hello` 文件夹中创建一个 FFI 插件项目，
主要结构说明如下：

**lib**: The Dart code that defines the API of the plugin,
  and which calls into the native code using `dart:ffi`.

**lib**：定义插件 API 的 Dart 代码，使用 `dart:ffi` 调用本地原生代码。

**src**: The native source code, and a `CMakeLists.txt`
  file for building that source code into a dynamic library.

**src**：本地原生源代码，以及一个用于将源代码构建为动态库的 `CMakeLists.txt` 文件。

**platform folders** (`android`, `ios`, `windows`, etc.): The
  build files for building and bundling the native code
  library with the platform application.

**平台文件夹**（`android`、`ios`、`windows` 等等）：
用于构建本地原生代码库并与不同平台应用程序绑定。

### Step 2: Building and bundling native code

### 第 2 步：构建和绑定本地原生代码

The `pubspec.yaml` specifies FFI plugins as follows:

`pubspec.yaml` 中指定 FFI 插件的平台如下：

```yaml
  plugin:
    platforms:
      some_platform:
        ffiPlugin: true
```

This configuration invokes the native build
for the various target platforms and bundles
the binaries in Flutter applications using these FFI plugins.

上面这种配置调用了各个目标平台的本地原生构建，
并使 FFI 插件将二进制文件绑定在 Flutter 应用程序中。

This can be combined with `dartPluginClass`,
such as when FFI is used for the
implementation of one platform in a federated plugin:

这可以与 `dartPluginClass` 结合使用，
例如实现 FFI 被用于联合插件中的一个平台：

```yaml
  plugin:
    implements: some_other_plugin
    platforms:
      some_platform:
        dartPluginClass: SomeClass
        ffiPlugin: true
```

A plugin can have both FFI and method channels:

一个插件可以同时实现 FFI 和 方法通道 (method channel)：

```yaml
  plugin:
    platforms:
      some_platform:
        pluginClass: SomeName
        ffiPlugin: true
```

The native build systems that are invoked by FFI
(and method channels) plugins are:

被 FFI（和方法通道）插件调用的本地原生构建系统是：

* For Android: Gradle, which invokes the Android NDK for native builds.

  Android：是 Gradle，它调用 Android NDK 进行本地原生构建。

  * See the documentation in `android/build.gradle`.

    请查看 `android/build.gradle` 中的文档。

* For iOS and macOS: Xcode, using CocoaPods.

  iOS 和 MacOS：是 Xcode，通过 CocoaPods 进行本地原生构建。

  * See the documentation in `ios/hello.podspec`.

    请查看 `ios/hello.podspec` 中的文档。

  * See the documentation in `macos/hello.podspec`.

    请查看 `macos/hello.podspec` 中的文档。

* For Linux and Windows: CMake.

  Linux 和 Windows：是 CMake 进行本地原生构建。

  * See the documentation in `linux/CMakeLists.txt`.

    请查看 `linux/CMakeLists.txt` 中的文档。

  * See the documentation in `windows/CMakeLists.txt`.

    请查看 `windows/CMakeLists.txt` 中的文档。

### Step 3: Binding to native code

### 第 3 步：绑定本地原生代码

To use the native code, bindings in Dart are needed.

为了使用本地原生代码，需要在 Dart 中进行绑定。

To avoid writing these by hand,
they are generated from the header file
(`src/hello.h`) by [`package:ffigen`][].
Reference the [ffigen docs][] for information
on how to install this package.

To regenerate the bindings, run the following command:

为了避免手工编写，它们由头文件 (`src/hello.h`) 中的 [`package:ffigen`][] 生成。
运行以下指令重新生成绑定：

```console
$ dart run ffigen --config ffigen.yaml
```

### Step 4: Invoking native code

### 第 4 步：调用本地原生代码

Very short-running native functions can be directly
invoked from any isolate.
For an example, see `sum` in `lib/hello.dart`.

运行时间很短的本地原生函数可以在任何 isolate 中直接调用。
例如，请查看 `lib/hello.dart` 中的 `sum`。

Longer-running functions should be invoked on a
[helper isolate][] to avoid dropping frames in
Flutter applications.
For an example, see `sumAsync` in `lib/hello.dart`.

运行时间较长的本地原生函数应在 [helper isolate][] 上调用，
以避免在 Flutter 应用程序中掉帧。
例如，请查看 `lib/hello.dart` 中的 `sumAsync`。

## Adding documentation

## 添加文档

It is recommended practice to add the following documentation
to all packages:

建议将下列文档添加到所有 package 中：

1. A `README.md` file that introduces the package

   `README.md` 文件用来对 package 进行介绍
   
1. A `CHANGELOG.md` file that documents changes in each version
 
   `CHANGELOG.md` 文件用来记录每个版本的更改

1. A [`LICENSE`] file containing the terms under which the package
   is licensed

   [`LICENSE`][] 文件用来阐述 package 的许可条款
   
1. API documentation for all public APIs (see below for details)

   API 文档包含所有的公共 API（详情参见下文）

### API documentation

### API 文档

When you publish a package,
API documentation is automatically generated and
published to pub.dev/documentation.
For example, see the docs for [`device_info_plus`][].

当你提交一个 package 时，会自动生成 API 文档并将其提交到 
pub.dev/documentation，示例请参见 [`device_info_plus`][] 文档。

If you wish to generate API documentation locally on
your development machine, use the following commands:

如果你希望在本地开发环境中生成 API 文档，可以使用以下命令：

<ol>
<li>

Change directory to the location of your package:

将当前工作目录切换到 package 所在目录：

```console
cd ~/dev/mypackage
```

</li>

<li>

Tell the documentation tool where the
Flutter SDK is located (change the following commands to reflect
where you placed it):

告知文档工具 Flutter SDK 所在位置
（请自行更改以下指令，告知 Flutter SDK 所在的位置）：

```console
   export FLUTTER_ROOT=~/dev/flutter  # on macOS or Linux (适用于 macOS 或 Linux 操作系统)

   set FLUTTER_ROOT=~/dev/flutter     # on Windows (适用于 Windows 操作系统)
```
</li>

<li><t>Run the `dart doc` tool
    (included as part of the Flutter SDK), as follows:</t><t>运行 `dart doc` 工具（已经包含到 Flutter SDK 了）：</t>

```console
   $FLUTTER_ROOT/bin/cache/dart-sdk/bin/dart doc   # 适用于 macOS 或 Linux 操作系统

   %FLUTTER_ROOT%\bin\cache\dart-sdk\bin\dart doc  # 适用于 Windows 操作系统
```
</li>
</ol>

For tips on how to write API documentation, see
[Effective Dart Documentation][].

关于如何编写 API 文档的建议，请参阅 
[高效 Dart 指南][Effective Dart Documentation]。

### Adding licenses to the LICENSE file

### 将许可证添加到 LICENSE 文件中

Individual licenses inside each LICENSE file
should be separated by 80 hyphens
on their own on a line.

每个 LICENSE 文件中的各个许可证应由 80 个短线字符组成的线段进行分割。

If a LICENSE file contains more than one
component license, then each component
license must start with the names of the
packages to which the component license applies,
with each package name on its own line,
and the list of package names separated from
the actual license text by a blank line.
(The packages need not match the names of
the pub package. For example, a package might itself contain
code from multiple third-party sources,
and might need to include a license for each one.)

如果 LICENSE 文件中包含多个组件许可证，那么每个组件许可证必须以其所在 package
的名称开始，每个 package 名称单独一行显示，并且 package
名称列表与实际许可证内容由空行隔开。（package 名称则需与 pub package 相匹配。
比如，一个 package 可能包含多个第三方代码，并且可能需要为每个 package 添加许可证。）

The following example shows a well-organized license file:

如下是一些优秀的许可证文件：

```plaintext
package_1

<some license text>

--------------------------------------------------------------------------------
package_2

<some license text>
```

Here is another example of a well-organized license file:

这些也是可以的：

```plaintext
package_1

<some license text>

--------------------------------------------------------------------------------
package_1
package_2

<some license text>
```

Here is an example of a poorly-organized license file:

这些是一些不太好的示例：

```plaintext
<some license text>

--------------------------------------------------------------------------------
<some license text>
```

Another example of a poorly-organized license file:

这也是一些不太好的示例：

```plaintext
package_1

<some license text>
--------------------------------------------------------------------------------
<some license text>
```

## Publishing your package {:#publish}

## 提交 package

:::tip

Have you noticed that some of the packages and plugins
on pub.dev are designated as [Flutter Favorites][]?
These are the packages published by verified developers
and are identified as the packages and plugins you
should first consider using when writing your app.
To learn more,
see the [Flutter Favorites program][].

你是否注意到一些 package 和插件旁边的 [Flutter Favorites][] 标识？
这是官方挑选出的、由认证的开发者发布的 packages，
并建议 Flutter 开发者们需要使用时首要考虑的 package。
了解更多 [Flutter Favorites 项目][Flutter Favorites program]。

:::

Once you have implemented a package, you can publish it on
[pub.dev][], so that other developers can easily use it.

一旦完成了 package 的实现，你便可以将其提交到 [pub.dev][]
上，以便其他开发者可以轻松地使用它。

Prior to publishing, make sure to review the `pubspec.yaml`,
`README.md`, and `CHANGELOG.md` files to make sure their
content is complete and correct. Also, to improve the
quality and usability of your package (and to make it
more likely to achieve the status of a Flutter Favorite),
consider including the following items:

发布你的 package 之前，确保检查了这几个文件：`pubspec.yaml`、`README.md` 和
`CHANGELOG.md`，确保它们完整且正确，另外，为了提高 package 的可用性，
可以考虑加入如下的内容：

* Diverse code usage examples

  代码的示例用法

* Screenshots, animated gifs, or videos

  屏幕截图，GIF 动画或者视频
 
* A link to the corresponding code repository

  代码库的正确指向链接

Next, run the publish command in `dry-run` mode
to see if everything passes analysis:

接下来，运行 dry-run 命令以检验是否所有内容都通过了分析：

```console
$ flutter pub publish --dry-run
```

The next step is publishing to pub.dev,
but be sure that you are ready because
[publishing is forever][]:

最后一步是发布，请注意：[发布是永久性][publishing is forever] 的，
运行以下提交命令：

```console
$ flutter pub publish
```

:::note
设置了中国镜像的开发者们请注意：
目前所存在的镜像都不能（也不应该）进行 package 的上传。
如果你设置了镜像，执行上述发布代码可能会造成发布失败。
网络设定好后，无需取消中文镜像，执行下述代码可直接上传：

```console
$ flutter pub publish --server=https://pub.dartlang.org
```
:::

For more details on publishing, see the
[publishing docs][] on dart.dev.

有关提交的详细信息，请查阅关于 Pub 站点的 [提交文档][publishing docs]。

## Handling package interdependencies {:#dependencies}

## Package 依赖处理

If you are developing a package `hello` that depends on
the Dart API exposed by another package, you need to add
that package to the `dependencies` section of your
`pubspec.yaml` file. The code below makes the Dart API
of the `url_launcher` plugin available to `hello`:

如果你正在开发的 `hello` 依赖于另外一个 package 所公开的 Dart API，
你需要将该 package 添加到文件 `pubspec.yaml` 的 `dependencies` 段中。
以下代码使得插件 `url_launcher` 的 Dart API 在 `hello` 中可用：

```yaml
dependencies:
  url_launcher: ^6.3.1
```

You can now `import 'package:url_launcher/url_launcher.dart'`
and `launch(someUrl)` in the Dart code of `hello`.

现在你可以在 `hello` 的 Dart 代码中使用
`import 'package:url_launcher/url_launcher.dart'` 和 `launch(someUrl)`。

This is no different from how you include packages in
Flutter apps or any other Dart project.

这与你在 Flutter 应用或其他任何 Dart 项目中引入 package 的方式没什么区别。

But if `hello` happens to be a _plugin_ package
whose platform-specific code needs access
to the platform-specific APIs exposed by `url_launcher`,
you also need to add suitable dependency declarations
to your platform-specific build files, as shown below.

但碰巧 `hello` 是一个 **原生插件** package，其特定的平台代码如果需要访问 `url_launcher`
所公开的平台特定 API，那么还需要为特定平台的构建文件添加适当的依赖说明，如下所示：

### Android

The following example sets a dependency for
`url_launcher` in `hello/android/build.gradle`:

在 `hello/android/build.gradle` 文件中为 `url_launcher` 插件设定依赖关系。

```groovy
android {
    // lines skipped
    dependencies {
        compileOnly rootProject.findProject(":url_launcher")
    }
}
```

You can now `import io.flutter.plugins.urllauncher.UrlLauncherPlugin`
and access the `UrlLauncherPlugin`
class in the source code at `hello/android/src`.

现在你可以在 `hello/android/src` 目录下的源代码文件中使用
`import io.flutter.plugins.urllauncher.UrlLauncherPlugin`
并访问文件 `UrlLauncherPlugin`。

For more information on `build.gradle` files, see the
[Gradle Documentation][] on build scripts.

如果希望了解更多有关 `build.gradle` 文件更多的信息，请参阅
[Gradle 文档][Gradle Documentation] 了解构建脚本。

### iOS

The following example sets a dependency for
`url_launcher` in `hello/ios/hello.podspec`:

在 `hello/ios/hello.podspec` 文件中为 `url_launcher` 插件设定依赖关系。

```ruby
Pod::Spec.new do |s|
  # lines skipped
  s.dependency 'url_launcher'
```

You can now `#import "UrlLauncherPlugin.h"` and
access the `UrlLauncherPlugin` class in the source code
at `hello/ios/Classes`.

现在你可以在 `hello/ios/Classes` 目录下的源代码文件中使用 `#import "UrlLauncherPlugin.h"` 
并访问 `UrlLauncherPlugin` 这个类了。

For additional details on `.podspec` files, see the
[CocoaPods Documentation][].

如果希望了解更多有关 `.podspec` 文件更多的信息，请参阅
[CocoaPods 文档][CocoaPods Documentation] 了解。

### Web

All web dependencies are handled by the `pubspec.yaml`
file, like any other Dart package.

与其他的 Dart package 一样，
所有的 Web 依赖都由文件 `pubspec.yaml` 来处理。

{% comment %}
<!-- Remove until we have better text. -->
### MacOS

PENDING
{% endcomment %}

[CocoaPods Documentation]: https://guides.cocoapods.org/syntax/podspec.html
[Dart library package]: {{site.dart-site}}/guides/libraries/create-library-packages
[`device_info_plus`]: {{site.pub-api}}/device_info_plus
[Effective Dart Documentation]: {{site.dart-site}}/guides/language/effective-dart/documentation
[federated plugins]: #federated-plugins
[ffigen docs]: {{site.pub-pkg}}/ffigen/install
[Android]: /platform-integration/android/c-interop
[iOS]: /platform-integration/ios/c-interop
[macOS]: /platform-integration/macos/c-interop
[`fluro`]: {{site.pub}}/packages/fluro
[Flutter editor]: /tools/editors
[Flutter Favorites]: {{site.pub}}/flutter/favorites
[Flutter Favorites program]: /packages-and-plugins/favorites
[Gradle Documentation]: https://docs.gradle.org/current/userguide/tutorial_using_tasks.html
[helper isolate]: {{site.dart-site}}/guides/language/concurrency#background-workers
[How to Write a Flutter Web Plugin, Part 1]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-5e26c689ea1
[How To Write a Flutter Web Plugin, Part 2]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[issue #33302]: {{site.repo.flutter}}/issues/33302
[`LICENSE`]: #adding-licenses-to-the-license-file
[`path`]: {{site.pub}}/packages/path
[`package:ffigen`]: {{site.pub}}/packages/ffigen
[platform channel]: /platform-integration/platform-channels
[pub.dev]: {{site.pub}}
[publishing docs]: {{site.dart-site}}/tools/pub/publishing
[publishing is forever]: {{site.dart-site}}/tools/pub/publishing#publishing-is-forever
[supported-platforms]: #plugin-platforms
[test your plugin]: #testing-your-plugin
[unit tests]: /testing/overview#unit-tests
[`url_launcher`]: {{site.pub}}/packages/url_launcher
[Writing a good plugin]: {{site.flutter-medium}}/writing-a-good-flutter-plugin-1a561b986c9c
