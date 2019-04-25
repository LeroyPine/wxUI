//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    navTab: ['打卡', '考试'],
    currentTab: 0,
    sendList: [],
    appoindata: null,
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
    var username = app.globalData.userInfo.nickName
    console.log(type)
    if(type == 0){
      wx.request({
        url: 'http://localhost:8899/appointment/list?userName=' + username,
        method: 'post',
        success(res) {
          console.log(res)
          that.setData({
            appoindata: res.data,
          })
        }
      })
    }else{
      wx.request({
        url: 'http://localhost:8899/complaint/list?userName=' + username,
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
    var username = app.globalData.userInfo.nickName
    wx.request({
      url: 'http://localhost:8899/appointment/list?userName=' + username,
      method: 'post',
      success(res) {
        console.log(res)
        that.setData({
          appoindata: res.data,
        })
      }
    })

  },
  delBtn:function(e){
    var that = this
    var item = e.currentTarget.dataset.set;
    console.log(item)
    wx.request({
      url: 'http://localhost:8899/appointment/del?id=' + item,
      method: 'post',
      success(res) {
        that.onLoad()
      }
    })

  }
})