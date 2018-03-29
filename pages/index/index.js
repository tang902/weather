// 获取全局对象
var app = getApp();

// Page 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    city:''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  loadInfo(){
    var _this=this;
    wx.getLocation({
      type: 'gcj02', 
      altitude:true,
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        _this.getCity(latitude,longitude)
      }
    })
  },
  getCity(latitude, longitude){
    var _this=this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?output=json&location=' + latitude + ',' + longitude+'&ak=76bc45ebaecc7fbfc7c7bf0273f8a4ff', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        city=city.replace('市','');
        _this.setData({
          city:city
        });
        _this.getWeater(city);
      }
    })
  },
  getWeater(city){
    var _this=this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city='+city,
      header:{
        'content-type':'application/josn'
      },
      success(res){
        var forecast = res.data.data.forecast;
        var todayInfo = forecast.shift();
        var today=res.data.data;
        today.todayInfo=todayInfo;
        _this.setData({
          today:today,
          forecast:forecast
        });
        console.log(today)
      }
    })
  }
})