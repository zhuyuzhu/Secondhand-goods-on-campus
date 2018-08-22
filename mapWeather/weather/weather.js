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
            
          console.log(weather_data);
            weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n';
            that.setData({
                weatherData: weatherData,
                weather_data: weather_data
            });
          if (hover > 6 && hover < 18) {
            console.log(hover);
            console.log(that.data.weather_data[0].dayPictureUrl);
            that.setData({
              weatherUrl: that.data.weather_data[0].dayPictureUrl
            })
          } else {
            console.log(hover);
            that.setData({
              weatherUrl: that.data.weather_data[0].nightPictureUrl
            })
          }

        }
        BMap.weather({
            fail: fail,
            success: success
        });
      
    
    },
    onReady: function(){
      

    }

})

