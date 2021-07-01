import config from '../../config/index'
import { showModal,showToast } from '../../server/http'
import { checkisPhone } from '../../utils/index'
import { sendSmsCode,bindMobile } from '../../server/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    code:'',
    getTxt:'获取验证码',
    second: 60, //倒计时间
    codeText: '',
    gray:false
  },
  handleGetCode() {
    let that = this
    if(!this.data.mobile) {
      return showToast('','请输入手机号')
    } 
    if(!checkisPhone(this.data.mobile)) {
      return showToast('','手机号格式不正确')
    }
    if (this.data.gray) return
    console.log(this.data.mobile)
    // wx.request({
    //   url: 'http://10.21.224.2:8081/tsb/api/home/sendcode',
    //   method:"POST",
    //   data: {
    //     mobile:this.data.mobile,
    //   },
    //   header: {
    //     'content-type': 'application/json',
    //     'token': wx.getStorageSync('token')
    //   },              
    //   success: function (res) {
    //     console.log("哈哈",res);
    //   },
    //   fail: function (err) {
    //     console.log('err',err)
    //   }
    // })  
    sendSmsCode({mobile:this.data.mobile}).then(res => {
      console.log('验证码',res)
      if(res.code!=0) {
        showToast('',res.msg)
        this.setData({
          isSend:false
        })
      } else {
        this.countDown()
      }
    }).catch(err => {
      console.log('err',err)
    })
  },
  countDown() {
    var that = this
    let currentTime = this.data.second
    const timer = setInterval(() => {
      currentTime--;
      that.setData({
        getTxt:currentTime + '(S)后重新获取',
        gray:true
      })
      if(currentTime <= 0) {
        clearInterval(timer)
        that.setData({
          getTxt:'获取验证码',
          second:60,
          gray:false
        })
      }
    },1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '验证手机号',
    })
  },
  mobileInput(e) {
    this.setData({
      mobile:e.detail.value
    });
  },
  codeInput(e) {
    this.setData({
      code:e.detail.value
    })
  },
  handleSubmit() {
    if(!this.data.mobile) {
     return showToast('','请输入手机号')
    }
    if(!this.data.code) {
     return showToast('','请输入验证码')
    }
    bindMobile({mobile:this.data.mobile,code:this.data.code}).then(res => {
      console.log("绑定手机：",res)
      if(res.code != 0) {
       return showToast('',res.msg)
      } else {
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
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