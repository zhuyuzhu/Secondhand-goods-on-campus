// pages/shoppingCart/shoppingCart.js
const orginalPrice = 0; //由于0.00在赋值时是0，用toFixed()取余
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: orginalPrice.toFixed(2), // 总价，初始为0
    selectAllStatus: false // 全选状态，默认全选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      hasList: true, // 既然有数据了，那设为true吧
      carts: [{
          id: 1,
        title: '高等数学上册',
        author:'同济大学数学系',
        press: '高等数学出版社',
        image: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=3c31754f7aec54e755e1124cd851f035/43a7d933c895d143b0451c5272f082025aaf078b.jpg',
          num: 1,
          price: 12.0,
          selected: false
        },
        {
          id: 2,
          title: '病理学',
          author: '李玉林',
          press: '人民卫生出版社',
          image: 'http://img13.360buyimg.com/n1/jfs/t184/282/2083833712/166824/f446eb27/53c4ea5eNb27b427e.jpg',
          num: 1,
          price: 27.0,
          selected: false
        },
        {
          id: 3,
          title: '大学体育与健康教程',
          author: '梁平',
          press: '中国电力出版社',
          image: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=b240020279899e51788e3d127a9cbe0e/902397dda144ad34de385678d2a20cf430ad854e.jpg',
          num: 1,
          price: 5.0,
          selected: false
        },
        {
          id: 4,
          title: '新编大学英语教材',
          author: '韩红梅',
          press: '经济科学出版社',
          image: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=80207c61afc27d1ea5263cc223eeca53/c8ea15ce36d3d539e21fc1063187e950342ab0d1.jpg',
          num: 1,
          price: 8.0,
          selected: false
        }
      ]
    });
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

  },
  //计量总价
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0.00;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total +=  carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2) //保留小数后面2两位
    });
  },
  //选择事件
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let that = this;
    let selectAllStatus = this.data.selectAllStatus; //是否已经全选
   let str = true;  //用str与每一项进行状态判断
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
    for (var i = 0; i < carts.length; i++) {
      str = str && carts[i].selected;           //用str与每一项进行状态判断
    }
    console.log(str);
    if (str === true) {
      that.setData({
        selectAllStatus : true
      })
    }else {
      that.setData({
        selectAllStatus: false
      })
    }
  },
  //全选事件
  selectAll(e) {
    var that = this;
    let selectAllStatus = that.data.selectAllStatus;    // 是否全选状态
    
    let carts = that.data.carts;
   
    selectAllStatus = !selectAllStatus;
  

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    that.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    that.getTotalPrice();                               // 重新获取总价
    if (carts.length === 0){ //当没有物品时，不能再点“全选”
      wx.showModal({
        title: '提示',
        content: '购物车空空如也~',
        success: function (res) {   //模糊层成功出来后
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              selectAllStatus: false
            })
          } else {
            console.log('用户点击取消')
            that.setData({
              selectAllStatus: false
            })
          }
        },
       
      })
    
    }
  },

  //删除商品
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    var selectAllStatus  = this.data.selectAllStatus 
    let carts = this.data.carts;
    let totalPrice = this.data.totalPrice;
    carts.splice(index, 1);              // 删除购物车列表里这个商品
    this.setData({
      carts: carts
    });
    if (carts.length == 0) {                  // 如果购物车为空
      this.setData({
        hasList: false,             // 修改标识为false，显示购物车为空页面
        selectAllStatus: false,
        totalPrice: orginalPrice.toFixed(2)              //此时价格为0
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
    }
  }
})