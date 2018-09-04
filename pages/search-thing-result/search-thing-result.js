// pages/search/search.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放数据
    resultList: [],
    keyWord: '', //接收search-book传过来的关键字
    thingLastId: '',// 每组数据的最后一个书本的id
    thingSearchLength: 5,
    isThingSearchShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var keyWord = that.data.keyWord;
    console.log(options.keyWord);
    that.setData({
      keyWord: options.keyWord
    })
    that.searchResult();
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

  /**+
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
      title: '搜索结果'
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
    this.searchResult();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  searchResult() {
    var that = this;
    var keyWord = that.data.keyWord;
    var thingLastId = that.data.thingLastId;
    var resultList = that.data.resultList;
    var thingSearchLength = that.data.thingSearchLength;
    var isThingSearchShow = that.data.isThingSearchShow;
    var url = app.globalData.huanbaoBase + 'showthingsbykeyword.php';
    //微信请求方式的写法
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    })
    console.log(keyWord, thingLastId);
    wx.request({
      url,
      method: 'POST',
      data: {
        lastId: thingLastId,
        keyword: keyWord,  
      },
      header: { 'content-type': 'application/x-www-form-urlencoded ' },
      success(res) {
        console.log(res);
        console.log(res.data.data);
        var data = res.data.data;
        if (data == undefined) {
          wx.hideToast();
          that.setData({
            isThingSearchShow: true
          })
          return
        }
        that.handleData(res.data.data);
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  handleData(data) {
    var thingLastId = this.data.thingLastId;
    var thingSearchLength = this.data.thingSearchLength;
    console.log(thingSearchLength, thingLastId);
    thingSearchLength = data.length;
    var resultList = this.data.resultList;

    this.setData({
      thingLastId: data[thingSearchLength - 1].goodid,
      thingSearchLength: data.length
    })
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
  toThingDetail(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../thing-detail/thing-detail?id=' + id, //跳转到书本详情页
    })
  }
})