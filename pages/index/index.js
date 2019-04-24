var util = require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    cuurentDate: null,
    navTab: ['语文', '数学', '英语'],
    currentTab: 0,
    noSureForChineseMon: 0,
    noSureForChineseAft: 0,
    noSureForPathMon: 0,
    noSureForPathAft: 0,
    noSureForEngMon: 0,
    noSureForEngAft: 0,
  },
  onLoad: function() {
    var that = this;
    var cuurentDate = util.executeDate();
    console.log(app.globalData.userInfo.id)
    wx.request({
      url: 'http://localhost:8666/check/record/dataStat',
      method: 'get',
      data: {
        userId: app.globalData.userInfo.id,
      },
      success(res) {
        console.log(res.data);
        if (res.data != null) {
          that.setData({
            noSureForChineseMon: res.data.noSureForChineseMon,
            noSureForChineseAft: res.data.noSureForChineseAft,
            noSureForPathMon: res.data.noSureForPathMon,
            noSureForPathAft: res.data.noSureForPathAft,
            noSureForEngMon: res.data.noSureForEngMon,
            noSureForEngAft: res.data.noSureForEngAft
          })
        }
      }
    })
    that.setData({
      userInfo: app.globalData.userInfo,
      cuurentDate: cuurentDate
    })
  },
  currentTab: function(e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getData()
  },
  getData: function() {

  },
  sureForChinese: function(e) {
    console.log(e)
    var that = this;
    var state = e.currentTarget.dataset.state;
    var cwId = e.currentTarget.dataset.cwid;
    console.log(cwId)
    wx.request({
      url: 'http://localhost:8666/check/record/save',
      method: 'get',
      data: {
        userId: app.globalData.userInfo.id,
        cwId: cwId,
        startState: state,
        endState: state,
      },
      success(res) {
        console.log(res.data);
        if (res.data != null) {
          that.setData({
            noSureForChineseMon: res.data.noSureForChineseMon,
            noSureForChineseAft: res.data.noSureForChineseAft,
            noSureForPathMon: res.data.noSureForPathMon,
            noSureForPathAft: res.data.noSureForPathAft,
            noSureForEngMon: res.data.noSureForEngMon,
            noSureForEngAft: res.data.noSureForEngAft
          })
        }
      }
    })
  }

})