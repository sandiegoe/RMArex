var util = require("../../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      category: category
    })
    var url = app.globalData.g_doubanBase;
    switch(category) {
      case "正在热映":
        url += "/v2/movie/in_theaters";
        break;
      case "即将上映":
        url += "/v2/movie/coming_soon";
        break;
      case "Top250":
        url += "/v2/movie/top250";
        break;
      default:
        return;
    }
    util.callAjax(url, null, this.callBack);
  },

  callBack: function(data) {
    console.info(data);
    var movies = util.processDoubanData(data);
    console.info(movies);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var category = this.data.category;
    wx.setNavigationBarTitle({
      title: category
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})