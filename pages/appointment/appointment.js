//获取应用实例
const app = getApp()

Page({
  data: {
    repairName: '',
    shopId: '',
    openId: '',
  },
  onLoad: function(options) {
    var shopId = options.shopId
    var name = options.name;
    console.log(shopId)
    console.log(name)
    var that = this
    that.setData({
      repairName: name,
      shopId: shopId,
    })

  },

  formSubmit(e) {
    console.log(app.globalData.userInfo)
   var user =  app.globalData.userInfo
    var userName = user.nickName
    var that = this
    console.log(e);
    var appoint = e.detail.value;
    console.log(appoint.repairName)
    wx.request({
      url: 'http://localhost:8899/appointment/add',
      header: {
        'content-type': 'application/json' //默认值
      },
      method: 'post',
      data: {
        repairName: appoint.repairName,
        electName: appoint.electName,
        pheno: appoint.pheno,
        age: appoint.age,
        shopId: appoint.shopId,
        date: appoint.date,
        username: userName
      },
      success(res) {
        console.log(res.data);
        if (res.statusCode == 406) {
          wx.showModal({
            content: '授权登陆',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../auth/auth',
                })
              } else {
                console.log("用户点击取消");
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../success/success',
          })
        }
      }
    })
  },
})