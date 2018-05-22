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
> * 共同属性：`id` `class` `style` `hidden` `data-*`(自定义属性，组件上触发事件时，会发送给事件处理函数，事件处理函数可以通过`dataset`获取) `bind*/catch*`

#### view组件
> * `hover` 是否启动点击态 默认值为false
> * `hover-class` 指定按下去的样式，当`hover-class="none"`时，没有点击效果，默认值为none
> * `hover-stop-propagation`  指定是否阻止本节点的祖先节点出现点击态	1.5.0+支持 默认值false
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
> * `scroll-with-animation` 在设置滚动条位置时使用动画过渡
> * `enable-back-to-top` iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向  默认值false
> * `bindscrolltoupper` 滚动到顶部/左边 触发`scrolltoupper`事件
> * `bindscrolltolower` 滚动到底部/右边 触发`scrolltolower`事件
> * `bindscroll` 滚动时触发 `event.detail = {scrollLeft,scrollTop,scrollHeight,scrollWidth,deltaX,deltaY}`
> * `<textarea />` `<video/>` `<map/>` `<convas>` 不能再`<scroll-view/>`中使用
> * 使用纵向滚动时，需要给`<scroll-view/>`一个固定高度
> * `scroll-into-view` 的优先级高于 `scroll-top`
> * 在滚动 `scroll-view` 时会阻止页面回弹，所以在 `scroll-view` 中滚动，是无法触发 `onPullDownRefresh`,若要使用下拉刷新，请使用页面的滚动，而不是`scroll-view`

#### 滑动视图组件(<swiper/>和<swiper-item/>组成)
> * `<swiper-item/>` 内部能放置任何组件，默认宽高自动设置为100%
> * `<swiper/>`属性
>   * `indicator-dots` 是否显示面板指示点，默认为false
>   * `indicator-color` 指示点的颜色，1.1.0+支持
>   * `indicator-active-color` 当前选中的指示点颜色，1.1.0+支持
>   * `autoplay` 是否自动切换，默认为false
>   * `current` 当前所在页面的index,默认为0
>   * `current-item-id` 当前所在滑块的`item-id`,不能与`current`被同时指定  1.9.0+支持，值类型string
>   * `interval` 自动切换时间间隔，默认为5000
>   * `duration` 滑动动画时长，默认为500
>   * `circular` 是否采用衔接滑动，默认为false
>   * `vertical` 滑动方向是否为纵向
>   * `previous-margin` 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值 1.9.0+ string("0px")
>   * `next-margin` 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 1.9.0+ string("0px")
>   * `display-multiple-items` 同时显示的滑块数量 1.9.0+
>   * `skip-hidden-item-layout` 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 1.9.0+
>   * `bindchange` current改变时会触发change事件，`event.detail={current: current, source: source}`
>   * `bindanimationfinish`  	动画结束时会触发 animationfinish 事件，event.detail 同上  1.9.0+
>   * 从1.4.0开始，`change`事件返回`detail`包含一个`source`字段，表示导致变更的原因 （autoplay 自动播放导致swiper变化；
touch 用户划动引起swiper变化；
其他原因将用空字符串表示。）
>   * `swiper-item` 属性`item-id` 该 swiper-item 的标识符 1.9.0+  string
> * 如果在 bindchange 的事件回调函数中使用 setData 改变 current 值，则有可能导致 setData 被不停地调用，因而通常情况下请在改变 current 值前检测 source 字段来判断是否是由于用户触摸引起

#### 基础组件
##### icon
> * `type` icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear
> * `size` icon的大小，单位px `size="40"`并不用写px
> * `color` icon的颜色，同css的color
> * 自定义`<icon/>`组件 使用雪碧图的方式进行实现，也就是`background-image`和`background-position`进行组合实现

