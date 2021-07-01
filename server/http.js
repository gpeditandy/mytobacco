/* jshint esversion:6 */

import config from '../config/index'
import global from './global'

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}

export function del(url, data, header) {
  return request(url, "DELETE", data, header);
}

var timeout
var promiseQueue = global.promiseQueue

/**
 * 发起Http请求
 * @param {String} url 请求地址
 * @param {String} method 请求方式
 * @param {Object} data 请求参数
 */
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    let _token = wx.getStorageSync('token')
    let _url = url + (url.indexOf('?') > -1 ? '&' : '?') + 'token=' + _token
    if (method === 'POST') {
      data = {
        ...data,
        token: _token
      }
    }
    wx.request({
      data,
      method,
      header: wx.getStorageSync('token'),
      url: config.host + _url,
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          resolve(res.data)
        } else if (res.data.code === 500) {
          handleErrorResponse(url, method, data, res, resolve, reject)
        } else if (res.data.code === 401) {
          login(() => {
            request(url, method, data)
          })
        } else {
          resolve(res.data)
        }
      },
      fail(error) {
        console.log('error',error)
        wx.hideLoading()
        showToast('提示', '服务器请求失败')
      }
    })
  })
}

/**
 * 接口返回错误处理
 */
function handleErrorResponse(url, method, data, res, resolve, reject) {

  //普通错误，返回具体界面且弹错误框
  reject(res.data)
  // showModal('', res.data, '我知道了')
  wx.showToast({
    icon: 'none',
    title: res.data.msg,
  })

}

/**
 * 用户游客态登录
 * @param {Function} callback 回调函数
 */
export function login(callback) {
  wx.login({
    success: res => {
      let data = {
        code: res.code
      }
      wx.request({
        url: config.host + 'admin/api/wx/auth/login',
        method: 'post',
        data,
        success: (res) => {
          wx.setStorageSync('userToken', res.data.data)
          var header = wx.getStorageSync('header')
          header.token = res.data.data
          wx.setStorageSync('header', header)
          callback && callback(res.data.data)
        }
      })
    }
  })
}

// 显示模态框
export function showToast(title, content) {
  wx.showModal({
    title,
    content: content,
    showCancel: false,
    confirmColor: '#F15999',
    success: function (res) {
      promiseQueue.showModal = false
      if (res.confirm) {

      }
    }
  })
}