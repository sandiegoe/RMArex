var app = getApp();
var util = require("../../../utils/util.js");

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
    var that = this;
    var movieId = options.id;
    var movieDetailUrl = app.globalData.g_doubanBase + "/v2/movie/subject/" + movieId;
    console.info(movieDetailUrl);
    wx.showNavigationBarLoading();
    util.callAjax(movieDetailUrl, null, function(data){
      var movie = that.processMovieDetail(data);
      that.setData({
        movie: movie
      });
      wx.hideNavigationBarLoading();
    });
  },

  previewImage: function(event) {
    var url = event.currentTarget.dataset.imageurl;
    wx.previewImage({
      urls: [url]
    })
  },

  processMovieDetail: function(data) {
    console.info(data);
    var movie = {};
    movie.id = data.id;
    movie.title = data.title;
    movie.image = data.images.large;
    movie.countryyear = data.countries[0] + '-' + data.year;
    movie.wishCount = data.wish_count;
    movie.commentsCount = data.comments_count;
    movie.originalTitle = data.original_title;
    movie.stars = util.processMovieStars(data.rating.stars);
    movie.average = data.rating.average;
    movie.director = data.directors[0].name;
    movie.cast = this.processCastName(data);
    movie.castInfo = this.processCastInfo(data);
    movie.tags = this.processTagsName(data.tags);
    movie.genres = this.processTagsName(data.genres);
    movie.summary = data.summary;

    console.info(movie);
    return movie;
  },

  processTagsName: function(array) {
    var itemName = "";
    if (array && array.length > 0) {
      for (var i in array) {
        if (i > 4) { //只显示前五个标签
          break;
        }
        var item = array[i];
        itemName = itemName + item + " / ";
      }
    }
    if (itemName.length > 0) {
      itemName = itemName.substring(0, itemName.length - 2);
    }
    return itemName;
  },

  processCastName: function(data) {
    var castName = "";
    if (data.casts && data.casts.length > 0) {
      for (var i in data.casts) {
        var cast = data.casts[i];
        castName = castName + cast.name + " / ";
      }
    }
    if (castName.length > 0) {
      castName = castName.substring(0, castName.length - 2);
    }
    return castName;
  },

  processCastInfo: function(data) {
    var castInfoArr = [];
    if (data.casts && data.casts.length > 0) {
      for (var i in data.casts) {
        var cast = data.casts[i];
        var castInfo = {};
        castInfo.name = cast.name;
        castInfo.image = cast.avatars.large;
        castInfoArr.push(castInfo);
      }
    }
    return castInfoArr;
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