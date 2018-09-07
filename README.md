# 校园二手交易微信小程序
校园二手交易微信小程序实现的功能：定位大学，当地天气，轮播图，推荐列表，购物车，发布功能，订单，身份验证等
## 首页
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/homePage.jpg" width="300" alt="首页"/>

#### 定位
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/location.jpg" width="300" alt="定位"/>

#### 天气
天气功能调用的是百度的接口，，，

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/weather.jpg" width="300" alt="天气"/>


#### 轮播图
轮播图直接用微信小程序的组件，&lt;swiper&gt;设置轮播图属性——> &lt;block&gt;循环遍历每一项——> &lt;swiper-item&gt;轮播每一项——> &lt;image&gt;每一项的图片

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper.jpg" width="300" alt="轮播图js"/>
下面是代码截图：

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper1.jpg" width="900" alt="轮播图wxml"/>
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper2.jpg" width="300" alt="轮播图js"/>

#### 搜索框
首页的所搜框用的是一张图片，当然这样的搜索框，微信小程序是有组件的,
[微信小程序的icon组件](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html)
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/search.jpg" width="300" alt="搜索框图片"/>

#### 滚动条
我采用引入模板的方式，将这个功能写好后，引入到首页，同样用的&lt;swiper&gt;标签。![详情]()

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper-y.jpg" width="300" alt="校园头条"/>
下面是代码截图：

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper-y1.jpg" width="800" alt="校园头条wxml"/>


#### 四个分类功能
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/classify.jpg" width="300" alt="四个分类"/>

#### 今日推荐
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/recommend.jpg" width="300" alt="今日推荐"/>

## 购物车
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/shoppingCart.jpg" width="300" alt="购物车"/>

## 发布
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/release.jpg" width="300" alt="发布功能"/>

## 订单
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/order.jpg" width="300" alt="订单管理"/>

## 我的
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/my.jpg" width="300" alt="个人信息"/>

## 身份验证
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/identityVerify.jpg" width="300" alt="身份验证"/>

