// pages/movie-detail/movie-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {
      thingImage: '', // 物品图片
      thingName: '', //物品名字
      thingConditions: '', //成色
      thingPrice: '', //价格
      thingCampus: '', //校区
      thingPhoneNumber: '', //联系方式
      thingDescribe: '', //描述备注
      poster: '', //发布者
      thingId: '',
      studentId: '',
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id); //接收上一个页面传过来的数据，是个对象。
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    });
   
    var that = this;
    var detailData = that.data.detailData;
    var thingImage = 'detailData.thingImage';
    var thingName = 'detailData.thingName';
    var thingConditions = 'detailData.thingConditions';
    var thingPrice = 'detailData.thingPrice';
    var thingCampus = 'detailData.thingCampus';
    var thingPhoneNumber = 'detailData.thingPhoneNumber';
    var thingDescribe = 'detailData.thingDescribe';
    var thingId = 'detailData.thingId';
    var studentId = 'detailData.studentId';
    var poster = 'detailData.poster';
    var url = app.globalData.huanbaoBase + 'getbythingid.php';
    wx.request({
      url,
      method: 'POST',
      // header: {'content-type' : 'json'},
      header: {
        'content-type': 'application/x-www-form-urlencoded '
      },
      data: {
        thingId: options.id,
      },
      success: function(res) {
        var data = res.data.data[0];
        that.setData({
          [thingImage]: data.gpicture, //价格
          [thingName]: data.gname, //名字
          [thingConditions]: data.gstatus, //成色
          [thingPrice]: data.gprice, //价格
          [thingCampus]: data.gcollege, //校区
          [thingPhoneNumber]: data.phone, //联系方式
          [thingDescribe]: data.gnote || '无描述', //描述
          [thingId]: data.goodid, //物品id
          [studentId]: data.studentID, //学生id
          [poster]: data.usersname, //发布者
        })
      } //此处的res就是data对象
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})