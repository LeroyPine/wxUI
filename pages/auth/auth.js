const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库

      console.log(getApp().globalData)
      wx.login({
        success: function(res) {
          var loginCode = res.code;
          console.log(loginCode)

          wx.request({
            url: 'http://localhost:8899/wx/login', //接口地址
            data: {
              code: loginCode,
              userNick: e.detail.userInfo.nickName,
            },
            method: "post",
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function(res) {
              app.globalData.oid = res.data.openid
              wx.request({
                url: 'http://localhost:8899/user/info/add',
                data: {
                  openId: getApp().globalData.oid,
                  nickName: e.detail.userInfo.nickName,
                  avatarUrl: e.detail.userInfo.avatarUrl,
                  province: e.detail.userInfo.province,
                  city: e.detail.userInfo.city
                },
                method: 'post',
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  //从数据库获取用户信息
                  that.queryUsreInfo();
                  console.log("插入小程序登录用户信息成功！");
                }
              });
              //授权成功后，跳转进入小程序首页
              wx.switchTab({
                url: '/pages/index/index'
              })

            },
          })

        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    wx.request({
      url: 'http://localhost:8899/user/info/userInfo',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
  },

})