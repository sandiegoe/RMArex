var util = require("../../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    totalCount: 0
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
    this.setData({
      url: url
    });
    util.callAjax(url, null, this.callBack);
    wx.showNavigationBarLoading();
  },

  toMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.id;
    console.info(movieId);
    if (movieId) {
      wx.navigateTo({
        url: '/pages/movies/movies-detail/detail?id=' + movieId,
      })
    } else {
      console.info("toMovieDetail fail[blank movieId]....");
    }
  },

  callBack: function(data) {
    console.info(data);
    //上一次的加上这一次的movies数据
    var movies = this.data.movies.concat(util.processDoubanData(data));
    console.info(movies);
    this.setData({
      movies: movies
    });
    //加载成功 记录数加上20
    this.data.totalCount = this.data.totalCount + 20;
    //关闭loading
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  // loadMore: function(){
  //   console.info("loadMore....");
  //   var totalCount = this.data.totalCount;
  //   var url = this.data.url + "?start=" + totalCount + "&count=20";
  //   util.callAjax(url, null, this.callBack);
  //   //loading
  //   wx.showNavigationBarLoading();
  // },

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
    console.info("pulldown....");
    var url = this.data.url + "?start=0&count=20";
    this.data.movies = [];
    this.data.totalCount = 0;
    util.callAjax(url, null, this.callBack);
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info("loadMore....");
    var totalCount = this.data.totalCount;
    var url = this.data.url + "?start=" + totalCount + "&count=20";
    util.callAjax(url, null, this.callBack);
    //loading
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})