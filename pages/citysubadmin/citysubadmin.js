import { getLowerLevelDetail } from '../../server/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminName:'',
    roomList:[],
    showEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let areaId = options.id
    let comName = options.comName
    getLowerLevelDetail(areaId).then(res => {
      console.log('市res',res)
      if(res.data.list.length <= 0) {
        this.setData({
          showEmpty:true
        })
      }
      this.setData({
        roomList:res.data.list
      })
    }).catch(err => {
      console.log('err',err)
    })
    this.setData({
      adminName:options.name
    })
    wx.setNavigationBarTitle({
      title: comName,
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