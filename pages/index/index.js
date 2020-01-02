//index.js
//获取应用实例
const app = getApp()
var dialog = require("../../utils/dialog.js")
var wxNotificationCenter = require("../../utils/WxNotCenter.js")

Page({
  data: {
    motto: '美之选-窗帘布艺',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    contentList: [],
    currentType: wx.getStorageSync('currentType'),
    types: wx.getStorageSync('types') ? wx.getStorageSync('types') : app.globalData.types
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  onLoad: function() {
    //加载第一个类型的列表
    if (!this.data.currentType) {
      let that = this
      this.data.types.every(function (item) {
        if (item.is_show) {
          wx.setStorageSync('currentType', item.value)
          that.setData({  
            currentType: item.value
          })
          return false
        } else {
          return true
        }
      })
    }
    //this.getList(this.data.currentType)
    //添加通知监听
    //wxNotificationCenter.addNotification("typesChangeNotification", this.typesChangeNotificationHandler, this)
  },
  //接收类别编辑页面中修改了类别标签的通知，重新处理
  typesChangeNotificationHandler: function() {
    this.setData({
      types: wx.getStorageSync('types'),
      currentType: wx.getStorageSync('currentType')
    })
    this.getList(wx.getStorageSync('currentType'))
  },
  getList: function(type) {
    dialog.loading()
    var that = this
    //请求数据
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})