##### text
> * 用于文本内容的展示。只有`<text/>`节点内部的内容能被长按选中
> * 行内元素，文本中的内容支持转义字符
> * 只支持`<text/>`嵌套
> * 属性
>   * `selectable` 文本是否可选，默认false ,1.1.0+
>   * `space` 显示连续空格 1.4.0+  `ensp`	中文字符空格一半大小
`emsp`	中文字符空格大小
`nbsp`	根据字体设置的空格大小
>   * `decode`  是否解码，默认false 1.4.0+
>   * `decode`可以解析的有 `&nbsp;` `&lt;` `&gt;` `&amp;` `&apos;``&ensp;` `&emsp;`

##### progress
> * 显示进度状态
> * 块级元素
> * 属性
>   * `percent` 当前进度占所有进度的百分比，取值0-100
>   * `show-info` 是否在进度条右侧显示百分比，默认false
>   * `stroke-width` 进度条线的宽度，单位px，默认值6
>   * `color` 进度条颜色，默认值#09BB07
>   * `active` 渲染时时候开启进度条从左到右的动画，默认false。开启后每次修改`percent`触发进度条重新渲染，都会从左到右显示动画
>   * `activeColor` 已选择的进度条的颜色
>   * `backgroundColor` 未选择的进度条的颜色
>   * `active-mode` backwards: 动画从头播；forwards：动画从上次结束点接着播 1.7.0+

##### radio-group和radio
> * `<radio/>`的选中态不能直接获取，需要通过`<radio-group/>`的`change`事件捕获
> * `<radio-group/>` 可以包含其他标签，会仅对`<radio/>`产生影响
> * `bindchange` 绑定`<radio-group/>`的`change`事件，当选中项发生变化时触发，`event.detail={value:选中项radio的value}`
> * `<radio/>`的属性
>   * `value` `<radio/>`的标识，当选中时，`change`事件会携带`<radio/>`的`value`
>   * `checked` 当前`<radio/>`是否选中，在一个`<radio-group/>`内只能有一个`<radio/>`的`checked`是true。设置多个，默认选中最后一个为true的单选项。默认为false
>   * `disabled` 是否禁用 禁用后不能点击 默认false
>   * `color` 颜色

##### checkbox-group和checkbox
> * `bindchange`	`<checkbox-group/>`中选中项发生改变是触发 `change` 事件，`event.detail = {value:[选中的checkbox的value的数组]}`
> * `<checkbox/>`的属性
>   * `value` `<checkbox/>`的标识，当选中时，`change`事件会携带`<checkbox/>`的`value`
>   * `checked` 当前`<checkbox/>`是否选中,可用来设置默认选中,允许多个`<checkbox/>`的`checked`为true
>   * `disabled` 是否禁用 禁用后不能点击 默认false
>   * `color` 颜色

##### switch
> * `checked` 是否选中，默认为false
> * `type` 样式，有效值：switch, checkbox
> * `bindchange`	 `checked` 改变时触发 `change` 事件，`event.detail={ value:checked}`

##### label
> * 用来改进表单组件的可用性，使用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件。
> * for优先级高于内部控件，内部有多个控件的时候默认触发第一个控件。
> * 目前可以绑定的控件有：`<button/>`,`<checkbox/>`, `<radio/>`, `<switch/>`

##### slider
> * 小程序只提供了水平形式的滑动选择器
> * `min` 最小值	默认值0
> * `max	` 最大值  默认值100
> * `step` 步长，取值必须大于 0，并且可被(max - min)整除 默认值1
> * `disabled` 是否禁用
> * `value` 当前取值
> * `color` 背景条的颜色（请使用 backgroundColor）
> * `selected-color` 已选择的颜色（请使用 activeColor）
> * `activeColor` 已选择的颜色
> * `backgroundColor` 背景条的颜色
> * `block-size` 滑块的大小，取值范围为 12 - 28  1.9.0+
> * `block-color` 滑块的颜色  1.9.0+
> * `show-value` 是否显示当前 value
> * `bindchange` 完成一次拖动后触发的事件，`event.detail = {value: value}`
> * `bindchanging` 拖动过程中触发的事件，`event.detail = {value: value}` 1.7.0+

