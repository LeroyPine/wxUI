//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    navTab: ['打卡记录', '考试记录'],
    currentTab: 0,
    sendList: [],
    records: null,
    complaindata:null,
    photo: null,
    username:null
  },
 currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx){
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getData()
  },
  getData: function () {
    var that = this
    var type =  that.data.currentTab
    var userId = app.globalData.userInfo.id
    console.log(type)
    if(type == 0){
      wx.request({
        url: 'http://172.20.10.10:8666/check/record/records?userId=' + userId,
        method: 'post',
        success(res) {
          console.log(res)
          that.setData({
            records: res.data,
          })
        }
      })
    }else{
      wx.request({
        url: 'http://172.20.10.10:8666/user/score/userScoreList?userId=' + userId,
        method: 'post',
        success(res) {
          console.log(res)
          that.setData({
            complaindata: res.data,
          })
        }
      })
    }
  }, 
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.userInfo.avatarUrl)
    that.setData({
      photo: app.globalData.userInfo.avatarUrl,
      username:app.globalData.userInfo.nickName
    })
    var userId = app.globalData.userInfo.id
    wx.request({
      url: 'http://172.20.10.10:8666/check/record/records?userId=' + userId,
      method: 'post',
      success(res) {
        console.log(res)
        that.setData({
          records: res.data,
        })
      }
    })

  }
})