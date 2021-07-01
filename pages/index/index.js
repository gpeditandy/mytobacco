import { showToast } from '../../server/http'
import { pageindex } from '../../server/api'
Component({
  /**
   * 页面的初始数据
   */
  data: {
    userDataList:{
      bakeroomList:[],
      usertype:null
    },
    title:''
  },
  methods:{
    scan() {
      wx.scanCode({
        success(res) {
            console.log('条码类型：' + res.scanType);
            console.log('条码内容：' + res.result);
            wx.showLoading({
              title: '正在加载...',
              mask: true
            })
            wx.hideLoading()
        }
      });
    },
    handleDeviceProperty() {
      wx.navigateTo({
        url: '/pages/status/status',
      })
    },
    handleCityDetail(e) {
      console.log(e)
      let tempManager = e.currentTarget.dataset.item.managerName
      let name = e.currentTarget.dataset.item.name
      let id = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: '/pages/citysubadmin/citysubadmin?name=' + tempManager +'&id=' + id +'&city=' + this.data.title +'&comName=' + name
      })
    },
    handleProvinceDetail(e) {
      let araeId = e.currentTarget.dataset.item.id
      let name = e.currentTarget.dataset.item.name
      let managerName = e.currentTarget.dataset.managerName
      console.log(araeId)
      wx.navigateTo({
        url: '/pages/cityadmin/cityadmin?id=' + araeId + '&name=' + name + '&managerName=' + managerName,
      })
    },
    handleRunn() {
      wx.navigateTo({
        url: '/pages/running/running'
    })
    },
    handleStop() {
      wx.navigateTo({
        url: '/pages/stop/stop',
      })
    },
    handleStop2() {
      wx.navigateTo({
        url: '/pages/status/status',
      })
    },
    getPageIndex() {
      pageindex().then(res => {
        console.log('获取信息', res)
        if(res.code !=0) {
          showToast('提示', res.msg)
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else {
          let result = res.data
          this.setData({
            userDataList:result,
            title:result.area
          })
          if(result.usertype == 0) {
            wx.setNavigationBarTitle({
              title: '智能烘烤系统-' + this.data.title,
            })
          } else if(result.usertype == 1) {
            wx.setNavigationBarTitle({
              title: '智能烘烤系统-' + this.data.title + '市',
            })
          }
        }
      }).catch(err => {})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getPageIndex()
    }
  }
})