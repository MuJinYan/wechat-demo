//index.js
Page({
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  // 设置按钮不可用
  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  // 设置按钮镂空
  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  // 设置按钮加载
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  // 获取用户信息
  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)  //原始数据 string
  }
})
