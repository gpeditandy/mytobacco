import config from '../../config/index'
import { showModal,showToast } from '../../server/http'
import {
  wxLogin,getUserInfo
} from '../../server/api'
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isMobileCheck:'',
    myType:'null'
  },
  onLoad: function () {

  },
  bindGetUserInfo(e) {
    let that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      //用户按了允许授权按钮
      wx.login({
        success: res => {
          if(res.code) {
            wx.getUserInfo({
              success(infoRes) {
                console.log(infoRes)
                wx.request({
                  // url: 'http://10.21.224.2:8081/tsb/api/wx/auth/login',
                  url:config.loginUrl,
                  method:"POST",
                  data: {
                    code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                    rawData:infoRes.rawData,
                    signature:infoRes.signature,
                    encrypteData:infoRes.encrypteData,
                    iv:infoRes.iv,
                    headurl: wx.getStorageSync("userinfo").avatarUrl,
                    nickname: wx.getStorageSync("userinfo").nickName
                  },
                  header: {
                    'content-type': 'application/json'
                  },              
                  success: function (res) {
                    console.info(res);
                    wx.hideLoading()
                    let token = res.data.data.token
                    wx.setStorageSync('token', token)
                    if (res.data.code == 0) {
                      getUserInfo().then(res => {
                        console.log('res',res)
                        that.setData({
                          isMobileCheck:res.data.mobile,
                          myType:res.data.type
                        })
                        let mobile = that.data.isMobileCheck
                        if(!mobile) {
                          wx.navigateTo({
                            url: '/pages/getmobile/getmobile',
                          })
                        } else {
                          let tempType = wx.getStorageSync('userType')
                          if(tempType) {
                            wx.reLaunch({
                              url: '/pages/index/index?type=' + tempType,
                            })
                          } else {
                            wx.reLaunch({
                              url: '/pages/index/index?type=' + that.data.myType,
                            })
                          }
                        }
                      }).catch(err => {
                        console.log('err',err)
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: res.data.msg,
                      })
                    }
                  },
                  fail: function (err) {
                    wx.hideLoading()
                    console.log('err',err)
                  }
                })  
              
              }
            })
           
          } else {
            console.log("888")
          }
          
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告通知',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                  wx.showLoading({
                    title: '处理中',
                    mask: true
                  })

                  wx.login({
                    success: res => {
                      wx.request({
                        url: api.Login,
                        data: {
                          code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                          headurl: wx.getStorageSync("userinfo").avatarUrl,//这些是用户的基本信息
                          nickname: wx.getStorageSync("userinfo").nickName,//获取昵称
                        },
                        success: function (res) {
                          console.log(res.data.data)
                          wx.hideLoading()
                          wx.setStorageSync("openid", res.data.data)//可以把openid保存起来,以便后期需求的使用
                          wx.reLaunch({
                            url: '/pages/clientlist/clientlist',
                          });
                          wx.redirectTo({
                          url: '/pages/index/index'
                          });
                        },
                        fail: function (err) {
                          wx.hideLoading()
                          console.log(err)
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        }
      });
    }
  }
})