##### picker
> * 从底部弹起的滚动选择器，现支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。

> ###### 普通选择器：mode = selector
>  * `range` `mode`为 `selector` 或 `multiSelector`时，`range` 有效
> * `range-key` 当 `range` 是一个 `Object Array` 时，通过 `range-key`来指定 `Object` 中 `key` 的值作为选择器显示内容
> * `value`	 `value` 的值表示选择了 `range` 中的第几个（下标从 0 开始）	可以用来设置默认值
> * `bindchange`	`value` 改变时触发 `change` 事件，`event.detail = {value: value}`
> * `disabled`	 是否禁用	默认值false
> * `bindcancel`	取消选择或点遮罩层收起 picker 时触发	1.9.90+

> ###### 多列选择器：mode = multiSelector（最低版本：1.4.0）
> * `range`	 []	mode为 selector 或 multiSelector 时，range 有效。二维数组，长度表示多少列，数组的每项表示每列的数据，如[["a","b"], ["c","d"]]
> * `range-key	` 当 range 是一个 二维Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容	string  e.g.`range="{{objectArray}}" range-key="name"`
> * `value`	 value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始）
> * `bindchange` value 改变时触发 change 事件，`event.detail = {value: value}`,value是一个数组，长度是二维数组的长度，每一项表示每一列选中的项目的索引，当点击确定时触发
> * `bindcolumnchange` 某一列的值改变时触发 `columnchange` 事件，`event.detail = {column: column, value: value}`，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标 (下标从0开始)
> * `bindcancel`	 取消选择时触发	1.9.90+
> * `disabled`	false	是否禁用

> ###### 时间选择器：mode = time
> * `value` 表示选中的时间，格式为"hh:mm"
> * `start`	表示有效时间范围的开始，字符串格式为"hh:mm"
> * `end`	表示有效时间范围的结束，字符串格式为"hh:mm"
> * `bindchange`	 value 改变时触发 change 事件，`event.detail = {value: value}`
> * `bindcancel`	 取消选择时触发 1.9.90+
> * `disabled` false	是否禁用

> ###### 日期选择器：mode = date
> * `value`	 表示选中的日期，格式为"YYYY-MM-DD
> * `start`	 表示有效日期范围的开始，字符串格式为"YYYY-MM-D
> * `end`	 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
> * `fields	` 有效值 year,month,day，表示选择器的粒度  默认值day
> * `bindchange`	改变时触发 change 事件，`event.detail = {value: value}`
> * `bindcancel`	取消选择时触发  1.9.90+
> * `disabled`	  false	是否禁用

> ###### 省市区选择器：mode = region（最低版本：1.4.0）
> * `value`	 表示选中的省市区，默认选中每一列的第一个值
> * `custom-item`	 可为每一列的顶部添加一个自定义的项 1.5.0+
> * `bindchange`	 改变时触发 change 事件，`event.detail = {value: value}`
> * `bindcancel`	 取消选择时触发  1.9.90+
> * `disabled`  false	是否禁用

##### picker-view
> * 嵌入页面的滚动选择器，自定义滚动选择器
> * 由`<picker-view/>`和`<picker-view-column/>`构成
> * `<picker-view/>`中仅可放置`<picker-view-column/>`，其他节点不会显示。`<picker-view-column/>`创造列,其孩子节点的高度会自动设置成与picker-view的选中框的高度一致
> * 滚动时在iOS自带振动反馈，可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭
> * `value`	 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。
> * `indicator-style`	设置选择器中间选中框的样式
> * `indicator-class`	 设置选择器中间选中框的类名	1.1.0
> * `mask-style`	 设置蒙层的样式  1.5.0+
> * `mask-class`	 设置蒙层的类名 1.5.0+
> * `bindchange`	 当滚动选择，value 改变时触发 change 事件，`event.detail = {value: value}`；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）

