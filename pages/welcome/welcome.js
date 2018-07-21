Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  startTrip: function(event) {
    console.info('inner');
    console.info(event);
    // wx.navigateTo({
    //   url: '/pages/post/post?id=1'
    // });

    // wx.redirectTo({
    //   url: '/pages/post/post-detail/detail?id=1'
    // });

    //跳转到tab页面，要求url指定的页面必须在app.json的tabBar中
    //wx.navigeteTo 和 wx.redirectTo 跳转非tab的页面，如果跳转tab页面会失效
    //wx.switchTab url路径后面不能携带参数
    // url: '/pages/post/post-detail/detail?id=1'
    wx.switchTab({
      url: '/pages/post/post'
    });
  },

  middle: function(event) {
    console.info('middle');
    console.info(event);
  },
  outter: function(event) {
    console.info('outter');
    console.info(event);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.info('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.info('onUnload');
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