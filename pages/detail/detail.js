//获取应用实例
const app = getApp()

Page({
  data:{
    item:''
  },
  onLoad:function(options){
    var shopId= options.shopId
    console.log(shopId)
   var that = this
    wx.request({
      url: 'http://localhost:8899/repair/shop/detail?shopId='+shopId,
      method : 'post',
      success(res){
        that.setData({
          repairData: res.data
        })
        console.log(res.data);
      }
    })
    wx.request({
      url: 'http://localhost:8899/comment/list?shopId=' + shopId,
      method: 'post',
      success(res) {
        that.setData({
          comment:res.data
        })
        console.log(res.data)
      }
    })
  },
  jumpBtn: function (e) {
    var item = e.currentTarget.dataset.set;
    console.log(item.id)
    console.log(item.name)
    var shopId = item.id;
    wx.navigateTo({
      url: '../appointment/appointment?shopId=' + item.id + "&name=" + item.name
    })
  },
  jumpComBtn:function(e){
    var item = e.currentTarget.dataset.set;
    console.log(item.id)
    console.log(item.name)
    var shopId = item.id;
    wx.navigateTo({
      url: '../comment/comment?shopId=' + item.id + "&name=" + item.name
    })
  }
})