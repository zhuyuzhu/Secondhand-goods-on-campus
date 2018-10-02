# 校园二手交易微信小程序
校园二手交易微信小程序实现的功能：定位大学，当地天气，轮播图，推荐列表，购物车，发布功能，订单，身份验证等。
**以下对每一项进行了简单的阐述，“详情”则是对每一项内容具体的描述。**
## 首页
首页实现了一些简单的功能，而且界面的设计也不是美观，设计的比较粗糙，后续会完善的功能是：用户下滑加载更多的内容，内容也会更加丰富。

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/homePage.jpg" width="300" alt="首页"/>

#### 定位
定位功能调用的是百度的接口，本来是想腾讯地图的，但是自己在使用的过程中，出现了一些错误（后续会完善腾讯地图的使用），导致调用接口失败了，然后才用的[百度地图web端的api](http://lbsyun.baidu.com/index.php?title=jspopular)，而且官方给了代码实例，我们稍作修改即可使用。 [定位详情](https://blog.csdn.net/zyz00000000/article/details/82531397)
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/location.jpg" width="300" alt="定位"/>

#### 天气
天气功能调用的是百度的接口，在百度地图官网给的代码实例里面除了位置功能，还有当地天气的数据，可以直接拿来使用。[天气详情](https://blog.csdn.net/zyz00000000/article/details/82531397)

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/weather.jpg" width="300" alt="天气"/>


#### 轮播图
轮播图直接用微信小程序的组件，&lt;swiper&gt;设置轮播图属性——> &lt;block&gt;循环遍历每一项——> &lt;swiper-item&gt;轮播每一项——> &lt;image&gt;每一项的图片。[详情](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper.jpg" width="300" alt="轮播效果图"/>
下面是代码截图：

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper1.jpg" width="900" alt="轮播图wxml"/>
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper2.jpg" width="300" alt="轮播图js"/>

#### 搜索框
首页的所搜框用的是一张图片，当然这样的搜索框，微信小程序是有组件的,
[微信小程序的icon组件](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html)
<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/search-book.jpg" width="300" alt="搜索框图片"/>

#### 滚动条
我采用引入模板的方式，将这个功能写好后，引入到首页，同样用的&lt;swiper&gt;标签。[详情](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper-y.jpg" width="300" alt="校园头条"/>
下面是代码截图：

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/swiper-y1.jpg" width="800" alt="校园头条wxml"/>


#### 四个分类功能
分类功能实现的也比较简单，没有什么技术性的东西，或许wxss样式对你有所帮助。

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/classify.jpg" width="300" alt="四个分类"/>

#### 今日推荐
今日推荐功能使用了[微信小程序的scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)，要注意的是，推荐好书和推荐好物在同一个页面，那么当点击“更多”的时候，要跳转到相应内容上。

<img src="https://raw.githubusercontent.com/zhuyuzhu/images/master/pictures/recommend.jpg" width="300" alt="今日推荐"/>

## 购物车
购物车的实现也较为简单，将用户id和商品id传给后端，后端才能把对应的数据给前端。[详情](https://blog.csdn.net/zyz00000000/article/details/82532998)

<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/shoppingCart.jpg" width="300" alt="购物车"/>

## 发布
发布功能，注意一点，必填的内容都填了“发布”按钮才可以点击


<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/release.jpg" width="300" alt="发布功能"/>

## 订单
订单功能，请求数据，展示数据，没什么难度

<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/order.jpg" width="300" alt="订单管理"/>

## 我的
样式，每一项后面有的" > "是如何实现的呢？
通过伪元素，transform: matrix()实现>的效果。

<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/1.png" width="300" alt="样式"/>
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/2.jpg" width="600" alt="代码"/>

<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/my.jpg" width="300" alt="个人信息"/>

## 身份验证
#### 因为需要学校的学生身份才可以使用小程序的功能，这里给出一个测试的账号和密码
#### 账号：20151621029 密码：666666
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/identityVerify.jpg" width="300" alt="身份验证"/>

### 校园兼职
#### 用户可以通过小程序，发布兼职信息，发布的兼职信息会在“首页——校园兼职”中，可以在兼职列表中查看兼职的详情

<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/partTimeJob.jpg" width="300" alt="身份验证"/>

#### 当点击“家教老师”这则兼职的时候，会跳转到相应的详情页面
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/parTimeJobDetail.jpg" width="300" alt="身份验证"/>

### 商品详细
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/goodsDetail.jpg" width="300" alt="身份验证"/>

#### 预约购买
<img src="https://github.com/zhuyuzhu/images/blob/master/pictures/buyGoods.jpg" width="300" alt="身份验证"/>
