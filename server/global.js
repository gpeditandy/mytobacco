export default {
  selectValue: 0,
  exeQueue: true, // 判断是否需要循环promiseQueue队列执行队列中的异步请求
  promiseQueue: {}, // 来保存需要重新获取数据的异步请求参数
  showModal: false, //控制重复显示弹框
  reload: false, //是否需要重新加载界面
  resp_error_code_array: ['HAS_CONSUME_RECORD', 'COUPON_RECEIVED_V120', 'SHARE_INVALID_ERROR_V120']
}