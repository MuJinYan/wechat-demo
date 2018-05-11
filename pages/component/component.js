//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    toView:'item-3',
    autoplay:true,
    sliderList:[{
      className:'bg-red',name:'slider1',selected:true
    },{
      className:'bg-blue',name:'slider2',selected:false
    },{
      className:'bg-green',name:'slider3',selected:false
    }]
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
  },

  play:function (){
    this.setData({
      autoplay:!this.data.autoplay
    })
  },
  change:function (e) {
    // console.log(e)  // current.detail
    // console.log('执行了滚动')
  },

  switchTab:function (e) {
    var sliderList = this.data.sliderList;
  }
})
