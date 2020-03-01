/*----------------------------------------------------------------

    文件名：shop.js
    文件功能描述：点餐首页
        
----------------------------------------------------------------*/

var imageUtil = require('../../util/autoheight.js')
var util = require('../../util/util.js')
var app = getApp()
Page({
  data: {
    kaishishijian: '10:00',
    jieshushijian: '17:00',
    //分店对象
    aFendian: {},
  },

  onLoad: function (params) {
    wx.setNavigationBarTitle({
      title: '欢迎光临：' + app.globalData.aFendian.fendianmingcheng
    });
  },
  //点击电话
  makeCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.aFendian.dianhua
    })
  },
  //点击定位
  openLocation: function () {
    wx.openLocation({
      latitude: app.globalData.aFendian.lat,
      longitude: app.globalData.aFendian.lng,
      scale: 28
    })
  },
  
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //拿到当前店铺信息
    this.setData({
      aFendian:app.globalData.aFendian
    })
    // 页面显示，判断是否登录
    if (!app.globalData.hasLogin) {
      wx.login({
        success: function (loginResult) {

          wx.getUserInfo({
            success: function (userResult) {
              console.log('userResult:', userResult)
              app.globalData.hasLogin = true;
              userResult.userInfo.code = loginResult.code;
              app.globalData.userInfo = userResult.userInfo;
            },
            fail: function (userError) {
              //获取用户信息失败后。请跳转授权页面
              //解决wx.getUserInfo弃用，不能弹出授权窗口问题
              wx.showModal({
                title: '警告',
                content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.switchTab({
                      url: '/page/my/my',
                    })
                  }
                }
              })
            },
          });
        },
        fail: function (loginError) {

          util.hideBusy();
          app.globalData.hasLogin = false;
          util.showFailModal('微信登陆失败，原因可能是首次登陆本门店，请关闭程序后重新扫描登陆。', loginError);
        },
        complete: function () {
        }
      });
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})