Page({
  onLoad: function(options) {
    // 接受的参数为url所携带的参数
    console.log(options)
    this.setData({
      title: options.title
    })
  }
})
