---
# title: Pass arguments to a named route
title: 给特定的 route 传参
# description: How to pass arguments to a named route.
description: 如何向命名路由传参。
tags: cookbook, 实用教程, 路由
keywords: 参数传递,读取参数
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/navigation/navigate_with_arguments"?>

The [`Navigator`][] provides the ability to navigate
to a named route from any part of an app using
a common identifier.
In some cases, you might also need to pass arguments to a
named route. For example, you might wish to navigate to the `/user` route and
pass information about the user to that route.

[`Navigator`][] 组件支持通过使用通用标识符从应用程序的任何地方导航到特定路由。
在某些情况下，你可能还希望能够传递参数给特定路由。
例如，你希望导航到 `/user` 路由并携带上用户信息。

:::note

Named routes are no longer recommended for most
applications. For more information, see
[Limitations][] in the [navigation overview][] page.

针对大多数的应用情况，我们不再推荐使用命名的路由 (Named routes)，
了解更多信息，请参考 [导航概览][navigation overview] 中的 [受限情况][Limitations] 部分。

:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

You can accomplish this task using the `arguments` parameter of the
[`Navigator.pushNamed()`][] method. Extract the arguments using the
[`ModalRoute.of()`][] method or inside an [`onGenerateRoute()`][]
function provided to the [`MaterialApp`][] or [`CupertinoApp`][]
constructor.

在 Flutter 中，你能通过提供额外的 `arguments` 给 
[`Navigator.pushNamed()`][] 方法方便地完成这个任务。
通过使用 [`ModalRoute.of()`][] 方法或 
[`MaterialApp`][] 和 [`CupertinoApp`][] 构造器中的 
[`onGenerateRoute()`][] 来获取参数。

This recipe demonstrates how to pass arguments to a named
route and read the arguments using `ModalRoute.of()`
and `onGenerateRoute()` using the following steps:

这个章节讲解的是如何给特定路由传递参数并使用
`ModalRoute.of()` 和 `onGenerateRoute()` 来读取参数。

## Directions

## 步骤

  1. Define the arguments you need to pass.

     定义需要传递的参数

  2. Create a widget that extracts the arguments.

     创建组件来获取参数

  3. Register the widget in the `routes` table.

     把组件注册到路由表中

  4. Navigate to the widget.

     导航到组件

## 1. Define the arguments you need to pass

## 1. 定义需要传递的参数

First, define the arguments you need to pass to the new route.
In this example, pass two pieces of data:
The `title` of the screen and a `message`.

首先，定义需要传递给新路由的参数。
在这个示例中我们传递了两个数据：页面的标题 `title` 和内容 `message`。

To pass both pieces of data, create a class that stores this information.
创建包含 title 和 message 字段的实体类来同时传递这两个数据。

<?code-excerpt "lib/main.dart (ScreenArguments)"?>
```dart
// You can pass any object to the arguments parameter.
// In this example, create a class that contains both
// a customizable title and message.
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
```

## 2. Create a widget that extracts the arguments

## 2. 创建组件来获取参数

Next, create a widget that extracts and displays the
`title` and `message` from the `ScreenArguments`.
To access the `ScreenArguments`,
use the [`ModalRoute.of()`][] method.
This method returns the current route with the arguments.

接着，创建组件，从 `ScreenArguments` 提取 `title` 和 `message` 参数并展示。
为了访问 `ScreenArguments`，可以使用 [`ModalRoute.of()`][] 方法。
这个方法返回的是当前路由及其携带的参数。

<?code-excerpt "lib/main.dart (ExtractArgumentsScreen)"?>
```dart
// A Widget that extracts the necessary arguments from
// the ModalRoute.
class ExtractArgumentsScreen extends StatelessWidget {
  const ExtractArgumentsScreen({super.key});

  static const routeName = '/extractArguments';

  @override
  Widget build(BuildContext context) {
    // Extract the arguments from the current ModalRoute
    // settings and cast them as ScreenArguments.
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

    return Scaffold(
      appBar: AppBar(title: Text(args.title)),
      body: Center(child: Text(args.message)),
    );
  }
}
```

