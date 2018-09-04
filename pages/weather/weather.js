var bmap = require('../../utils/bmap-wx.min.js');
var timestamp = Date.parse(new Date());
var hover = new Date(timestamp).getHours();
Page({
    data: {
        weatherData: '',
        weather_data: [],
        weatherUrl : ''
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
          ak: 'zuwiVmIUj822mmW6psamM888QLz8Q5wF'
        });
        var fail = function(data) {
            console.log('fail!!!!')
        };
        var success = function(data) {
            
            var weatherData = data.currentWeather[0];
            var weather_data = data.originalData.results[0].weather_data;
            
          
            weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n';
            that.setData({
                weatherData: weatherData,
                weather_data: weather_data
            });
          if (hover > 6 && hover < 18) {
            
            console.log(that.data.weather_data[0].dayPictureUrl);
            that.setData({
              weatherUrl: that.data.weather_data[0].dayPictureUrl
            })
          } else {
            that.setData({
              weatherUrl: that.data.weather_data[0].nightPictureUrl
            })
          }
          //当data数据中的weatherUrl成功的获取值后，再缓存
          wx.setStorage({
            key: 'weatherUrl',
            data: that.weatherUrl,
          })
          wx.setStorage({
            key: 'weather_data',
            data: weather_data,
          })
        }
        BMap.weather({
            fail: fail,
            success: success
        });
      
    
    },
    onReady: function(){
      

    },
    onPullDownRefresh(){
      wx.setNavigationBarTitle({
        title: '当地天气'
      });
      wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      setTimeout(function () {
        wx.stopPullDownRefresh(); //停止加载
        wx.hideNavigationBarLoading(); //隐藏加载icon
      }, 2000)
    }

})

