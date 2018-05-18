Page({
  data: {

  },
  // 跳转到各组件对应路由
  goFormPage: function () {
    wx.navigateTo({url:'/pages/form/form'})
  },
  goPickerPage: function () {
    wx.navigateTo({url:'/pages/picker/picker'})
  },
  goIconsPage: function () {
    wx.navigateTo({url:'/pages/icons/icons'})
  },
  goSliderPage: function () {
    wx.navigateTo({url:'/pages/slider/slider'})
  },
  goButtonPage: function () {
    wx.navigateTo({url:'/pages/button/button'})
  },
  goInputPage: function () {
    wx.navigateTo({url:'/pages/input/input'})
  },
  goTextareaPage: function () {
    wx.navigateTo({url:'/pages/textarea/textarea'})
  },
  goScrollViewPage: function () {
    wx.navigateTo({url:'/pages/scrollView/scrollView'})
  },
  goNavigatorPage: function () {
    wx.navigateTo({url:'/pages/navigator/navigator'})
  },
  goImagePage: function () {
    wx.navigateTo({url:'/pages/image/image'})
  },
  goAudioPage: function () {
    wx.navigateTo({url:'/pages/audio/audio'})
  },
  goVideoPage: function () {
    wx.navigateTo({url:'/pages/video/video'})
  },
  goCameraPage: function () {
    wx.navigateTo({url:'/pages/camera/camera'})
  }
})
