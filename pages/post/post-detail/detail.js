var postData = require("../../../data/post-data.js") //导入数据文件
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  showModel: function(flag, collection, postId, that){
    wx.showModal({
      title: '请选择',
      content: !flag ? '添加收藏？' : '取消收藏?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#666',
      confirmText: '确定',
      confirmColor: '#333',
      success: function (res) {
        console.info(res);
        if (res.confirm) {
          collection[postId] = !flag;
          console.info(collection);
          wx.setStorageSync("collection", collection);
          that.setData({ collected: !flag });
        }
      }
    })
  },

  showToast: function(flag, collection, postId, that) {
    wx.showToast({
      title: !flag ? '收藏成功!' : '取消收藏成功!',
      icon: 'success',
      duration: 1500,
      success: function(){
        collection[postId] = !flag;
        that.setData({collected: !flag});
        // wx.setStorageSync("collection", collection);
        wx.setStorage({
          key: 'collection',
          data: collection,
          success: function(){
            console.info('异步方法调用成功!');
          }
        })
      },
      fail: function(){
        console.info('fail');
      },
      complete: function(){
        console.info("complete");
      }
    })
  },

  collectTap: function(){
    var collection = wx.getStorageSync("collection"); //获取缓存
    var postId = this.data.currentPostId; 
    var flag = collection[postId]; // 获取当前这篇文章的收藏状态
    var that = this; 

    // //添加提示效果
    // wx.showToast({
    //   title: !flag ? '收藏成功!' : '取消收藏成功!',
    //   icon: 'success',
    //   duration: 1500,
    //   success: function(){
    //     collection[postId] = !flag;
    //     that.setData({collected: !flag}); // 修改数据绑定
    //     wx.setStorageSync("collection", collection); // 修改缓存
    //   },
    //   fail: function(){
    //     console.info('fail');
    //   },
    //   complete: function(){
    //     console.info("complete");
    //   }
    // })

    this.showToast(flag, collection, postId, that);

    // this.showModel(flag, collection, postId, that);
    
  },

  sharingTab: function(){
    wx.showActionSheet({
      itemList: [
        '发送给朋友',
        '分享到朋友圈',
        '分享到手机QQ',
        '分享到QQ空间'
      ],
      itemColor: '#333',
      success: function(res){
        console.info(res);
        console.info(res.tapIndex);
      },
      fail: function(res) {
        console.info(res);
      }
    })
  },

  playingAudioTab: function(event) {
    var postId = this.data.currentPostId; 
    var detail = postData.postList[postId];
    var that = this;
    //页面一进来执行onLoad 就已经去判断当前页面是否正在播放 同时设置isPlayingAudio
    var isPlayingAudio = this.data.isPlayingAudio;
    //var isPlayingAudio = app.globalData.g_isPlayingAudio;
    if (isPlayingAudio && isPlayingAudio == true) { // 不为空 并且是 true
      wx.pauseBackgroundAudio();
      //设置当前页面的数据绑定
      that.setData({
        isPlayingAudio: false
      });
      //更新全局的g_isPlayingAudio
      app.globalData.g_isPlayingAudio = false;
      app.globalData.g_currentPostId = postId;
    } else {
      wx.playBackgroundAudio({
        dataUrl: detail.music.url,
        coverImgUrl: detail.music.coverImg,
        success: function () {
          //设置当前页面的数据绑定 是否再播放音乐
          that.setData({
            isPlayingAudio: true
          });
          //设置全局g_isPlayingAudio 为 true
          app.globalData.g_isPlayingAudio = true;
          app.globalData.g_currentPostId = postId;
        }
      });
    }
  },

  musicListener: function(){
    var that = this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayingAudio: true
      });
      app.globalData.g_isPlayingAudio = true;
    });
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingAudio: false
      });
      app.globalData.g_isPlayingAudio = false;
    });
  },

  checkCurrentPagePlaying: function(postId){
    var isPlayingAudio = app.globalData.g_isPlayingAudio;
    if (isPlayingAudio && postId == app.globalData.g_currentPostId) {
      this.setData({
        isPlayingAudio: true
      });
    } else {
      this.setData({
        isPlayingAudio: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var detail = postData.postList[postId];
    this.setData({detail: detail});
    this.setData({currentPostId: postId});

    // wx.setStorageSync("key", {
    //   name: "szq",
    //   age: 20
    // });
    // wx.clearStorageSync();
    // wx.removeStorageSync("key");
    var collection = wx.getStorageSync("collection");
    if (!collection) {
      collection = {};
    }
    var item = collection[postId];
    if (!item) { 
      item = false;
      collection[postId] = item;
    }

    this.setData({ collected: item }); // 绑定收藏变量 从而来决定页面收藏按钮的显示
    wx.setStorageSync("collection", collection); //更新缓存

    //检测当前页面的是否正在播放
    this.checkCurrentPagePlaying(postId);

    //音乐播放暂停 事件监听
    this.musicListener();
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