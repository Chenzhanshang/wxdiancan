/*----------------------------------------------------------------
  
    文件名：app.js
    文件功能描述：全局js
    
----------------------------------------------------------------*/
var util = require('./util/util.js')

App({
  globalData: {
    hasLogin: false,
    userInfo: {},
    zhuoziid: '262',
    menus: [
      {id:'1', tag: 'm1', fenleimingcheng: '特色菜', sum: null, dishs: [
        { id: '1', count: 0, caiming: '宫保鸡丁', xiaoshoujia: 18, huiyuanjia: 16, danwei: '份', url: '/page/resources/images/宫保鸡丁.jpg', tuijianzhishu:3},
        { id: '2', count: 0, caiming: '腐竹肉片', xiaoshoujia: 18, huiyuanjia: 15, danwei: '份', url: '/page/resources/images/腐竹肉片.jpg', tuijianzhishu: 4 },
        { id: '3', count: 0, caiming: '牛肉青椒', xiaoshoujia: 16, huiyuanjia: 14, danwei: '份', url: '/page/resources/images/牛肉青椒.jpg', tuijianzhishu: 3},
        { id: '4', count: 0, caiming: '糖醋里脊', xiaoshoujia: 20, huiyuanjia: 20, danwei: '份', url: '/page/resources/images/糖醋里脊.jpg', tuijianzhishu: 0 },
        { id: '5', count: 0, caiming: '酸菜鱼', xiaoshoujia: 20, huiyuanjia: 20, danwei: '份', url: '/page/resources/images/酸菜鱼.jpg', tuijianzhishu: 5 },
        { id: '6', count: 0, caiming: '黄焖鸡', xiaoshoujia: 13, huiyuanjia: 13, danwei: '份', url: '/page/resources/images/黄焖鸡.jpg', tuijianzhishu: 5 },
        { id: '7', count: 0, caiming: '香菇滑鸡', xiaoshoujia: 18, huiyuanjia: 18, danwei: '份', url: '/page/resources/images/香菇滑鸡.jpg', tuijianzhishu: 4 },
        { id: '12', count: 0, caiming: '红烧肉', xiaoshoujia: 17, huiyuanjia: 17, danwei: '份', url: '/page/resources/images/红烧肉.jpg', tuijianzhishu: 4 },
        { id: '13', count: 0, caiming: '番茄炒蛋', xiaoshoujia: 11, huiyuanjia: 11, danwei: '份', url: '/page/resources/images/番茄炒蛋.jpg', tuijianzhishu: 0 },
        { id: '8', count: 0, caiming: '耗油娃娃菜', xiaoshoujia: 8, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/耗油娃娃菜.jpg', tuijianzhishu: 5 },
        { id: '9', count: 0, caiming: '干煸四季豆', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/干煸四季豆.jpg', tuijianzhishu: 3 },
        { id: '10', count: 0, caiming: '耗油菜心', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/耗油菜心.jpg', tuijianzhishu: 4 },
        { id: '11', count: 0, caiming: '酸辣土豆丝', xiaoshoujia: 5, huiyuanjia: 5, danwei: '份', url: '/page/resources/images/酸辣土豆丝.jpg', tuijianzhishu: 2 }],
        
      },
      {
        id: '2', tag: 'm2', fenleimingcheng: '粉类', sum: null ,
        dishs: [
          { id: '1', count: 0, caiming: '蛋炒粉', xiaoshoujia: 12, huiyuanjia: 10, danwei: '碗', url: '/page/resources/images/蛋炒粉.jpg', tuijianzhishu: 0 },
          { id: '2', count: 0, caiming: '螺蛳粉', xiaoshoujia: 10, huiyuanjia: 8, danwei: '碗', url: '/page/resources/images/螺蛳粉.jpg', tuijianzhishu: 5},
          { id: '3', count: 0, caiming: '花甲粉', xiaoshoujia: 15, huiyuanjia: 13, danwei: '碗', url: '/page/resources/images/花甲粉.jpg', tuijianzhishu: 4},
          { id: '4', count: 0, caiming: '炸酱面', xiaoshoujia: 20, huiyuanjia: 18, danwei: '碗', url: '/page/resources/images/炸酱面.jpg', tuijianzhishu: 0 },
          { id: '5', count: 0, caiming: '桂林米粉', xiaoshoujia: 10, huiyuanjia: 10, danwei: '碗', url: '/page/resources/images/桂林米粉.jpg', tuijianzhishu: 2 },
          { id: '6', count: 0, caiming: '牛腩粉', xiaoshoujia: 11, huiyuanjia: 11, danwei: '碗', url: '/page/resources/images/牛腩粉.jpg', tuijianzhishu: 0 }]},
      {
        id: '3', tag: 'm3', fenleimingcheng: '粥类', sum: null, dishs: [
          { id: '1', count: 0, caiming: '海鲜粥', xiaoshoujia: 20, huiyuanjia: 18, danwei: '份', url: '/page/resources/images/海鲜粥.jpg', tuijianzhishu: 3},
          { id: '2', count: 0, caiming: '皮蛋瘦肉粥', xiaoshoujia: 12, huiyuanjia: 11, danwei: '份', url: '/page/resources/images/皮蛋瘦肉粥.jpg', tuijianzhishu: 5 },
          { id: '3', count: 0, caiming: '红豆粥', xiaoshoujia: 6, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/红豆粥.jpg', tuijianzhishu: 2 },
          { id: '4', count: 0, caiming: '绿豆粥', xiaoshoujia: 6, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/绿豆粥.jpg', tuijianzhishu: 0 }] },
      {
        id: '4', tag: 'm4', fenleimingcheng: '点心小吃', sum: null, dishs: [
          { id: '1', count: 0, caiming: '南瓜饼', xiaoshoujia: 8, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/南瓜饼.jpg', tuijianzhishu: 0 },
          { id: '2', count: 0, caiming: '油炸土豆球', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/油炸土豆球.jpg', tuijianzhishu: 0 },
          { id: '3', count: 0, caiming: '蒸饺', xiaoshoujia: 6, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/蒸饺.jpg', tuijianzhishu: 0},
          { id: '4', count: 0, caiming: '香脆鸡米花', xiaoshoujia: 10, huiyuanjia: 10, danwei: '份', url: '/page/resources/images/香脆鸡米花.jpg', tuijianzhishu: 0 },
          { id: '5', count: 0, caiming: '炸土豆条', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/炸土豆条.jpg', tuijianzhishu: 0 }]
      },
      {
        id: '5', tag: 'm5', fenleimingcheng: '饮品', sum: null, dishs: [
          { id: '1', count: 0, caiming: '百香果汁', xiaoshoujia: 10, huiyuanjia: 8, danwei: '杯', url: '/page/resources/images/百香果汁.jpg', tuijianzhishu: 3 },
          { id: '2', count: 0, caiming: '可乐', xiaoshoujia: 5, huiyuanjia: 5, danwei: '杯', url: '/page/resources/images/可乐.jpg', tuijianzhishu: 4 },
          { id: '3', count: 0, caiming: '柠檬水', xiaoshoujia: 7, huiyuanjia: 6, danwei: '杯', url: '/page/resources/images/柠檬水.jpg', tuijianzhishu: 5},
          { id: '4', count: 0, caiming: '西瓜汁', xiaoshoujia: 6, huiyuanjia: 6, danwei: '杯', url: '/page/resources/images/西瓜汁.jpg', tuijianzhishu: 5},
          { id: '5', count: 0, caiming: '西米露奶茶', xiaoshoujia: 8, huiyuanjia: 8, danwei: '杯', url: '/page/resources/images/西米露奶茶.jpg', tuijianzhishu: 4 },
          { id: '6', count: 0, caiming: '原味奶茶', xiaoshoujia: 6, huiyuanjia: 6, danwei: '杯', url: '/page/resources/images/原味奶茶.jpg', tuijianzhishu: 0 },
          { id: '7', count: 0, caiming: '鸡尾酒', xiaoshoujia: 6, huiyuanjia: 6, danwei: '罐', url: '/page/resources/images/鸡尾酒.jpg', tuijianzhishu: 5 },
          { id: '8', count: 0, caiming: '啤酒', xiaoshoujia: 5, huiyuanjia: 5, danwei: '罐', url: '/page/resources/images/啤酒.jpg', tuijianzhishu: 0 },
          { id: '9', count: 0, caiming: '江小白', xiaoshoujia: 17, huiyuanjia: 17, danwei: '瓶', url: '/page/resources/images/江小白.jpg', tuijianzhishu: 5 }]
      },
      {
        id: '6', tag: 'm6', fenleimingcheng: '其他', sum: null, dishs: [
          { id: '1', count: 0, caiming: '蛋炒饭', xiaoshoujia: 10, huiyuanjia: 8, danwei: '份', url: '/page/resources/images/蛋炒饭.jpg', tuijianzhishu: 0 },
          { id: '2', count: 0, caiming: '水果沙拉', xiaoshoujia: 15, huiyuanjia: 12, danwei: '份', url: '/page/resources/images/水果沙拉.jpg', tuijianzhishu: 0 },
          { id: '3', count: 0, caiming: '米饭（碗）', xiaoshoujia: 2, huiyuanjia: 2, danwei: '碗', url: '/page/resources/images/米饭.jpg', tuijianzhishu: 0 },
          { id: '4', count: 0, caiming: '米饭（古)', xiaoshoujia: 8, huiyuanjia: 8, danwei: '古', url: '/page/resources/images/米饭_古.jpg', tuijianzhishu: 0},]
      }
    ],
    dingdanno: '',
    total: {
      count: 0,
      money: 0
    },
    aPrepay: { dingdanno: null, message: null },//当前订单
    orderList: [],//缓存的订单
    phonemodel: '',
    phonesystem: '',
    networkType: '',
    scene: 1000,
    moshi: '',//加菜模式
    jiacaiDingdanno: '',
    //分店对象
    aFendian: {
      dizhi: '南宁学院',
      fendianmingcheng:'小萍萍店',
      dianhua: '15078235236',
      miaoshu: '南宁学院小萍萍店，提供美食，饮料，价格实惠，服务好。',
      //纬度
      lat: 22.753843,
      //经度
      lng: 108.45500,
      tishixuanjiushui: true, 
      qiangzhixuanrenshu:true},
  },
  onLaunch: function (options) {
    var that = this
    console.log('App onLaunch');
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.phonemodel = res.model
        that.globalData.phonesystem = res.system + '-' + res.version + '-' + res.platform
      }
    });
    wx.getNetworkType({
      success: function (res) {
        that.globalData.networkType = res.networkType
      }
    });
    if (options != undefined && options.scene != undefined) {
      that.globalData.scene = options.scene
    }
  },
  onHide: function () {
    console.log('App Hide')
  },
  onShow: function () {
    console.log('onShow');
  },
  //记录手机端错误
  onError: function (msg) {
    var that = this
    qcloud.request({
      url: config.service.errorUrl,
      hasLogin: that.globalData.hasLogin,
      data: {
        fendianid: that.globalData.aFendian.fendianid,
        zhuoziid: that.globalData.zhuoziid,
        hasLogin: that.globalData.hasLogin,
        userInfo: JSON.stringify(that.globalData.userInfo),
        phonemodel: that.globalData.phonemodel,
        phonesystem: that.globalData.phonesystem,
        networkType: that.globalData.networkType,
        scene: that.globalData.scene,
        msg:msg
      }        
    });
  },
})