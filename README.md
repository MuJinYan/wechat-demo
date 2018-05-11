# wechat-demo  - 一个从0开始的微信小程序

## 整体结构

#### 1.根路径下需要创建三个文件，分别是 `app.json , app.wxss , app.js`
其中app.json和app.js 必须存在，会在小程序启动时只执行一次且文件名不可以更改。
#### 2.每个页面由.wxml、.wxss、.js、.json 组成，且wxml和js必须存在，而且这4个文件的文件名必须一致，可以同目录名不同，但为了便于管理，最好一致

## 根目录文件详细说明
### app.json
#### 1.pages 设置页面路径，必填项，一个数组，各元素为路径+文件名(不加文件后缀)，默认第一个路径为首页
#### 2.window 设置小程序状态栏、导航条、标题、窗口背景色等系统级样式
> * `navagationBarBackgroundColor` ： 导航栏背景色，16进制颜色值
> * `navigationBarTextStyle` ：导航栏标题颜色，仅支持black/white
> * `navigationBarTitleText` ：导航栏标题文字
> * `navigationStyle` ：导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮 微信版本 6.6.0 navigationStyle 只在 app.json 中生效。开启 custom 后，低版本客户端需要做好兼容。开发者工具基础库版本切到 1.7.0（不代表最低版本，只供调试用） 可方便切到旧视觉
> * `backgroundColor` ：窗口背景色 16进制颜色值
> * `backgroundTextStyle` ：下拉背景字体、Loading图的样式 仅支持dark/light
> * `backgroundColorTop` ：顶部窗口的背景色，仅 iOS 支持	   微信版本 6.5.16
> * `backgroundColorBottom` ：底部窗口的背景色，仅 iOS 支持	微信版本 6.5.16
> * `enablePullDownRefresh` ：是否开启下拉刷新,默认为false 类型为boolean
> * `onReachBottomDistance` ：页面上拉触底事件触发时距页面底部距离，单位为px 类型为number

### 3.tabBar 指定 tab 栏的表现，以及 tab 切换时显示的对应页面。
> * 注意：
  * 当设置 position 为 top 时，将不会显示 icon
  * tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
> * 属性说明
  * `color` tab上文字的默认颜色，16进制颜色值
  * `selectedColor` 选中文字的颜色 16进制颜色值
  * `backgroundColor` tab的背景色 16进制颜色值
  * `borderStyle` tabbar上边框的颜色， 仅支持 black/white
  * `list` tab 的列表，其值是一个数组，数组中每一项是一个对象，代表一个tab的相关配置
        * `pagePath` 页面路径，必须在 pages 中先定义
        * `text` tab 上按钮文字
        * `iconPath` 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
        * `selectedIconPath` 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
  * `position` tab栏的位置，可选值 bottom、top

### 4.networkTimeout 小程序中各种网络请求api的超时时间只能通过networkTimeout统一设置，不能在api中单独设置
> * `request`   wx.request的超时时间，单位毫秒，默认为：60000
> * `connectSocket` wx.connectSocket的超时时间，单位毫秒，默认为：60000
> * `uploadFile`  wx.uploadFile的超时时间，单位毫秒，默认为：60000
> * `downloadFile`  wx.downloadFile的超时时间，单位毫秒，默认为：60000

### 5.debug 是否开启调试模式，默认关闭


## 小程序逻辑
> * 分为页面逻辑文件和小程序逻辑文件，`app.js`便是小程序文件，在其中，通过`App()`函数注册小程序生命周期函数、全局方法和全局属性，已注册的小程序可以在其他逻辑层代码中通过`getApp()`获取
> * `App()`函数用于注册一个小程序，参数为一个对象，在这个参数对象中可以注册自定义方法和属性供全局使用，且此函数必须在`App.js`中注册**唯一的一个**。
> * 参数属性--**以下3个方法为生命周期函数，尽量不要私自调用生命周期函数，除非非常熟悉**
>   * `onLaunch` 监听小程序初始化，当小程序初始化完成时触发，且全局只会触发一次
>   * `onShow` 监听小程序显示，当小程序启动或从后台进入前台显示时会触发
>   * `onHide` 监听小程序隐藏，当小程序从前台进入后台时触发
> * 其他  可以添加任意的函数和数据到`object`参数中，这些属性会被注册到小程序对象中，其他逻辑文件可以通过`getApp()`函数获取已注册的小程序实例
> * 在`App()`注册的函数中，可以直接使用`this`获取小程序实例，不需要通过`getApp()`获取，当获取实例后，可以获取注册的属性、调用注册的方法

