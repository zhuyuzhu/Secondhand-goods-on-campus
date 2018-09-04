// post.js
var Bmob = require('../../utils/bmob.js');
var util = require('../../utils/util.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //导航栏的数据
    postBook: true,
    postThing: false,
    postJob: false,

    //发布书本的data值
    bookPhoneNumber: '', //用户电话号码
    studentId: '', //用户id 10
    nickname: '', //用户昵称 11
    ownerGender: '', //用户性别，0女 1男
    bookFound: false, //
    bookId: '', //书本id 
    bookImg: '', //书本图片链接9 物品图片链接
    bookName: '', //书本名字 1  物品名字 
    bookAuthor: '', //书本作者2
    bookPress: '', //书本出版社3
    phoneNumber: '', //书本价格
    isTextbook: false, //是否材料书4
    courseName: '', //是资料书的名称 
    conditions: ["全新", "几乎全新", "少量笔记", "较多笔记", "不影响阅读"], //5
    conditionIndex: 2, //
    campus: ["温泉校区", "咸安校区"], //6
    campusIndex: 0,
    currentPrice: '', //售价7 物品价格
    postRemark: '', // 备注8
    buttonLoading: false,

    //物品发布的数据
    thingImage: '',
    thingName: '',
    thingConditions: ["全新", "几乎全新", "九成新", "八成新", "七成新", "六成新", "五成新", "五成新以下"],
    thingConditionIndex: 0,
    thingPrice: '',
    thingCampus: ["温泉校区", "咸安校区"],
    thingCampusIndex: 0,
    thingPhoneNumber: '',
    thingDescribe: '',
    buttonLoadingThing: false,

    //兼职信息数据
    jobName: '',
    jobTime: '',
    jobPlace: '',
    jobRequir: '',
    jobSalary: '',
    jobWay: '',
    jobDescribe: '',
    buttonLoadingJob: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    
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
    var studentId = that.data.studentId;
    var nickName = that.data.nickName;
    wx.getStorage({
      key: 'studentId',
      success: function(res) {
        that.setData({
          studentId: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nickName',
      success: function(res) {
        that.setData({
          nickName: res.data
        })
      },
    })
    
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
      title: '校园二手交易'
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
  //导航栏的响应事件
  choosePostBook: function(e) {
    var that = this;
    that.setData({
      postBook: true,
      postThing: false,
      postJob: false
    })
  },
  choosePostThing: function(e) {
    var that = this;
    that.setData({
      postBook: false,
      postThing: true,
      postJob: false
    })
  },
  choosePostJob: function(e) {
    var that = this;
    that.setData({
      postBook: false,
      postThing: false,
      postJob: true
    })
  },


  //响应事件

  bindJobNameInput: function(e) { //兼职名称
    this.setData({
      jobName: e.detail.value
    })
  },
  bindJobTimeInput: function(e) { //兼职时间
    this.setData({
      jobTime: e.detail.value
    })
  },
  bindJobPlaceInput: function(e) { //兼职地点
    this.setData({
      jobPlace: e.detail.value
    })
  },
  bindJobRequirInput: function(e) { //兼职要求
    this.setData({
      jobRequir: e.detail.value
    })
  },
  bindjobSalaryInput: function(e) { //兼职工资
    this.setData({
      jobSalary: e.detail.value
    })
  },
  bindJobWayInput: function(e) { //兼职联系方式
    this.setData({
      jobWay: e.detail.value
    })
  },
  bindjobDescribeInput: function(e) { //兼职描述
    this.setData({
      jobDescribe: e.detail.value
    })
  },
  //
  bindThingImageInput: function() { //商品图片选择
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        var thingImage = res.tempFilePaths;
        that.setData({
          thingImage: thingImage
        })
      },
    })
  },
  bindThingNameInput: function(e) { //商品名字
    this.setData({
      thingName: e.detail.value
    })
  },
                       
  bindThingConditionsInput: function(e) { //商品成色
    this.setData({
      thingConditionIndex: e.detail.value
    })
  },
  bindThingPriceInput: function(e) { //商品价格
    this.setData({
      thingPrice: e.detail.value
    })
  },
  bindThingCampusInput: function(e) { //校区
    this.setData({
      thingCampusIndex: e.detail.value
    })
  },
  bindThingPhoneNumberInput: function(e) { //联系电话
    this.setData({
      thingPhoneNumber: e.detail.value
    })
  },
  bindThingDescribeInput: function(e) { //商品描述
    this.setData({
      thingDescribe: e.detail.value
    })
  },
  //书本信息
  bindBookPhoneNumberInput: function(e) {
    this.setData({
      bookPhoneNumber: e.detail.value
    })
  },
  bindBookNameInput: function(e) {
    this.setData({
      bookName: e.detail.value
    })
  },
  bindBookAuthorInput: function(e) {
    this.setData({
      bookAuthor: e.detail.value
    })
  },
  bindBookPressInput: function(e) {
    this.setData({
      bookPress: e.detail.value
    })
  },

  bindNeedCourse: function(e) {
    this.setData({
      isTextbook: e.detail.value
    })
  },

  bindConditionChange: function(e) { //
    console.log(e.detail);
    this.setData({
      conditionIndex: e.detail.value
    })
  },

  bindCampusChange: function(e) {
    this.setData({
      campusIndex: e.detail.value
    })
  },

  bindCurrentPriceInput: function(e) {
    this.setData({
      currentPrice: e.detail.value
    })
  },

  bindPostRemarkInput: function(e) {
    this.setData({
      postRemark: e.detail.value
    })
  },
  bindBookImageInput: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        // console.log()
        var bookImg1 = res.tempFilePaths;
        console.log(bookImg1);
        that.setData({
          bookImg: bookImg1
        })
      },

    })
  },
  bindSubmitBook: function() {
    var that = this;
    var studentId = that.data.studentId;
    if (!studentId) {
      wx.showModal({
        title: '提示',
        content: '请验证您的学生身份',
        success: function(res) {
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
    } else {
      that.setData({
        buttonLoading: true
      })
      var bookName1 = that.data.bookName;
      var bookAuthor1 = that.data.bookAuthor;
      var bookPress1 = that.data.bookPress;
      var isTextbook1 = that.data.isTextbook;
      var conditionIndex = that.data.conditionIndex;
      var conditions0 = that.data.conditions[conditionIndex];
      var campusIndex = that.data.campusIndex;
      var campus0 = that.data.campus[campusIndex];
      var currentPrice1 = that.data.currentPrice;
      var postRemark1 = that.data.postRemark || '无备注或描述';
      var bookImg1 = that.data.bookImg;
      var studentId = that.data.studentId;
      var nickNmae = that.data.nickName;
      var bookPhoneNumber = that.data.bookPhoneNumber;
      var url = app.globalData.huanbaoBase + 'bookpost.php';
      var urlImg = app.globalData.huanbaoBase + 'bookimg.php';
      wx.request({
        url,
        data: {
          bookName: bookName1, //书名
          bookAuthor: bookAuthor1, //作者
          bookPress: bookPress1, //出本社
          isTextbook: isTextbook1, //是否资料
          conditions: conditions0, //成色   
          campus: campus0, //校区
          currentPrice: currentPrice1, //售价
          postRemark: postRemark1, // 备注
          studentId: studentId, //用户的学号
          nickName: nickNmae, //用户昵称
          bookPhoneNumber: bookPhoneNumber, //用户电话
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res);//此处控制台打印出来是乱码
          console.log(url);//此处控制台打印正确URL
          console.log(urlImg);//此处控制台打印正确URL
          var currenttime = util.formatTime(new Date());
          var currentdate = util.formatDate(new Date());
          var bookId = res.data;
          wx.uploadFile({
            url: urlImg,
            filePath: bookImg1[0],
            name: 'file',
            formData: {
              'date': currentdate,
              'datetime': currenttime,
              'bookId': bookId
            },
            success: function(res) {
              console.log(res);
              wx.showToast({
                title: '发布成功',
                icon: 'succes',
                duration: 2500,
                mask: true
              })
              that.setData({
                buttonLoading: false,
                bookName: '', //书名
                bookAuthor: '', //作者
                bookPress: '', //出本社
                isTextbook: false, //是否资料
                currentPrice: '', //售价
                postRemark: '', // 备注
                bookImg: '',   //图片
                bookPhoneNumber: '', //电话号码
              })
            },
            fail: function(res) {
              console.log(JSON.stringify(res));
              wx.showToast({
                title: '发布失败',
                icon: 'loading',
                duration: 2000
              })
              that.setData({
                buttonLoading: false
              })
            },
          })
        },
        fail: function(res) {
          console.log(JSON.stringify(res));
          wx.showToast({
            title: '发布失败',
            icon: 'loading',
            duration: 2000
          })
          that.setData({
            buttonLoading: false
          })
        },
      })
    }

  },
  //发布物品的响应事件
  bindSubmitThing: function() {
    var that = this;
    var studentId = that.data.studentId;
    if (!studentId) {
      wx.showModal({
        title: '提示',
        content: '请验证您的学生身份',
        success: function(res) {
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
    } else {
      this.setData({
        buttonLoadingThing: true
      })
      var thingImage = that.data.thingImage; //图片
      var thingName = that.data.thingName; //名字
      var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
      var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
      var thingCampusIndex = that.data.thingCampusIndex; //校区索引值
      var thingCampus = that.data.thingCampus[thingCampusIndex]; //校区
      var thingDescribe = that.data.thingDescribe || '无备注或描述'; //备注
      var thingPhoneNumber = that.data.thingPhoneNumber; //电话
      var thingPrice = that.data.thingPrice; //价格
      var studentId = that.data.studentId;
      var nickName = that.data.nickName;
      var url = app.globalData.huanbaoBase + 'thingpost.php';
      var urlImg = app.globalData.huanbaoBase + 'thingimg.php';
      wx.request({
        url,
        data: {
          thingImage: thingImage,
          thingName: thingName,
          thingConditions: thingConditions,
          thingCampus: thingCampus,
          thingDescribe: thingDescribe,
          thingPhoneNumber: thingPhoneNumber,
          thingPrice: thingPrice,
          studentId: studentId,
          nickName: nickName,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res);
          var currenttime = util.formatTime(new Date());
          var currentdate = util.formatDate(new Date());
          var thingId = res.data;
          const uploadTask = wx.uploadFile({
            url: urlImg,
            filePath: thingImage[0],
            name: 'file',
            formData: {
              'date': currentdate,
              'datetime': currenttime,
              'thingId': thingId,
            },
            success: function(res) {
              console.log(res.data);
              wx.showToast({
                title: '发布成功',
                icon: 'succes',
                duration: 2500,
                mask: true
              })
              that.setData({
                buttonLoadingThing: false,
                thingImage: '',
                thingName: '',
                thingDescribe: '',
                thingPrice: '',
                thingPhoneNumber: '',//电话号码
              })
            },
            fail: function(res) {
              console.log(JSON.stringify(res));
              wx.showToast({
                title: '发布失败',
                icon: 'loading',
                duration: 2000
              })
              that.setData({
                buttonLoadingThing: false
              })
            },
          })
        },
        fail: function(res) {
          console.log(JSON.stringify(res));
          wx.showToast({
            title: '发布失败',
            icon: 'loading',
            duration: 2000
          })
          that.setData({
            buttonLoadingThing: false
          })
        },
      })
    }
  },




  //发布兼职的响应事件
  bindSubmitJob: function() {
    var that = this;
    var studentId = that.data.studentId;
    if (!studentId) {
      wx.showModal({
        title: '提示',
        content: '请验证您的学生身份',
        success: function(res) {
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
    } else {
      this.setData({
        buttonLoadingJob: true
      })
      var jobName = that.data.jobName; //工作名称
      var jobDescribe = that.data.jobDescribe; //职位描述
      var jobWay = that.data.jobWay; //联系电话
      var jobSalary = that.data.jobSalary; //资薪福利
      var jobPlace = that.data.jobPlace; //工作地点
      var jobTime = that.data.jobTime; //工作时间
      var jobRequir = that.data.jobRequir; //人员要求
      var studentId = that.data.studentId;
      var nickName = that.data.nickName;
      var url = app.globalData.huanbaoBase + 'jobpost.php'
      wx.request({
        url,
        data: {
          jobName: jobName,
          jobRequir: jobRequir,
          jobTime: jobTime,
          jobDescribe: jobDescribe,
          jobWay: jobWay,
          jobSalary: jobSalary,
          jobPlace: jobPlace,
          studentId: studentId,
          nickName: nickName,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function(res) {
          console.log(res);
          wx.showToast({
            title: '发布成功',
            icon: 'succes',
            duration: 2500,
            mask: true
          })
          that.setData({
            buttonLoadingJob: false,
            jobName: '',
            jobRequir: '',
            jobTime: '',
            jobDescribe: '',
            jobWay: '',
            jobSalary: '',
            jobPlace: '',  
          })
        },
        fail: function(res) {
          console.log(JSON.stringify(res));
          wx.showToast({
            title: '发布失败',
            icon: 'loading',
            duration: 2000
          })
          that.setData({
            buttonLoadingJob: false
          })
        },
      })
    }
  }

})