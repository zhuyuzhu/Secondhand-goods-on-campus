// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义两个变量，
    showInThearter: true,
    showComingSoon: false,
    //下面两个对象用来存放加载到的数据offset和total
    //让这两个对象和typeId同名，方便使用
    inThearters: {},
    comingSoon: {},
    lastbookId: '',
    lastthingId: '',
    bookLength: 5,
    thingLength: 5,
    isBookShow: false,
    isThingShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;
    
    if(typeId === 'inThearters'){
      this.setData({showInThearter: true,showComingSoon: false});
     
    }else{
      this.setData({showInThearter: false, showComingSoon: true})
     
    }
    this.getMovieListData(typeId);//根据唯一标示获取对应的数据
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
     var isShow = this.data.isShow;
     this.setData({
       isShow: false
     })
     console.log(11)
 
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
  selectTap(event) {
    
    var tabId = event.currentTarget.dataset.tabId;
    console.log(tabId);//comingSoon inThearters
    //注意此处的tabId是text标签中（正在上映、即将上映）中的data-tab-id的值
    //这里最好还是要换一个标示，不然跟上面的标示重名，容易混淆
    if (tabId === 'inThearters') {
      this.setData({ showInThearter: true, showComingSoon: false });
     
    } else {
      this.setData({ showInThearter: false, showComingSoon: true });
     
    }
    //在两个值切换的时候，如果没有数据再进行加载
    if(!this.data[tabId].messages) {
      this.getMovieListData(tabId);
    }
  },
  getMovieListData(typeId) {
   var that = this;
    //因为more页面只展示其中一个的数据，所以用一个URL来代替不同情况
    var URL, mark;
    // var lastbookId = that.data.lastbookId;
    var bookLength = that.data.bookLength;
    var thingLength = that.data.thingLength;
    var isBookShow = that.data.isBookShow;
    var isThingShow = that.data.isThingShow;
    if(typeId === 'inThearters'){
      URL = app.globalData.huanbaoBase + 'refreshbooks.php';
      mark = 'lastbookId';
    } else {
      URL = app.globalData.huanbaoBase + 'refreshthings.php';
      mark = 'lastthingId';
    }
    //当没有数据的时候，就不发送请求
  
    if(bookLength < 5){
      that.setData({
        isBookShow: true
      })
    } 
     if (thingLength < 5){
      that.setData({
        isThingShow: true
      }) 
    }
    if(thingLength<5 && bookLength < 5){
      return
    }
   
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url: URL,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded ' },
      data: {
        lastId: that.data[mark]
      },
      success: res => {
        var messages = that.data[typeId].messages || [];
        var data = res.data.data;
       
        data.forEach(item => {
          messages.push(item);
        })
        
        if (mark == 'lastbookId'){
          console.log(data.length); // 计算每组数据的长度。
          that.setData({
            bookLength: data.length  //每次获取5组值
          })
         console.log(1);
          console.log(res.data.data);
          that.setData({
            [typeId]: { messages },
            lastbookId: data[data.length-1].bookid //将这组数据中的最后一项的id赋值给lastbookId;
          })
       }else if(mark == 'lastthingId'){
          console.log(2);
          that.setData({
            thingLength: data.length
          })
          console.log(res.data.data);
          that.setData({
            [typeId]: { messages },
            lastthingId: res.data.data[data.length - 1].goodid
          })
       }
      },
      fail: err => console.log(err),
      complete(){
        wx.hideToast();
      }
    })
  },
  //下拉加载数据
  loadMore() {
    let typeId = '';
    if(this.data.showInThearter){
      typeId = 'inThearters'
    }else {
      typeId = 'comingSoon'
    }
   
    this.getMovieListData(typeId);
  },


  //跳转到详情页
  toBookDetail(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../../movie-detail/movie-detail?id=' + id,
    })
  },
   toThingDetail(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../../thing-detail/thing-detail?id=' + id,
    })
  }

})