#### 小程序生命周期函数执行时机
> * 当启动一个程序时，首先会触发onLaunch和onShow方法，然后通过app.json的pages属性注册相应的页面，最后根据默认路径加载首页
> * 当用户点击左上角的关闭或者home键离开微信时，小程序并没有销毁，而是进入了后台，触发了onHide方法
> * 当再次唤醒微信或者在微信中打开小程序的时候，是从后台进入前台，触发onShow方法
> * 只有当小程序进入后台一定时间，或者系统资源占用锅盖，才会真正被销毁

## 框架页面
### 页面配置文件
> * 页面配置文件和框架配置文件一样，是一个json文件，不同的是，页面配置文件是非必要存在的
> * 页面配置文件的配置项只有`window`，控制当前页面的窗口表现，`window`的属性和`app.json`一致。渲染时，页面的window配置项会覆盖`app.json`中的相同配置项。由于页面的`json`只能配置`window`相关属性，所以编写时直接写出属性而不用写`window`这个键。

### 页面逻辑文件
> * 主要功能有：设置初始化数据，注册当前页面生命周期函数、注册事件处，理函数等。小程序的逻辑层文件是`Js`文件，所有的逻辑文件包括`app.js`最终会打包成一个`js`文件在小程序启动时运行，知道小程序销毁。
> * 每个逻辑文件有独立的作用域，且具备模块化的能力。
> * `js`文件是运行在纯`js`引擎中而非浏览器中，所以一些浏览器提供的特有对象，例如`document`、`window`等在小程序时无法使用的。同理的`jq`、`zepto`也不能使用，同时不能通过操作`DOM`改变页面。


#### 1.注册页面
> * 通过`Page()`函数注册页面，指定页面的初始数据、生命周期函数、事件处理函数等。参数为一个`object`对象
> * `data` 页面的初始数据，数据格式必须是可转成`json`格式的对象类型。当页面第一次渲染时，data会以`json`的形式由逻辑层传至渲染层，渲染层可以通过`wxml`对数据进行绑定
> * `onLoad` 页面加载时触发，一个页面只会调用一次，接受页面参数，可以获取`wx.navigateTo`、`wx.redirectTo`以及其中的`query`参数
> * `onShow` 页面显示时触发，每次打开页面都会调用一次
> * `onReady` 页面初次渲染完成时触发，一个页面生命周期中只会调用一次，代表当前页面已经准备完毕，可以和视图层进行交互。
> * `onHide` 页面隐藏时触发
> * `onUnload` 页面卸载时触发
> * `onPullDownRefresh` 页面相关事件处理函数，用户下拉时触发。使用时需要将`app.json`中`window`中的`enablePullDownRefresh`设置为`true`。当处理完数据刷新后，可以调用`wx.stopPullDownRefresh`停止当前页面的下拉刷新。
> * `onReachBottom` 页面上拉触底事件的处理函数
> * 其他 可以添加任意的函数或数据到`object`参数中。可以用`this`访问这些函数和数据。自定义函数可与渲染层中的组件进行事件绑定(类似于react中的setState())

### 当发生路由切换时，页面栈和生命周期函数的关系
> * 小程序初始化 默认页面入栈，依次触发`onLoad`、`onShow`、`onReady`
> * 打开新页面 新页面入栈，依次触发新页面的`onLoad`、`onShow`、`onReady`
> * 页面重定向 当前页面出栈并卸载，触发当前页面的`onUnload`，新页面入栈，触发新页面的`onLoad`、`onShow`、`onReady`
> * 页面返回 页面不断出栈并卸载，触发当前弹出页面`onUnload`，直到返回目标页面，新页面入栈，触发新页面`onShow`方法
> * tab切换 当前页面出栈但不卸载，仅触发`onHide`方法，新页面入栈，如果当前页面是新加载的，触发`onLoad`、`onShow`、`onReady`。如果当前页面已加载过，触发`onShow`
> * 程序从前台到后台 触发当前页面`onHide`方法，触发`app onHide`方法
> * 程序从后台到前台 触发小程序`onShow`，触发页面`onShow`