## 3. Register the widget in the `routes` table

## 3. 把组件注册到路由表中

Next, add an entry to the `routes` provided to the `MaterialApp` widget. The
`routes` define which widget should be created based on the name of the route.

然后，在 `MaterialApp` 的路由表 `routes` 中增加一个入口，
路由表 `routes` 会根据路由的名称来决定需要创建哪个路由。 

{% comment %}
RegEx removes the return statement and adds the closing parenthesis at the end
{% endcomment %}
<?code-excerpt "lib/main.dart (routes)" plaster="none" replace="/return //g;/^\);$/)/g"?>
```dart
MaterialApp(
  routes: {
    ExtractArgumentsScreen.routeName: (context) =>
        const ExtractArgumentsScreen(),
  },
)
```


## 4. Navigate to the widget

## 4. 导航到组件

Finally, navigate to the `ExtractArgumentsScreen`
when a user taps a button using [`Navigator.pushNamed()`][].
Provide the arguments to the route via the `arguments` property. The
`ExtractArgumentsScreen` extracts the `title` and `message` from these
arguments.

最后，在用户点击按钮后导航到 `ExtractArgumentsScreen`。
在 [`Navigator.pushNamed()`][] 方法的 `arguments` 属性里提供需要传递的参数。
随后，`ExtractArgumentsScreen` 就可以从参数中提取 `title` 和 `message`。

<?code-excerpt "lib/main.dart (PushNamed)"?>
```dart
// A button that navigates to a named route.
// The named route extracts the arguments
// by itself.
ElevatedButton(
  onPressed: () {
    // When the user taps the button,
    // navigate to a named route and
    // provide the arguments as an optional
    // parameter.
    Navigator.pushNamed(
      context,
      ExtractArgumentsScreen.routeName,
      arguments: ScreenArguments(
        'Extract Arguments Screen',
        'This message is extracted in the build method.',
      ),
    );
  },
  child: const Text('Navigate to screen that extracts arguments'),
),
```

## Alternatively, extract the arguments using `onGenerateRoute`

## 此外，还可以使用 `onGenerateRoute` 提取参数

Instead of extracting the arguments directly inside the widget, you can also
extract the arguments inside an [`onGenerateRoute()`][]
function and pass them to a widget.

除了直接从组件里提取参数，你也可以通过 [`onGenerateRoute()`][] 函数提取参数，
然后把参数传递给组件。

The `onGenerateRoute()` function creates the correct route based on the given
[`RouteSettings`][].

`onGenerateRoute()` 函数会基于给定的 [`RouteSettings`][] 来创建正确的路由。

{% comment %}
RegEx removes the return statement, removed "routes" property and adds the closing parenthesis at the end
{% endcomment %}

