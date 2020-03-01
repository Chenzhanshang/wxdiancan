/*----------------------------------------------------------------
    
    文件名：my.js
    文件功能描述：我的
        
----------------------------------------------------------------*/
var util = require('../../util/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    orderList: [],
    yincangXiaofeiJilu: true,
    yincangChongzhi: true,
    yincangHuiyuanLeibie: true,
    yincangShouquan: true, //隐藏用户授权
    chongzhiLeixingId: 0,  // 选择要充值的栏位
    chongzhizengsongItems: [{ name: "冲100送10", value: 1, checked: true },
      { name: "冲300送50", value: 2 ,checked: false},
      { name: "冲600送150", value: 3, checked: false},
      { name: "冲0.2送1", value: 4, checked: false }] ,
    huiyuanleibieId: 0,  // 选择要充值的栏位
    huiyuanleibieItems: [{ name: "一级会员(< ￥ 100)  99折", value: 1 },
    { name: "二级会员(< ￥ 500)  95折", value: 2 },
    { name: "三级会员(<￥3000)  90折", value: 3 }
    ],
    yincangZhuce: true, //隐藏注册窗体
    aFendian: {}, //分店对象
    hasLogin:false
  },
  //获取用户信息
  refreshDate: function (event) {
    userInfo: app.globalData.userInfo
  },
  //加菜
  jiaCai: function (event) {
    var that = this
    let data = event.currentTarget.dataset
    console.log('app.globalData.userInfo', app.globalData.userInfo)
    app.globalData.moshi = '（加菜）'
    app.globalData.jiacaiDingdanno = data.id
    wx.switchTab({
      url: '/page/diancan/index'
    })
  },

//取消订单
  quxiaodingdan: function(event){
    var that = this;
    var data = event.currentTarget.dataset
    wx.showModal({
      title: '警告',
      content: '是否取消该订单？',
      success: function (res) {
        if (res.confirm) {
          for (let i = 0; i < that.data.orderList.length; i++) {
            if (that.data.orderList[i].dingdanno == data.id) {
              that.data.orderList.splice(i, 1)
              break
            }
          }
          console.log(that.data.orderList)
          wx.removeStorageSync('orderList')
          wx.setStorage({
            key: 'orderList',
            data: that.data.orderList,
          })
          wx.showToast({
            title: '取消成功', success: res => {
              //用onLoad周期方法重新加载，实现当前页面的刷新
              that.onShow()
            }
          })
        }
      }
    })
    
  },
  //显示注册会员
  zhucehuiyuan:function(){
    this.showZhuce()
  },
  //付款
  fukuan: function (event){
    util.showFailModal('提示', '暂未开通网上支付');
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: app.globalData.aFendian.fendianmingcheng + '-' + '下单记录'
    });
    
  },
  //下拉刷新方法
  onPullDownRefresh() {
    this.refreshDate();
  },
  onShow: function () {
    console.log('aFendian:', app.globalData.aFendian)
    this.setData({
      userInfo: app.globalData.userInfo,
      aFendian: app.globalData.aFendian,
      hasLogin: app.globalData.hasLogin
    });
    this.refreshDate();
    var that = this
    if (app.globalData.hasLogin == true){
      wx.getStorage({
        key: 'orderList',
        success: function (res) {
          console.log('获取订单成功')
          console.log(res.data)
          that.setData({ orderList: res.data })
        },
        fail: function (res) {
          console.log('获取订单失败')
        },
        complete: function (res) { },
      })
    }
    
  },
  //隐藏消费记录
  hideXiaofeiJilu: function () {
    this.setData({
      yincangXiaofeiJilu: true
    });
  },
  //显示消费记录
  showXiaofeiJilu: function () {
    this.setData({
      yincangXiaofeiJilu: false
    });
  },
  //隐藏充值
  hideChongzhi: function () {
    this.setData({
      yincangChongzhi: true
    });
  },
  //显示充值
  showChongzhi: function () {
    this.setData({
      yincangChongzhi: false
    });
  },
  //隐藏会员列表
  hideHuiyuanLeibie: function () {
    this.setData({
      yincangHuiyuanLeibie: true
    });
  },
  //显示会员列表
  showHuiyuanLeibie: function () {
    this.setData({
      yincangHuiyuanLeibie: false
    });
  },
  //隐藏注册
  hideZhuce: function () {
    this.setData({
      yincangZhuce: true
    });
  },
  //显示注册
  showZhuce: function () {
    this.setData({
      yincangZhuce: false
    });
  },
  //充值单选框控制
  radioChange: function (e) {
    var radioItems = this.data.chongzhizengsongItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
      if (radioItems[i].checked)
        this.setData({
          chongzhiLeixingId: radioItems[i].value
        });
    }
    this.setData({
      chongzhizengsongItems: radioItems
    });
  },
  //充值
  chongzhi: function () {
    var that = this
    if (!app.globalData.aFendian.zhifu) {
      util.showFailModal('提示', '本店未开通支付功能。')
      return;
    }
    //开通支付，必须允许授权
    if (app.globalData.hasLogin == false || !app.globalData.userInfo.openId) {
      util.showFailModal('提示', '根据微信要求，订单支付时，本系统需要获得用户授权许可。请点击登录，并允许授权，谢谢配合。')
      return;
    }
    if (this.data.chongzhiLeixingId == 0) {
      util.showFailModal('提示', '未找到充值类型，请退出后重试。')
      return;
    }
  },
  //获取活动红包
  getPhoneNumber: function (e) {
    var that = this
    if (!e.detail.encryptedData) return
    wx.showModal({
      title: '提示',
      content: '测试功能',
      showCancel: false,
      complete: function (res) {
        that.hideZhuce()
        that.refreshDate();
      }
    })
  },

  //授权登录点击事件
  bindGetUserInfo: function (e) {
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.hasLogin = true
    console.log(app.globalData.hasLogin)

    //登录成功最后，返回首页的页面
    wx.switchTab({
      url: '/page/shop/shop',
    })
  },
})
