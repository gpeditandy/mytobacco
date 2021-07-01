import {
  post,
  get,
  del,
} from './http'

/**
 * 获取首页信息
 * @param {*} params
 */
export function pageindex(params) {
  return get('tsb/api/home/index', params)
}

/**
 * 小程序登录授权
 */
export function wxLogin(params) {
  return post('tsb/api/wx/auth/login',params)
}

/**
 * 发送短信验证码
 */
export function sendSmsCode(data) {
  return post('tsb/api/home/sendcode',data)
}

/**
 * 绑定手机号码
 */
export function bindMobile(data) {
  return post('tsb/api/home/mobile/bind',data)
}

/**
 * 用户身份获取
 */
export function getUserInfo(params) {
  return get('tsb/api/home/userinfo',params)
}

/**
 * 查看下级详情
 */
export function getLowerLevelDetail(areaId) {
  return get(`tsb/api/${areaId}/detail`,areaId)
}