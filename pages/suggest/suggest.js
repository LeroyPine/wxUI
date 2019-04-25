//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    paperId:1,
    examData:null,
    examSize:null,
    answers:[]
  },
  onLoad: function (options){
    var that = this
    console.log(app.globalData.userInfo.nickName)
    var username = app.globalData.userInfo.nickName;
    wx.request({
      url: 'http://localhost:8666/paper/detailForWX?paperId=1',
      method:'get',
      success(res){
        console.log(res)
        that.setData({
          examData : res.data,
          examSize : res.data.length 
        })
      }
    })
  },
  answer:function(e){
    let that = this;
    console.log(e.detail.value)
    var answers = that.data.answers;
    console.log(answers)
    answers.push(e.detail.value)
    console.log(answers);
  }
  ,
  formSubmit(e) {
    let that = this;
    console.log(that.data.answers)
    var answers = that.data.answers
    console.log(answers)
    var userId = app.globalData.userInfo.id
    var paperId = that.data.paperId
    console.log(userId)
    console.log(paperId)
    wx.request({
      url: 'http://localhost:8666/user/score/save',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      data: {
        paperId: userId,
        userId: userId,
        answers: answers,
      },
      success(res) {
        console.log(res.data)
        var score = res.data
        wx.showModal({
          title: '你好',
          content: '你的得分为:' + score,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../index/index'
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '../index/index'
              })
            }
          }
        })
      }
    })   
  }
})
 