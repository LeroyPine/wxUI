const app = getApp();
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
    var user = app.globalData.userInfo
    var userName = user.nickName
    console.log(userName)
  
    var that = this
    console.log(e);
    var comment = e.detail.value;
   
        wx.request({
          url: 'http://localhost:8899/comment/add',
          header: {
            'content-type': 'application/json' //默认值
          },
          method: 'post',
          data: {
            shopId: comment.shopId,
            comment: comment.comment,
            username: userName
          },
          success(res) {
            console.log(res.data);
            wx.navigateTo({
              url: '../success/success',
            })
          }
        })
      
    
  }
})