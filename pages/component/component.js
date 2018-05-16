//index.js
//获取应用实例
const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
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
    }],
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    focus: false,
    inputValue: '',
    height: 20
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
    this.setData({
      sliderList:this.data.sliderList.map(function (value,index) {
        value.selected = e.detail.current == index
        return value
      })
    })
  },

  //按钮设置input获取焦点
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function(e) {
    var value = e.detail.value
    var pos = e.detail.cursor //光标的位置
    if(pos != -1){
      //光标在中间
      var left = e.detail.value.slice(0,pos)
      //计算光标的位置
      pos = left.replace(/11/g,'2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g,'2'),
      cursor: pos
    }

    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },

  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  }
})
