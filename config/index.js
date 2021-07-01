// 配置项
const currentHost = 'dev'
var host = ''
var onlinePicture = ''

//环境参数
const hostArray = [{
    type: 'dev',
    host: 'http://10.21.224.2:8081/',
    imgUrl: ''
  },
  {
    type: 'test',
    host: '',
    imgUrl: ''
  }
]

hostArray.forEach(item => {
  if (item.type === currentHost) {
    host = item.host
    onlinePicture = item.imgUrl
  }
})

const config = {
  host,
  loginUrl: `${host}tsb/api/wx/auth/login`,
  uesrinfoUrl:`${host}/tsb/api/home/userinfo`,
  version: '1.0.0',
  audit: 'AD1.5.1',
  onlinePicture: onlinePicture + 'wx-static-resouces/',
  onlineImgUrl: onlinePicture
}

export default config