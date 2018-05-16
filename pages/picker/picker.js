//index.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0, //单列选择器索引
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],//多列选择器索引
    date: '2016-09-01', //默认日期
    time: '12:01', //默认时间
    region: ['广东省', '广州市', '海珠区'], //默认地区
    customItem: '全部',  //地区类的每列的第一个项目

    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [9999, 1, 1]
  },
  // 点击确定时触发
  bindPickerChange: function(e) {
    console.log('单列picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 点击取消或遮盖层触发
  bindPickerCancel:function (e) {
    console.log('单列picker点击取消或点击遮盖层')
  },
  // 点击确定时触发
  bindMultiPickerChange: function (e) {
    console.log('多列picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  // 某一列改变的时候触发
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    // 进行多列相关数据的复制，进行重新组合修改
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 修改多列选择器索引数组的值
    data.multiIndex[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      // 改变第一列的时候
      case 0:
        switch (data.multiIndex[0]) {
          // 第一列是第一项时
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          //  第一列是第二项时
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        // 改变第一列时，将第二列和第三列至于第一项
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      // 改变第二列的时候
      case 1:
        switch (data.multiIndex[0]) {
          // 第一列是第一项时
          case 0:
            switch (data.multiIndex[1]) {
              //  第二列是第1项时
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              //  第二列是第2项时
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              //  第二列是第3项时
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              //  第二列是第4项时
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              //  第二列是第5项时
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          //  第一列是第二项时
          case 1:
            switch (data.multiIndex[1]) {
              //  第二列是第1项时
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              //  第二列是第2项时
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              //  第二列是第3项时
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        // 改变第二列时，将第三列至于第一项
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },

  bindDateChange: function(e) {
    console.log('时间picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('地区picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  // 自定义滚动选择器,滚动选中之后就触发
  bindChange: function(e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  }
})