##### input
> * `value` 输入框的初始内容
> * `type`	 input 的类型
>   * `text`	   文本输入键盘
    * `number` 	数字输入键盘
    * `idcard` 	身份证输入键盘
    * `digit`	   带小数点的数字键盘
> * `password`	 false	是否是密码类型，密码类型没有拼音，是字母和数字还有字符组成
> * `placeholder` 输入框为空时占位符
> * `placeholder-style` 指定 placeholder 的样式
> * `placeholder-class` 指定 placeholder 的样式类,默认值`"input-placeholder"`
> * `disabled`	 false	是否禁用
> * `maxlength`	最大输入长度，设置为 -1 的时候不限制最大长度,默认值140
> * `cursor-spacing` 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
> * `auto-focus`	 (即将废弃，请直接使用 focus )自动聚焦，拉起键盘
> * `focus`	 false	获取焦点
> * `confirm-type`	设置键盘右下角按钮的文字 1.1.0+ 默认值'done'
>   * `send	`  右下角按钮为“发送”
    * `search`	右下角按钮为“搜索”
    * `next`	右下角按钮为“下一个”
    * `go`	   右下角按钮为“前往”
    * `done`	右下角按钮为“完成”
> * `confirm-hold`	false	点击键盘右下角按钮时是否保持键盘不收起	1.1.0+
> * `cursor`	指定focus时的光标位置  1.5.0+
> * `selection-start`	光标起始位置，自动聚集时有效，需与selection-end搭配使用	1.9.0+
> * `selection-end`	光标结束位置，自动聚集时有效，需与selection-start搭配使用	1.9.0+
> * `adjust-position`	true	键盘弹起时，是否自动上推页面	1.9.90+
> * `bindinput`	当键盘输入时，触发input事件，`event.detail = {value, cursor}`，处理函数可以直接 return 一个字符串，将替换输入框的内容。
> * `bindfocus`	输入框聚焦时触发，`event.detail = { value, height }`，height 为键盘高度，在基础库 1.9.90 起支持
> * `bindblur`	 输入框失去焦点时触发，`event.detail = {value: value}`
> * `bindconfirm`	 点击完成按钮时触发，`event.detail = {value: value}`
> * 微信版本 6.3.30, focus 属性设置无效；
> * 微信版本 6.3.30, placeholder 在聚焦时出现重影问题；
> * input 组件是一个 native 组件，字体是系统字体，**所以无法设置 font-family；**
> * 在 input 聚焦期间，避免使用 css 动画；

##### textarea
> * 自闭和标签，值需要赋值给value属性，而不是被标签包裹
> * `value`	 输入框的内容
> * `placeholder`	 输入框为空时占位符
> * `placeholder-style` 指定 placeholder 的样式
> * `placeholder-class` 指定 placeholder 的样式类,默认值textarea-placeholder
> * `disabled`	 false	是否禁用
> * `maxlength`	 最大输入长度，设置为 -1 的时候不限制最大长度	,默认值140
> * `auto-focus` false	自动聚焦，拉起键盘。
> * `focus`	 false	获取焦点
> * `auto-height`	 false	是否自动增高，**设置auto-height时，style.height不生效**
> * `fixed` false	 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
> * `cursor-spacing`	 指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
> * `cursor`	指定focus时的光标位置  1.5.0+
> * `show-confirm-bar`	true	是否显示键盘上方带有”完成“按钮那一栏	1.6.0+
> * `selection-start` 	-1	光标起始位置，自动聚集时有效，需与selection-end搭配使用	1.9.0+
> * `selection-end`	 -1	光标结束位置，自动聚集时有效，需与selection-start搭配使	1.9.0+
> * `adjust-position`	true	键盘弹起时，是否自动上推页面	1.9.90
> * `bindfocus`	输入框聚焦时触发，`event.detail = { value, height }`，height 为键盘高度，在基础库 1.9.90 起支持
> * `bindblur`	 输入框失去焦点时触发，`event.detail = {value, cursor}`
> * `bindlinechange`	输入框行数变化时调用，`event.detail = {height: 0, heightRpx: 0, lineCount: 0}	`
> * `bindinput	`	当键盘输入时，触发 input 事件，`event.detail = {value, cursor}`， **bindinput 处理函数的返回值并不会反映到 textarea 上**
> * `bindconfirm`	 点击完成时， 触发 confirm 事件，`event.detail = {value: value}`

