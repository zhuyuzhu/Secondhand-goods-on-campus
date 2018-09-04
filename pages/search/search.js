//搜索的附近的大学
var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
var searchData = {};
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    schoolPlace: ''
  },
  makertap: function(e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onPullDownRefresh: function(){
    wx.setNavigationBarTitle({
      title: '我的大学'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
  },
  onLoad: function() {
    
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'zuwiVmIUj822mmW6psamM888QLz8Q5wF'
    });
    var fail = function(data) {
      
        wx.showModal({
          title: '提示',
          content: '位置未开启或附近没有大学',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
     
    };
    var success = function(data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      console.log(wxMarkerData[0].longitude, wxMarkerData[0].latitude)

    }
    BMap.search({
      //检索信息
      "query": '大学学院',
      fail: fail,
      success: success,
      iconPath: '../../images/map/marker_red.png',
      iconTapPath: '../../images/map/marker_red.png'
    });
  },
  onReady: function() {
    // 当页面首次渲染完成后触发的函数
    var that = this;
    searchData = that.data;
  },
  showSearchInfo: function(data, i) {
    var that = this;
    wx.showModal({
      title: '选择大学',
      content: '您要选择此处吗？',
      success: function(res) {
        wx.setStorage({
          key: 'schoolPlace',
          data: data[i].title,
        })
        if (res.confirm) {

          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {

        }

      },

    })


    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor: function(data, id) {
    var that = this;
    var markersTemp = [];
    for (var i = 0; i < data.length; i++) {
      if (i === id) {
        data[i].iconPath = "../../images/map/marker_yellow.png";
      } else {
        data[i].iconPath = "../../images/map/marker_red.png";
      }
      markersTemp[i] = data[i];
    }
    that.setData({
      markers: markersTemp
    });
  },

})