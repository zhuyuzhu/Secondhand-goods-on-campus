// pages/classify/jobDetail/jobDetail.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobTitle: '',  //兼职名字
    jobTreat: '',  //兼职待遇
    jobTime: '',   //兼职时间
    jobPlace: '',  //兼职地点
    jobRequire: '', //兼职要求
    jobDiscripe: '', //兼职描述
    jobPoster: '',   //兼职发布者
    jobContactWay: '', //兼职联系方式
    jobId: '',         //兼职id
    studentId: '',    //学生id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    });
    var jobTitle = that.data.jobTitle;
    var jobTreat = that.data.jobTreat;
    var jobTime = that.data.jobTime;
    var jobPlace = that.data.jobPlace;
    var jobRequire = that.data.jobRequire;
    var jobDiscripe = that.data.jobDiscripe;
    var jobPoster = that.data.jobPoster;
    var jobContactWay = that.data.jobContactWay;
    var jobId = that.data.jobId;

    var url = app.globalData.huanbaoBase + 'getbyjobid.php';
    wx.request({
      url,
      method: 'POST',
      
      header: { 'content-type': 'application/x-www-form-urlencoded ' },
      data: {
        jobId: options.id,
      },
      success: function (res) {

        var data = res.data.data[0];
        console.log(data);
        that.setData({
          jobTitle: data.title,
          jobTreat: data.workpay,
          jobTime: data.worktime,
          jobPlace: data.workplace,
          jobRequire: data.workrequirement,
          jobDiscripe: data.discription,
          jobPoster: data.username,
          jobContactWay: data.workcontact,
        })
      } //此处的res就是data对象
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
      title: '兼职详情'
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})