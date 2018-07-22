var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerPanelShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.g_doubanBase + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = app.globalData.g_doubanBase + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = app.globalData.g_doubanBase + "/v2/movie/top250?start=0&count=3";

    this.getRequestData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getRequestData(comingSoonUrl, 'comingSoon', '即将上映');
    this.getRequestData(top250Url, 'top250', 'Top250');
  },

  onBindFocus: function(event) {
    console.info('onBindFocus');
    this.setData({
      containerPanelShow: false,
      searchPanelShow: true
    });
  },

  onCancelSearchTab: function(event) {
    console.info('onCalcelSearchTab...');
    this.setData({
      containerPanelShow: true,
      searchPanelShow: false
    });
  },

  onBindChange: function(event) {
    console.info('onBindChange');
    this.setData({
      containerPanelShow: true,
      searchPanelShow: false,
      searchContent: ''
    });
  },

  moreMovies: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/movies/more-movies/more-movies?category=' + category,
    });
  },

  getRequestData: function(url, selectedKey, categoryName) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.info(res);
        var movies = util.processDoubanData(res.data);
        var data = {};
        data[selectedKey] = {
          movies: movies,
          categoryName: categoryName
        };
        that.setData(data);
      }
    })
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