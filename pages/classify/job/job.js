// pages/classify/job/job.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jobMessage: {}, //兼职信息
      jobId: '',
      jobLength: '5',
      isJobShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getMovieListData();
    
  },
  getMovieListData: function () {
    var that = this;
    var isJobShow = that.data.isJobShow;
    var jobMessage = 'jobMessage';
    var jobId = that.data.jobId;
    var jobLength = that.data.jobLength;
    var url = app.globalData.huanbaoBase + 'refreshjobs.php';
    
    if(jobLength < 5){
      that.setData({
        isJobShow: true
      })
      return
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000,
    })
    wx.request({
      url,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded ' },
      data: {
        lastId: jobId
      },
      success: res => {
        
        var messages = that.data.jobMessage.messages || [];
        var data = res.data.data; 
        that.setData({
         jobLength: data.length  //每次获取5组值
        })
        data.forEach(item => {
          messages.push(item);
        }) 
        console.log(messages);
        that.setData({
          [jobMessage]: {messages},
          jobId: res.data.data[4].jobid
        })
        
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  toDetail(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../jobDetail/jobDetail?id=' + id
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
    wx.setNavigationBarTitle({
      title: '校园兼职'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    this.getMovieListData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadMore: function () {
    console.log(1);
    
  },
})