### 获取当前页面栈
> * `getCurrentPages()`函数用于获取当前页面栈的实例，页面栈以数组形式按栈书序给出，第一个元素为首页，最后一个元素为当前页。
### 事件处理函数
> * 页面对象中注册的函数可以和视图层中的组件进行绑定，当达到触发条件，就会执行`Page`中定义的相应事件。

### 触发视图层渲染
> * 页面首次加载时，框架会结合初始化数据渲染页面，在逻辑层中需要调用`Page.prototype.setData()`进行数据的修改，这样数据会从逻辑层发送到视图层，触发视图层的重绘，同时会修改`Page`的`data`值。`setData`接收一个`object`。当`object`中的`key`和`this.data`中的`key`不同会触发视图层的渲染。方法会自动将`this.data`中的`key`对应的值变为`object`中的`key`值
> * `object`参数中的`key`可以按数据路径的形式给出，例如`array[5].info`、`obj.key.subkey`，并且这样使用，不需要在`this.data`中预先定义。包括`setData`中也可以这样写。而且还能修改一个`wxml`中已绑定但未在`data`中定义的数据。

### 页面生命周期
> * 当逻辑层线程触发`onLoad`、`onShow`方法后会把出初始数据`data`传送给视图层线程，视图层完成第一次渲染后触发逻辑层`onReady`，之后通过`setData`方法主动触发视图层渲染，当页面被调往后台，触发`onHide`，这时候逻辑层并没有被销毁，仍然可以通过代码控制视图层渲染，只是可能不会在界面中表现出来。当页面从后台回到前台，触发`onShow`方法，最后页面销毁时，触发`onUnload`。在路由方式中只有页面重定向和页面返回会结束当前页面生命周期，进去一个已加载的页面触发的是`onShow`，而不是`onLoad`和`onReady`。

### 页面结构文件(WXML)
> * 是框架设计的一套标记语言，用于渲染界面，渲染原理和React Native思路一致，通过一套标记语言，在不同平台被解析为不同端的渲染文件。
> * 因为WXML语言最终会转译为宿主端对应的语言，所以WXML中一定是小程序定义的标签，不能使用自定义标签，这样才能正确的被转译。
> * WXML具有数据绑定、列表渲染、条件渲染、模板、事件等能力。

> * #### 数据绑定
    * 页面渲染时，将WXML文件同对应Page的`data`进行绑定,使用`{{}}`进行绑定
    * 组件属性是boolean时，不能直接写`checked="false"`,这样是checked的值是字符串false,转成boolean类型是true,要写为`checked="{{false}}"`
    * 组合：直接将数据作为value值进行组合、用`...`展开对象、对象的key和value相同，可以只写key值，当一个组合中有相同属性名时，后面的属性会覆盖前面的属性
> * #### 条件渲染
   * `wx:if="{{判断条件}}"` 成立时渲染,后两者必须配合`wx:if`使用
   * `wx:elif="{{判断条件}}"`
   * `wx:else`
   * `wx:if`和`hidden` `wx:if`控制是否渲染条件内的模板，当其条件值切换时，会触发局部渲染以确保条件块在切换时销毁或重新渲染，如果在初始渲染条件为false时，框架什么都不做，在条件第一次为真时才渲染
     `hidden`是控制组件是否显示，组件始终会被渲染，只是简单的控制显示和隐藏，并不会触发重新渲染和销毁。所以在频繁切换的场景下不要使用`wx:if`会造成更大的损耗，而是改为使用`hidden`。
> * #### 列表渲染
  * `wx:for` 遍历数组，下标变量为`index`,项目名为`item`   `{{index}}:{{item}}`
  * `wx:for-index`和`wx：for-item`进行变量名的修  `wx:for-index="myIndex"` `wx:for-item="myItem"`  `{{myIndex}}:{{myItem.name}}`
> * #### 模板
  * 相同的结构在不同的地方反复出现，可以将相同的布局代码片段放置到一个模板中，在不同的地方传入对应的数据进行渲染
  * `<template/>` 定义模板，设置`<template/>`的`name`属性，指定模板名称即可
  * 在`<template/>`上设置`is`属性指向需要使用的模板，设置`data`属性，将模板所需的变量传入，模板拥有自己的作用域，只能使用`data`属性传入的数据，不能直接使用`Page中的data数据`，模板`is`属性支持数据绑定，可以通过属性绑定动态决定使用哪个模板,`<template is="{{templateName}}" data="myData">`
  * 模板可以嵌套使用