```dart
MaterialApp(
  // Provide a function to handle named routes.
  // Use this function to identify the named
  // route being pushed, and create the correct
  // Screen.
  onGenerateRoute: (settings) {
    // If you push the PassArguments route
    if (settings.name == PassArgumentsScreen.routeName) {
      // Cast the arguments to the correct
      // type: ScreenArguments.
      final args = settings.arguments as ScreenArguments;

      // Then, extract the required data from
      // the arguments and pass the data to the
      // correct screen.
      return MaterialPageRoute(
        builder: (context) {
          return PassArgumentsScreen(
            title: args.title,
            message: args.message,
          );
        },
      );
    }
    // The code only supports
    // PassArgumentsScreen.routeName right now.
    // Other values need to be implemented if we
    // add them. The assertion here will help remind
    // us of that higher up in the call stack, since
    // this assertion would otherwise fire somewhere
    // in the framework.
    assert(false, 'Need to implement ${settings.name}');
    return null;
  },
)
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter complete navigation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        ExtractArgumentsScreen.routeName: (context) =>
            const ExtractArgumentsScreen(),
      },
      // Provide a function to handle named routes.
      // Use this function to identify the named
      // route being pushed, and create the correct
      // Screen.
      onGenerateRoute: (settings) {
        // If you push the PassArguments route
        if (settings.name == PassArgumentsScreen.routeName) {
          // Cast the arguments to the correct
          // type: ScreenArguments.
          final args = settings.arguments as ScreenArguments;

          // Then, extract the required data from
          // the arguments and pass the data to the
          // correct screen.
          return MaterialPageRoute(
            builder: (context) {
              return PassArgumentsScreen(
                title: args.title,
                message: args.message,
              );
            },
          );
        }
        // The code only supports
        // PassArgumentsScreen.routeName right now.
        // Other values need to be implemented if we
        // add them. The assertion here will help remind
        // us of that higher up in the call stack, since
        // this assertion would otherwise fire somewhere
        // in the framework.
        assert(false, 'Need to implement ${settings.name}');
        return null;
      },
      title: 'Navigation with Arguments',
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // A button that navigates to a named route.
            // The named route extracts the arguments
            // by itself.
            ElevatedButton(
              onPressed: () {
                // When the user taps the button,
                // navigate to a named route and
                // provide the arguments as an optional
                // parameter.
                Navigator.pushNamed(
                  context,
                  ExtractArgumentsScreen.routeName,
                  arguments: ScreenArguments(
                    'Extract Arguments Screen',
                    'This message is extracted in the build method.',
                  ),
                );
              },
              child: const Text('Navigate to screen that extracts arguments'),
            ),
            // A button that navigates to a named route.
            // For this route, extract the arguments in
            // the onGenerateRoute function and pass them
            // to the screen.
            ElevatedButton(
              onPressed: () {
                // When the user taps the button, navigate
                // to a named route and provide the arguments
                // as an optional parameter.
                Navigator.pushNamed(
                  context,
                  PassArgumentsScreen.routeName,
                  arguments: ScreenArguments(
                    'Accept Arguments Screen',
                    'This message is extracted in the onGenerateRoute '
                        'function.',
                  ),
                );
              },
              child: const Text('Navigate to a named that accepts arguments'),
            ),
          ],
        ),
      ),
    );
  }
}

// A Widget that extracts the necessary arguments from
// the ModalRoute.
class ExtractArgumentsScreen extends StatelessWidget {
  const ExtractArgumentsScreen({super.key});

  static const routeName = '/extractArguments';

  @override
  Widget build(BuildContext context) {
    // Extract the arguments from the current ModalRoute
    // settings and cast them as ScreenArguments.
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

    return Scaffold(
      appBar: AppBar(title: Text(args.title)),
      body: Center(child: Text(args.message)),
    );
  }
}

// A Widget that accepts the necessary arguments via the
// constructor.
class PassArgumentsScreen extends StatelessWidget {
  static const routeName = '/passArguments';

  final String title;
  final String message;

  // This Widget accepts the arguments as constructor
  // parameters. It does not extract the arguments from
  // the ModalRoute.
  //
  // The arguments are extracted by the onGenerateRoute
  // function provided to the MaterialApp widget.
  const PassArgumentsScreen({
    super.key,
    required this.title,
    required this.message,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text(message)),
    );
  }
}

// You can pass any object to the arguments parameter.
// In this example, create a class that contains both
// a customizable title and message.
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigate-with-arguments.webp" alt="Demonstrates navigating to different routes with arguments" class="site-mobile-screenshot" />
</noscript>


[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`ModalRoute.of()`]: {{site.api}}/flutter/widgets/ModalRoute/of.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Navigator.pushNamed()`]: {{site.api}}/flutter/widgets/Navigator/pushNamed.html
[`onGenerateRoute()`]: {{site.api}}/flutter/widgets/WidgetsApp/onGenerateRoute.html
[`RouteSettings`]: {{site.api}}/flutter/widgets/RouteSettings-class.html
