//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    examData:null,
    examSize:null,
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
  formSubmit(e) {
    console.log(e)
    console.log(e.detail.value)
    var that = this
    console.log(that.data.examSize)
    let exSize = that.data.examSize
    var answers = [];
    for (let i = 1; i <= exSize;i++){
       console.log((e.detail.value.answer,i))

    }
    console.log(answers)
    /* wx.request({
      url: 'http://localhost:8899/complaint/save',
      header: {
        'content-type': 'application/json' //默认值
      },
      method: 'post',
      data: {
        repairShopId: shopId,
        userName: username,
        content: complain,
      },
      success(res) {
        wx.navigateTo({
          url: '../success/success',
        })

      }
    })   */
  }
})
 