> * #### 事件
  * 冒泡事件：`touchstart` `touchmove` `touchcancel` `touchend` `tap` `longtap`
  * 其余组件自定义事件无特殊声明都是非冒泡事件
  * 事件绑定 `bind/catch+事件名` 均为小写  `bind`不阻止冒泡，`catch`阻止冒泡
  * 事件对象  当组件触发事件时，事件处理函数会收到一个事件对象
> * 引用
    * 一个WXML通过`import/include`  `import`引入只接受模板的定义，忽略模板定义之外的所有内容，`include`引入除`<template/>`以外的代码直接拷贝到`<include/>`位置   `import`引入模板定义,`include`引入组件
    * `<import src="b.wxml"/>` src为相对路径，`import`引用有作用域概念，只能使用直接引入的定义模板，不能使用间接引入的定义模板

   ```
   //wx:if 是一个控制属性，可以写在任何组件标签上
   //但当需要包装多个组件且不想影响布局，就需要使用<block/>标签将需要包装的组件放置在里面，通过wx:if进行判断
   //<block/>不是组件仅仅是一个包装元素，页面渲染过程中不做任何渲染
    <block wx:if="{{true}}">
        <view>view组件</view>
        <image/>
    </block>
   ```


### 页面样式文件(wxss)
 * `rpx` `rem` 相对单位，最后会换算成px wxss规定屏幕宽度为`750rpx`/`20rem`,所以在iphone6中 `750rpx=375px  1rpx=0.5px`/`20rem=375px 1rem=18.75px`
 * `@import`引入其他wxss文件，以`;`表示结束


### 模块化
> * `module.exports = {}` 导出模块，小程序中一个js就是一个模块
> * `require(path)` 引入

### 组件
> * 组件的属性名都是小写，以`-`连接
> * 组件属性分为所有组件都有的共同属性和组件自定义的特殊属性
> * 共同属性：`id` `class` `style` `hidden` `data-*`(自定义属性，组件上触发事件时，会发送给事件处理函数，事件处理函数可以通过`datascl`获取) `bind*/catch*`

#### view组件
> * `hover` 是否启动点击态 默认值为false
> * `hover-class` 指定按下去的样式，当`hover-class="none"`时，没有点击效果，默认值为none
> * `hover-start-time` 按住后多久出现点击态，单位毫秒，默认值50
> * `hover-stay-time` 手指松开后点击态保留时间，单位毫秒，默认值400

#### scroll-view组件
> * 在`<view/>`的基础上添加了滚动相关的属性
> * `scroll-x` 允许横向滚动，默认值false
> * `scroll-y` 允许纵向滚动，默认值false
> * `upper-threshold` 距顶部/左边多远时，触发`scrolltoupper`事件，默认值50，单位px
> * `lower-threshold` 距底部/右边多远时，触发`scrolltolower`事件，默认值50，单位px
> * `scroll-top` 设置竖向滚动条位置
> * `scroll-left` 设置横向滚动条位置
> * `scroll-into-view` 值应为某子元素id,滚动到该元素时，元素顶部对齐滚动区域顶部
> * `bindscrolltoupper` 滚动到顶部/左边 触发`scrolltoupper`事件
> * `bindscrolltolower` 滚动到底部/右边 触发`scrolltolower`事件
> * `bindscroll` 滚动时触发 `event.detail = {scrollLeft,scrollTop,scrollHeight,scrollWidth,deltaX,deltaY}`
> * `<textarea />` `<video/>` `<map/>` `<convas>` 不能再`<scroll-view/>`中使用
> * 使用纵向滚动时，需要给`<scroll-view/>`一个固定高度

#### 滑动视图组件(<swiper/>和<swiper-item/>组成)
> * `<swiper-item/>` 内部能放置任何组件，默认宽高自动设置为100%
> * `<swiper/>`属性
>   * `indicator-dots` 是否显示面板指示点，默认为false
>   * `autoplay` 是否自动切换，默认为false
>   * `current` 当前所在页面的index,默认为0
>   * `interval` 自动切换时间间隔，默认为5000
>   * `duration` 滑动动画时长，默认为1000
>   * `circular` 是否采用衔接滑动，默认为false
>   * `bindchange` current改变时会触发change事件，`event.detail={current:current}`



