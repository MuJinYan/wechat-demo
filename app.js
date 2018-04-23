//app.js
//App()函数注册小程序生命周期函数、全局方法和全局属性，已注册的小程序实例可以在其他逻辑层通过getApp()获取
//接受的参数为一个对象，在其中注册自定义方法和属性供全局使用
//只能在app.js中注册且只能注册一次
App({
  // 生命周期函数，监听小程序初始化，当小程序初始化完成时触发，全局只触发一次
  onLaunch: function () {
    //小程序并不是运行在浏览器中的，所以并没有window和document的概念
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success:(res) => {
        console.log(res)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow:function () {
    console.log('显示小程序时执行')
  },
  onHide:function () {
    console.log('隐藏小程序时执行')
  },
  globalData: {
    userInfo: null
  }
})
