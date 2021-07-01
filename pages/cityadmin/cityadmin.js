import { getLowerLevelDetail } from '../../server/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIndex:0,
    companyList:[],
    managerName:'',
    cityName:'',
    showEmpty:false
  },
  handleSubComAdmin(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/subcomadmin/subadmin?index=' + index +'&item=' + item + '&city=' + this.data.cityName,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload',options)
    let areaId = options.id
    let name = options.name
    let managerName = options.managerName
    getLowerLevelDetail(areaId).then(res => {
      console.log('res结果',res)
      if(res.data.list.length<=0) {
        this.setData({
          showEmpty:true
        })
      }
      this.setData({
        companyList:res.data.list,
        managerName:managerName,
        cityName:name
      })
      wx.setNavigationBarTitle({
        title: name +'市详情',
      })
    }).catch(err => {
      console.log('err',err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})