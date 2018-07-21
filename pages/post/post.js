var postData = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    a: 20,
    b: 30,
    c: 30,
    length: 20,
    name: 'goodsman',
    object: {
      key: "Hello"
    },
    array: ['testarray', "index2"]
  },

  swiperTap: function(event) {
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: '/pages/post/post-detail/detail?id=' + postid
    })
  },

  toArticleDetail: function(event){
    console.info('toArticleDetail');
    console.info(event);
    var postid = event.currentTarget.dataset.postid;
    console.info('postid : ' + postid)
    wx.navigateTo({
      url: '/pages/post/post-detail/detail?id=' + postid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ postList: postData.postList});
    //this.data.postList = postData.postList;
    console.info('onload');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    console.info('onready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.info('onshow');
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