##### button
> * 当`<button/>`被`<form/>`包裹时，可以通过设置`form-type`属性触发表单对应的事件
> * `size`	按钮的大小 default	mini
> * `type`	按钮的样式类型	primary default warn
> * `plain`	 false  按钮是否镂空，背景色透明
> * `disabled`	 false	是否禁用
> * `loading`	 false	名称前是否带 loading 图标
> * `form-type	`  用于 <form/> 组件，点击分别会触发 <form/> 组件的 submit/reset 事件	`submit` 提交表单 `reset` 重置表单
> * `open-type	`  微信开放能力	 1.1.0
>   * `contact`	打开客服会话	1.1.0
>   * `share`	触发用户转发 1.2.0
>   * `getUserInfo`	获取用户信息，可以从bindgetuserinfo回调中获取到用户信息	1.3.0
>   * `getPhoneNumber`	获取用户手机号，可以从bindgetphonenumber回调中获取到用户信息，具体说明	1.2.0
>   * `launchApp` 	打开APP，可以通过app-parameter属性设定向APP传的参数具体说明	1.9.5
> * `hover-class`  指定按钮按下去的样式类。当 `hover-class="none"` 时，没有点击态效果，默认值 button-hover
> * `hover-stop-propagation`	 false 指定是否阻止本节点的祖先节点出现点击态		1.5.0
> * `hover-start-time`	 按住后多久出现点击态，单位毫秒
> * `hover-stay-time`	手指松开后点击态保留时间，单位毫秒
> * `lang`	 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。	生效机制：`open-type="getUserInfo"`	1.3.0
> * `bindgetuserinfo`	用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致	生效机制：`open-type="getUserInfo"` 1.3.0
> * `session-from	` 会话来源	 生效机制：`open-type="contact""`	1.4.0
> * `send-message-title`	当前标题	会话内消息卡片标题	生效机制：`open-type="contact"`	1.5.0
> * `send-message-path`	当前分享路径	会话内消息卡片点击跳转小程序路径	生效机制：`open-type="contact"`	1.5.0
> * `send-message-img`	 会话内消息卡片图片	生效机制：`open-type="contact"`	1.5.0
> * `show-message-card` false	显示会话内消息卡片	生效机制：`open-type="contact"`	1.5.0
> * `bindcontact` 客服消息回调	生效机制：`open-type="contact"`	1.5.0
> * `bindgetphonenumber`	获取用户手机号回调	生效机制：`open-type="getphonenumber"`	1.2.0
> * `app-parameter`	打开 APP 时，向 APP 传递的参数	生效机制：`open-type="launchApp"`	1.9.5
> * `binderror	`  当使用开放能力时，发生错误的回调	生效机制：`open-type="launchApp"`	1.9.5
> * `button-hover` 默认为`{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}`
> * `bindgetphonenumber` 从1.2.0 开始支持，但是在1.5.3以下版本中无法使用wx.canIUse进行检测，建议使用基础库版本进行判断。
> * 在`bindgetphonenumber` 等返回加密信息的回调中调用 `wx.login `登录，可能会刷新登录态。此时服务器使用 code 换取的 sessionKey 不是加密时使用的 sessionKey，导致解密失败。建议开发者提前进行 login；或者在回调中先使用 checkSession 进行登录态检查，避免 login 刷新登录态。
> *  `<button><image src=""/></button>`可以这样写嵌套多媒体的自定义按钮

