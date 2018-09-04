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
     
    },
    hadAddCart: false,  //已经加入购物车
    studentId: '',
    thingId: '',
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
    var thingId = that.data.thingId;
    var studentId = that.data.studentId;
    var nickName = that.data.nickName;
    var poster = 'detailData.poster';
    var url = app.globalData.huanbaoBase + 'getbythingid.php';
    
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
          thingId: data.goodid, //物品id
          
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
    console.log(studentId);
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
    wx.setNavigationBarTitle({
      title: '物品详情'
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addMyCart() {
    var that = this;
    var hadAddCart = that.data.hadAddCart;
    var studentId = that.data.studentId;
    var thingId = that.data.thingId;
    var url = app.globalData.huanbaoBase + 'thingcar.php'
    console.log(studentId);
    if (studentId) {
      console.log(studentId);
      if (!hadAddCart && studentId && thingId) {
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
                  thingId: thingId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  console.log(res);
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
    } else{
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
    var thingId = this.data.thingId;
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
    var thingId = this.data.thingId;
    var url = app.globalData.huanbaoBase + 'tempgoods.php';
    wx.request({
      url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        thingId: thingId
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
  ReservationPayment() {
    var that = this;
    var thingId = that.data.thingId;
    var studentId = that.data.studentId;
    var nickName = that.data.nickName;
    var url = app.globalData.huanbaoBase + 'buything.php';
    console.log(nickName)
    console.log("预约购买")
    wx.request({
      url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        thingId: thingId,
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
        setTimeout(function () {
          wx.switchTab({
            url: '../order/order'
          })
        }, 1500)

      }
    })
  }
})