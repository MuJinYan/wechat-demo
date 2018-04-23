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
> * `navigationStyle` ：导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮 微信版本 6.6.0
                  navigationStyle 只在 app.json 中生效。开启 custom 后，低版本客户端需要做好兼容。开发者工具基础库版本切到 1.7.0（不代表最低版本，只供调试用） 可方便切到旧视觉
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




#### 小程序生命周期函数执行时机
> * 当启动一个程序时，首先会触发onLaunch和onShow方法，然后通过app.json的pages属性注册相应的页面，最后根据默认路径加载首页
> * 当用户点击左上角的关闭或者home键离开微信时，小程序并没有销毁，而是进入了后台，触发了onHide方法
> * 当再次唤醒微信或者在微信中打开小程序的时候，是从后台进入前台，触发onShow方法
> * 只有当小程序进入后台一定时间，或者系统资源占用锅盖，才会真正被销毁