##### form
> * 表单，将组件内的用户输入的`<switch/>` `<input/>` `<checkbox/>` `<slider/>` `<radio/>` `<picker/>` 提交。
> * 当点击 `<form/>` 表单中 formType 为 submit 的 `<button/>` 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。
> * `report-submit`	 是否返回 formId 用于发送模板消息
> * `bindsubmit`	携带 form 中的数据触发 submit 事件，`event.detail = {value : {'name': 'value'} , formId: ''}	`
> * `bindreset`	表单重置时会触发 reset 事件

#### navigator 导航
> * 页面链接  类似于a标签 控制页面的跳转
> * `url`	应用内的跳转链接
> * `open-type`	跳转方式
>   * `navigate`	对应 wx.navigateTo 的功能
>   * `redirect`	对应 wx.redirectTo 的功能
>   * `switchTab`	对应 wx.switchTab 的功能
>   * `reLaunch`	对应 wx.reLaunch 的功能	1.1.0
>   * `navigateBack`	对应 wx.navigateBack 的功能	1.1.0
> * `delta`  当 open-type 为 'navigateBack' 时有效，表示回退的层数
> * `hover-class`	  默认值：navigator-hover	指定点击时的样式类，当hover-class="none"时，没有点击态效果
> * `hover-stop-propagation`	false	指定是否阻止本节点的祖先节点出现点击态	1.5.0
> * `hover-start-time`	按住后多久出现点击态，单位毫秒
> * `hover-stay-time`	手指松开后点击态保留时间，单位毫秒
> * `navigator-hover` 默认为 `{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}`, <navigator/> 的子节点背景色应为透明色

#### image
> * 默认宽度300px、高度225px
> * `src	`  图片资源地址
> * `mode`	默认值：'scaleToFill'	图片裁剪、缩放的模式
>   * `scaleToFill` 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
>   * `aspectFit`  保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
>   * `aspectFill` 	保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
>   * `widthFix`	宽度不变，高度自动变化，保持原图宽高比不变
>   * `top` 	不缩放图片，只显示图片的顶部区域
>   * `bottom`	 不缩放图片，只显示图片的底部区域
>   * `center`	 不缩放图片，只显示图片的中间区域
>   * `left	` 不缩放图片，只显示图片的左边区域
>   * `right`	 不缩放图片，只显示图片的右边区域
>   * `top left`	 不缩放图片，只显示图片的左上边区域
>   * `top right` 	不缩放图片，只显示图片的右上边区域
>   * `bottom left`	 不缩放图片，只显示图片的左下边区域
>   * `bottom right`	不缩放图片，只显示图片的右下边区域
> * `lazy-load` false	图片懒加载。只针对page与scroll-view下的image有效	1.5.0
> * `binderror`	当错误发生时，发布到 AppService 的事件名，事件对象`event.detail = {errMsg: 'something wrong'}`
> * `bindload`	  当图片载入完毕时，发布到 AppService 的事件名，事件对象`event.detail = {height:'图片高度px', width:'图片宽度px'}`

#### audio(不建议使用，从1.6.0不在维护)
> * 1.6.0 版本开始，该组件不再维护。**建议使用能力更强的 `wx.createInnerAudioContext` 接口**
> * `id`  audio 组件的唯一标识符
> * `src`	 要播放音频的资源地址
> * `loop`	 false	是否循环播放
> * `controls` false	是否显示默认控件
> * `poster`	默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效
> * `name`	默认控件上的音频名字，如果 controls 属性值为 false 则设置 name 无效
> * `author`	默认控件上的作者名字，如果 controls 属性值为 false 则设置 author 无效
>   * 1--获取资源被用户禁止，2--网络错误，3	--解码错误，4--不合适资源
> * `binderror`	当发生错误时触发 error 事件，`detail = {errMsg: MediaError.code}`
> * `bindplay`  当开始/继续播放时触发play事件
> * `bindpause`	当暂停播放时触发 pause 事件
> * `bindtimeupdate` 当播放进度改变时触发 timeupdate 事件，`detail = {currentTime, duration}`
> * `bindended	`	当播放到末尾时触发 ended 事件

