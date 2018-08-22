var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [],
    originalData;
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        school: '',
        rgcData: {}
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
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
            var school = '11';
            originalData = data.originalData;
            wxMarkerData = data.wxMarkerData;
            that.setData({
        // markers是一个在data中定义的数据，用来存储百度地图获取的数据
                markers: wxMarkerData
            });
            that.setData({
              // 经度
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
              // 纬度
                longitude: wxMarkerData[0].longitude
            });
            that.setData({
              // 获取当前位置的大学名称
              school: originalData.result.poiRegions[0].name,   
            });
          
        }
        BMap.regeocoding({
            "query": '湖北',//在湖北地区进行搜索
            fail: fail,
            success: success,
            iconPath: '../../images/map/marker_red.png',
            iconTapPath: '../../images/map/marker_red.png'
        });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        that.setData({
            rgcData: {
                address: '地址：' + data[i].address + '\n',
                desc: '描述：' + data[i].desc + '\n',
                business: '商圈：' + data[i].business
            }
        });
    }

})