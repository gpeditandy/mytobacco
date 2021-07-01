Component({
  // 页面的初始数据
  data: {
    tabIndex:0,
    list: [{
      name: '第一烤'
    }, {
      name: '第二烤'
    }]
  },
  methods: {
    handleChangeNav(e) {
      console.log(e)
      var that = this;
      if (this.data.tabIndex === e.currentTarget.dataset.current) return;
      that.setData({
        tabIndex: e.currentTarget.dataset.current,
      })
    },
    myDetailFunc() {
      wx.navigateTo({
        url: '/pages/my/record/record',
      })
    },

    // async onShow() {
    //   userInfo({}).then(resp => {
    //     console.log('获取信息', resp)
    //     this.setData({
    //       userInfo: resp.data
    //     })
    //   })
    // }
  },
})
