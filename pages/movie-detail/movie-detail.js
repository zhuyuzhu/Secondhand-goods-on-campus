// pages/movie-detail/movie-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detailData: {
        url: '',
        bookName: '', //书名
        bookAuthor: '',//作者
        bookPress: '',//出版社
        isTextbook: false,//是否资料书
        conditions: '',//
        campus: '',// 校区
        price: '', //价格
        remark: '', //备注，详情
        poster: '', //发布者
      },
    hadAddCart: false ,  //已经加入购物车
    studentId: '',  
    bookId: '',
    theCover: false,
    thePay: false,
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id); //接收上一个页面传过来的数据，是个对象。
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    });
   
    var that = this;
    var detailData = that.data.detailData;
    var theUrl = 'detailData.url';
    var bookName = 'detailData.bookName';
    var bookAuthor = 'detailData.bookAuthor';
    var bookPress = 'detailData.bookPress';
    var isTextbook = 'detailData.isTextbook';
    var conditions = 'detailData.conditions';
    var campus = 'detailData.campus';
    var price = 'detailData.price';
    var remark = 'detailData.remark';
    var poster = 'detailData.poster';
    var studentId = that.data.studentId; //学生id
    var bookId = that.data.bookId;  //书本id
    var nickName = that.data.nickName;
    var url = app.globalData.huanbaoBase + 'getbybookid.php';

    try {
      var value = wx.getStorageSync('studentIdSync')
      if (value) {
        console.log(value); //同步得到studentId的值
        that.setData({
          studentId: value
        })
      }
    } catch (e) {
      console.log(0);
    }
     try {
      var value = wx.getStorageSync('nickName')
      if (value) {
        that.setData({
          [nickName]: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    console.log(studentId);//此处是获取不到值的
    wx.request({
      url,
      method: 'POST',
      // header: {'content-type' : 'json'},
      header: { 'content-type': 'application/x-www-form-urlencoded '},
      data: {
        bookId: options.id,
      },
      success: function(res){
        
        var data = res.data.data[0];
          that.setData({
            [theUrl]: data.picture,
            [bookName]: data.bname,
            [isTextbook]: data.reference,
            [remark]: data.bnote || '无描述',
            [price]: data.bprice,
            [bookAuthor]: data.author,
            [bookPress]: data.press,
            [poster]: data.usersname,
            [campus]: data.college,
            [conditions]: data.bstatus,
            bookId: options.id
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
    var that = this;
    var studentId = that.data.studentId; //学生id
    var nickName = that.data.nickName;
    try {
      var value = wx.getStorageSync('studentIdSync')
      if (value) {
        console.log(value); //同步得到studentId的值
        that.setData({
          studentId: value
        })
      }
    } catch (e) {
      console.log(0);
    }
    console.log(studentId);
     try {
      var value = wx.getStorageSync('nickName')
      if (value) {
        that.setData({
          nickName: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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
      title: '书本详情'
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
  addMyCart(){
    var that = this;
    var hadAddCart = that.data.hadAddCart;
    var studentId = that.data.studentId;
    var bookId = that.data.bookId;
    var url = app.globalData.huanbaoBase + 'bookcar.php'
    console.log(bookId);
    if(studentId){
      console.log(studentId);
      if (!hadAddCart) {
        wx.showModal({
          title: '提示',
          content: '是否加入购物车',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url, //仅为示例，并非真实的接口地址
                method: 'POST',
                data: {
                  studentId: studentId,
                  bookId: bookId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  that.setData({
                    hadAddCart: true
                  })
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000
                  })
                }
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      } else {
        wx.showModal({
          title: '提示',
          content: '请勿重复添加',
 
        })
      }
    }else {
      wx.showModal({
        title: '提示',
        content: '请认证您的身份',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../my/mySetting/mySetting',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  nowBuy() {
    var that = this;
    var bookId = this.data.bookId;
    var theCover = that.data.theCover;
    var thePay = that.data.thePay;
    that.setData({
      theCover: true,
      thePay: true,
    })
  },
  deletePay() {
    var that = this;
    var theCover = that.data.theCover;
    var thePay = that.data.thePay;
    that.setData({
      theCover: false,
      thePay: false,
    })
  },
  buy() {
    var that = this;
    var bookId = this.data.bookId;
    var url = app.globalData.huanbaoBase + 'tempbooks.php';
    wx.request({
      url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        bookId: bookId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        if (res.data === 1) {
          that.ReservationPayment();//预约付款
        } else {
          wx.showModal({
            title: '提示',
            content: '该商品已下架',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  ReservationPayment(){
    var that = this;
    var bookId = that.data.bookId;
    var studentId = that.data.studentId;
    var nickName = that.data.nickName;
    var url = app.globalData.huanbaoBase + 'buybook.php';
    console.log(nickName)
    console.log("预约购买")
    wx.request({
      url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        bookId: bookId,
        buyStatus: 1,
        buyStudentID: studentId,
        buyUsername: nickName,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '预购成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../order/order'
          })
        }, 1500)
        
      }
    })
  }
})