var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
var searchData = {};
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {}
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
          ak: 'zuwiVmIUj822mmW6psamM888QLz8Q5wF'
        });
        var fail = function(data) {
            console.log(data)
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
        }
        BMap.search({
            "query": '大学学院',
            fail: fail,
            success: success,
            iconPath: '../../images/map/marker_red.png',
            iconTapPath: '../../images/map/marker_red.png'
        });
     
    },
    onReady: function(){
      // 当页面首次渲染完成后触发的函数
      var that = this;
      searchData = that.data;
      console.log(searchData);
    },
    showSearchInfo: function(data, i) {
      console.log(data)
        var that = this;
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
