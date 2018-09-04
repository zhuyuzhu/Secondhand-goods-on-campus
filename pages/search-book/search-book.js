// pages/search/search.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放数据
    resultList: [],
    keyWord: '',
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
      title: '搜索书籍'
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

  },
  bindToSearch(e) {
    var that = this;
    var keyWord = that.data.keyWord;
    console.log(1);
    console.log(keyWord);
    wx.navigateTo({
      url: '../release/release?keyWord=' + keyWord
    })
  },
  searchBook(e) {
    var that = this;
    var keyWord = that.data.keyWord;
    var value = e.detail.value; //input输入的值
    console.log(value);
    that.setData({
      keyWord: value
    })
    // var url = app.globalData.doubanBase + app.globalData.ResourcesURL + value + "&&start=0&&count=10"; 

    var url = app.globalData.huanbaoBase + 'searchbook.php';
    //微信请求方式的写法
  
    wx.request({
      url,
      method: 'POST',
      data: {
        keyword: value
      },
      header: { 'content-type': 'application/x-www-form-urlencoded ' },
      success(res) {
        console.log(res);
        that.handleData(res.data.data);
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  handleData(data) {
    var resultList = []
    data.forEach(item => {
      //注意： push可以是具体的对象
      // resultList.push({
      //   title: item.title,
      //   image: item.images.small,
      //   desc,
      //   id: item.id
      // })
      resultList.push(item)
    })
    this.setData({ resultList: resultList });//将此处resultList的值放在数据data的resultList中

  },
  bindToSearchList(e) {
    console.log(e.currentTarget.dataset.value);
    var that = this;
    var url = app.globalData.huanbaoBase + 'searchbook.php';
    var value = e.currentTarget.dataset.value;
    var keyWord = value;
    wx.navigateTo({
      url: '../release/release?keyWord=' + keyWord
    })
  }
})