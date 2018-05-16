
Page({
  data: {
    toView:'item-3'
  },

  scrollToUpper:function () {
    // console.log('触发到滚动到顶部事件');
  },
  scrollToLower:function () {
    // console.log('触发到滚动到底部事件');
  },

  scroll:function () {
    // console.log('触发了滚动事件')
  },

  scrollToTop:function(){
    this.setData({
      scrollTop: '0'
    })
  }
})
