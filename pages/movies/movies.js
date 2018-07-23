var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerPanelShow: true,
    searchPanelShow: false,
    searchUrl: "",
    searchMovies: {
      movies: []
    },
    totalCount: 0,
    inTheatersUrl: app.globalData.g_doubanBase + "/v2/movie/in_theaters?start=0&count=3",
    comingSoonUrl: app.globalData.g_doubanBase + "/v2/movie/coming_soon?start=0&count=3",
    top250Url: app.globalData.g_doubanBase + "/v2/movie/top250?start=0&count=3"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showNavigationBarLoading();
    this.getRequestData(this.data.inTheatersUrl, 'inTheaters', '正在热映');
    wx.showNavigationBarLoading();
    this.getRequestData(this.data.comingSoonUrl, 'comingSoon', '即将上映');
    wx.showNavigationBarLoading();
    this.getRequestData(this.data.top250Url, 'top250', 'Top250');
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
      searchPanelShow: false,
      searchMovies: {
        movies: []
      }
    });
  },

  onBindChange: function(event) {
    console.info('onBindChange');
    console.info(event);
    var search = event.detail.value;
    if (!search) {
      console.info("balank");
      return;
    }
    console.info(search);
    var searchUrl = app.globalData.g_doubanBase + "/v2/movie/search?q=" + search;
    wx.showNavigationBarLoading();
    this.getRequestData(searchUrl, "searchMovies", null);
    this.data.searchUrl = searchUrl;
    this.data.totalCount = this.data.totalCount + 20;
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
        var data = {};
        var movies = util.processDoubanData(res.data);
        if (selectedKey == 'searchMovies') { // searchMovies 的话 追加
          console.info("原有：" + that.data[selectedKey]);
          console.info("原有的movies：" + that.data[selectedKey].movies);
          movies = that.data[selectedKey].movies.concat(movies);
        }
        data[selectedKey] = {
          movies: movies,
          categoryName: categoryName
        };
        that.setData(data);
        wx.hideNavigationBarLoading();
        // if (selectedKey == 'searchMovies') {
          wx.stopPullDownRefresh();
        // }
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
    if (this.data.searchPanelShow) { //搜索页
      var searchUrl = this.data.searchUrl;
      searchUrl = searchUrl + "&start=0&count=" + 20;
      this.data.searchMovies = { movies: [] }; //清空原有的movies
      wx.showNavigationBarLoading();
      this.getRequestData(searchUrl, "searchMovies", null);
      this.data.totalCount = 20;
    } else {
      console.info("no search page pull down refersh...");
      wx.showNavigationBarLoading();
      this.getRequestData(this.data.inTheatersUrl, 'inTheaters', '正在热映');
      wx.showNavigationBarLoading();
      this.getRequestData(this.data.comingSoonUrl, 'comingSoon', '即将上映');
      wx.showNavigationBarLoading();
      this.getRequestData(this.data.top250Url, 'top250', 'Top250');
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.searchPanelShow) { //搜索页
      var searchUrl = this.data.searchUrl;
      var totalCount = this.data.totalCount;
      searchUrl = searchUrl + "&start=" + totalCount + "&count=" + 20;
      wx.showNavigationBarLoading();
      this.getRequestData(searchUrl, "searchMovies", null);
      this.data.totalCount = totalCount + 20;
    } else {
      console.info("no search page reach bottom....");
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})