Page({
  data: {

  },

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
  }
})