#### video
> * `<video />` 默认宽度300px、高度225px，可通过wxss设置宽高。
> * `src`	要播放视频的资源地址
> * `initial-time`	指定视频初始播放位置 1.6.0
> * `duration`	 指定视频时长	1.1.0
> * `controls`	  true	是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
> * `danmu-list`	Object Array 弹幕列表
> * `danmu-btn`	false	是否显示弹幕按钮，只在初始化时有效，不能动态变更
> * `enable-danmu`	false	是否展示弹幕，只在初始化时有效，不能动态变更
> * `autoplay`	 false	是否自动播放
> * `loop`	false	是否循环播放	1.4.0
> * `muted`	 false	是否静音播放	1.4.0
> * `page-gesture	`  false	在非全屏模式下，是否开启亮度与音量调节手势	1.6.0
> * `direction`	设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）	1.7.0
> * `show-progress`	 true	若不设置，宽度大于240时才会显示	1.9.0
> * `show-fullscreen-btn`	true	是否显示全屏按钮	1.9.0
> * `show-play-btn`	true	是否显示视频底部控制栏的播放按钮	1.9.0
> * `show-center-play-btn`	true	是否显示视频中间的播放按钮	1.9.0
> * `enable-progress-gesture` true	是否开启控制进度的手势	1.9.0
> * `objectFit`	当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖
> * `poster`	视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效
> * `bindplay` 当开始/继续播放时触发play事件
> * `bindpause`	当暂停播放时触发 pause 事件
> * `bindended	`	当播放到末尾时触发 ended 事件
> * `bindtimeupdate` 播放进度变化时触发，`event.detail = {currentTime, duration}`。触发频率 250ms 一次
> * `bindfullscreenchange` 当视频进入和退出全屏是触发，`event.detail = {fullScreen, direction}`，direction取为 vertical 或 horizontal	 1.4.0
> * `bindwaiting` 	视频出现缓冲时触发 1.7.0
> * `binderror`	视频播放出错时触发 1.7.0
> * video 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。
> * 请勿在 `scroll-view`、`swiper`、`picker-view`、`movable-view` 中使用 video 组件。
> * css 动画对 video 组件无效。

#### camera(相关api：wx.createCameraContext)
> * 需要用户授权 scope.camera
> * `device-position` 	back	前置或后置，值为front, back
> * `flash`	auto	闪光灯，值为auto, on, off
> * `bindstop`	  摄像头在非正常终止时触发，如退出后台等情况
> * `binderror	`	用户不允许使用摄像头时
> * camera 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 cover-view cover-image覆盖在上面。
> * 同一页面只能插入一个 camera 组件。
> * 请勿在 `scroll-view`、`swiper`、`picker-view`、`movable-view` 中使用 camera 组件。

### map
> * 地图组件的经纬度必填, 如果不填经纬度则默认值是北京的经纬度。
> * `longitude`	中心经度
> * `latitude`	  中心纬度
> * `scale`	  缩放级别，取值范围为5-18 默认16
> * `markers`	 标记点
>   * `id`	marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能。
>   * `latitude`	浮点数，范围 -90 ~ 90
>   * `longitude`	 浮点数，范围 -180 ~ 180
>   * `title`	标注点名
>   * `iconPath`	显示的图标  项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径
>   * `rotate` 	旋转角度  顺时针旋转的角度，范围 0 ~ 360，默认为 0
>   * `alpha`	标注的透明度	默认1，无透明，范围 0 ~ 1
>   * `width`	标注图标宽度	默认为图片实际宽度
>   * `height`	标注图标高度	默认为图片实际高度
>   * `callout	` 自定义标记点上方的气泡窗口  可识别换行符。	1.2.0
>     `content` 	文本 	1.2.0
      `color`	文本颜色	1.2.0
      `fontSize`	文字大小 	1.2.0
      `borderRadius`	callout边框圆角 1.2.0
      `bgColor	` 背景色	1.2.0
      `padding`	文本边缘留白	1.2.0
      `display`	'BYCLICK':点击显示; 'ALWAYS':常显  1.2.0
      `textAlign` 	文本对齐方式。有效值: left, right, center 1.6.0
