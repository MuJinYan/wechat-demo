Page({
  data: {
    autoplay:true,
    sliderList:[{
      className:'bg-red',name:'slider1',selected:true
    },{
      className:'bg-blue',name:'slider2',selected:false
    },{
      className:'bg-green',name:'slider3',selected:false
    }]
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
    this.setData({
      sliderList:this.data.sliderList.map(function (value,index) {
        value.selected = e.detail.current == index
        return value
      })
    })
  }
})