>   * `label`	为标记点旁边增加标签  可识别换行符。	1.2.0
>     `content	`  1.2.0
      `color`	文本颜色	1.2.0
      `fontSize`	文字大小	1.2.0
      `x`	label的坐标，原点是 marker 对应的经纬度 1.2.0
      `y`	label的坐标，原点是 marker 对应的经纬度 1.2.0
      `borderWidth`	边框宽度 	1.6.0
      `borderColor`	边框颜色	1.6.0
      `borderRadius`	边框圆	1.6.0
      `bgColor`	背景色	1.6.0
      `padding`	文本边缘留白	1.6.0
      `textAlign`	文本对齐方式。有效值: left, right, center 1.6.0
>   * `anchor`	经纬度在标注图标的锚点，默认底边中点	`{x, y}`，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点	1.2.0
> * `covers`	即将移除，请使用 markers
> * `polyline` 路线	 指定一系列坐标点，从数组第一项连线至最后一项
>   `points`	经纬度数组	Array	是	`[{latitude: 0, longitude: 0}]`
  `color`	线的颜色	8位十六进制表示，后两位表示alpha值，如：#000000AA
  `width`	线的宽度
  `dottedLine`	 是否虚线	默认false
  `arrowLine`	带箭头的线	 默认false，开发者工具暂不支持该属性	1.2.0
  `arrowIconPath` 	更换箭头图标 在arrowLine为true时生效	1.6.0
  `borderColor`	线的边框颜色	1.2.0
  `borderWidth	` 线的厚度	1.2.0
> * `circles`	 圆	  在地图上显示圆
>   `latitude`	纬度	浮点数，范围 -90 ~ 90
    `longitude` 	经度		浮点数，范围 -180 ~ 180
    `color`	描边的颜色		8位十六进制表示，后两位表示alpha值，如：#000000AA
    `fillColor`	填充颜色	8位十六进制表示，后两位表示alpha值，如：#000000AA
    `radius	` 半径
    `strokeWidth`	 描边的宽度
> * `controls`	  控件
>   * `id`	控件id	 在控件点击事件回调会返回此id
>   * `position`	控件在地图的位置 控件相对地图位置
>     `left`	距离地图的左边界多远 默认为0
      `top`	 距离地图的上边界多远 默认为0
      `width`	控件宽度 默认为图片宽度
      `height`	控件高度 默认为图片高度
>   * `iconPath`	显示的图标  	项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径
>   * `clickable` 	是否可点击	 默认不可点击
> * `include-points`	缩放视野以包含所有给定的坐标点
> * `show-location`	Boolean	显示带有方向的当前定位点
> * `bindmarkertap`	点击标记点时触发
> * `bindcallouttap`	点击标记点对应的气泡时触发	1.2.0
> * `bindcontroltap`	点击控件时触发
> * `bindregionchange`		视野发生变化时触发
> * `bindtap`	 点击地图时触发
> * `bindupdated`		在地图渲染更新完成时触发	1.6.0

### canvas
> * **canvas 标签默认宽度300px、高度225px**
> * **同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作**
> * `canvas-id`	canvas 组件的唯一标识符
> * `disable-scroll`	false	当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新
> * `bindtouchstart`	手指触摸动作开始
> * `bindtouchmove`	 手指触摸后移动
> * `bindtouchend`	手指触摸动作结束
> * `bindtouchcancel`	手指触摸动作被打断，如来电提醒，弹窗
> * `bindlongtap` 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动
> * `binderror`	当发生错误时触发 error 事件，`detail = {errMsg: 'something wrong'}`
> * canvas 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。
> * 请勿在 `scroll-view`、`swiper`、`picker-view`、`movable-view` 中使用 canvas 组件。
> * css 动画对 canvas 组件无效。
> * 避免设置过大的宽高，在安卓下会有crash的问题

