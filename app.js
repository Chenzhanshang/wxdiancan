/*----------------------------------------------------------------
  
    文件名：app.js
    文件功能描述：全局js
    
----------------------------------------------------------------*/
var util = require('./util/util.js')

App({
  globalData: {
    //新增商品的索引
    newImageSum:1,
    hasLogin: false,
    //是否为管理员
    isAdmin: false,
    userInfo: {},
    zhuoziid: '262',
    menus: [
      {id:'1', tag: 'm1', fenleimingcheng: '特色菜', sum: null, dishs: [
        { id: '1', count: 0, caiming: '宫保鸡丁', xiaoshoujia: 18, huiyuanjia: 16, danwei: '份', url: '/page/resources/images/gbjd.jpg', tuijianzhishu:3},
        { id: '2', count: 0, caiming: '腐竹肉片', xiaoshoujia: 18, huiyuanjia: 15, danwei: '份', url: '/page/resources/images/fzrp.jpg', tuijianzhishu: 4 },
        { id: '3', count: 0, caiming: '牛肉青椒', xiaoshoujia: 16, huiyuanjia: 14, danwei: '份', url: '/page/resources/images/nrqj.jpg', tuijianzhishu: 3},
        { id: '4', count: 0, caiming: '糖醋里脊', xiaoshoujia: 20, huiyuanjia: 20, danwei: '份', url: '/page/resources/images/tclj.jpg', tuijianzhishu: 0 },
        { id: '5', count: 0, caiming: '酸菜鱼', xiaoshoujia: 20, huiyuanjia: 20, danwei: '份', url: '/page/resources/images/scy.jpg', tuijianzhishu: 5 },
        { id: '6', count: 0, caiming: '黄焖鸡', xiaoshoujia: 13, huiyuanjia: 13, danwei: '份', url: '/page/resources/images/hmj.jpg', tuijianzhishu: 5 },
        { id: '7', count: 0, caiming: '香菇滑鸡', xiaoshoujia: 18, huiyuanjia: 18, danwei: '份', url: '/page/resources/images/xghj.jpg', tuijianzhishu: 4 },
        { id: '12', count: 0, caiming: '红烧肉', xiaoshoujia: 17, huiyuanjia: 17, danwei: '份', url: '/page/resources/images/hsr.jpg', tuijianzhishu: 4 },
        { id: '13', count: 0, caiming: '番茄炒蛋', xiaoshoujia: 11, huiyuanjia: 11, danwei: '份', url: '/page/resources/images/fqcd.jpg', tuijianzhishu: 0 },
        { id: '8', count: 0, caiming: '耗油娃娃菜', xiaoshoujia: 8, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/hywwc.jpg', tuijianzhishu: 5 },
        { id: '9', count: 0, caiming: '干煸四季豆', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/gbsjd.jpg', tuijianzhishu: 3 },
        { id: '10', count: 0, caiming: '耗油菜心', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/hycx.jpg', tuijianzhishu: 4 },
        { id: '11', count: 0, caiming: '酸辣土豆丝', xiaoshoujia: 5, huiyuanjia: 5, danwei: '份', url: '/page/resources/images/sctds.jpg', tuijianzhishu: 2 }],
      },
      {
        id: '2', tag: 'm2', fenleimingcheng: '粉类', sum: null ,
        dishs: [
          { id: '1', count: 0, caiming: '蛋炒粉', xiaoshoujia: 12, huiyuanjia: 10, danwei: '碗', url: '/page/resources/images/dcf.jpg', tuijianzhishu: 0 },
          { id: '2', count: 0, caiming: '螺蛳粉', xiaoshoujia: 10, huiyuanjia: 8, danwei: '碗', url: '/page/resources/images/lsf.jpg', tuijianzhishu: 5},
          { id: '3', count: 0, caiming: '花甲粉', xiaoshoujia: 15, huiyuanjia: 13, danwei: '碗', url: '/page/resources/images/hjf.jpg', tuijianzhishu: 4},
          { id: '4', count: 0, caiming: '炸酱面', xiaoshoujia: 20, huiyuanjia: 18, danwei: '碗', url: '/page/resources/images/zjm.jpg', tuijianzhishu: 0 },
          { id: '5', count: 0, caiming: '桂林米粉', xiaoshoujia: 10, huiyuanjia: 10, danwei: '碗', url: '/page/resources/images/glmf.jpg', tuijianzhishu: 2 },
          { id: '6', count: 0, caiming: '牛腩粉', xiaoshoujia: 11, huiyuanjia: 11, danwei: '碗', url: '/page/resources/images/nnf.jpg', tuijianzhishu: 0 }]},
      {
        id: '3', tag: 'm3', fenleimingcheng: '粥类', sum: null, dishs: [
          { id: '1', count: 0, caiming: '海鲜粥', xiaoshoujia: 20, huiyuanjia: 18, danwei: '份', url: '/page/resources/images/hxz.jpg', tuijianzhishu: 3},
          { id: '2', count: 0, caiming: '皮蛋瘦肉粥', xiaoshoujia: 12, huiyuanjia: 11, danwei: '份', url: '/page/resources/images/pdsrz.jpg', tuijianzhishu: 5 },
          { id: '3', count: 0, caiming: '红豆粥', xiaoshoujia: 6, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/hdz.jpg', tuijianzhishu: 2 },
          { id: '4', count: 0, caiming: '绿豆粥', xiaoshoujia: 6, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/ldz.jpg', tuijianzhishu: 0 }] },
      {
        id: '4', tag: 'm4', fenleimingcheng: '点心小吃', sum: null, dishs: [
          { id: '1', count: 0, caiming: '南瓜饼', xiaoshoujia: 8, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/ngb.jpg', tuijianzhishu: 0 },
          { id: '2', count: 0, caiming: '油炸土豆球', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/yztdq.jpg', tuijianzhishu: 0 },
          { id: '3', count: 0, caiming: '蒸饺', xiaoshoujia: 6, huiyuanjia: 6, danwei: '份', url: '/page/resources/images/zj.jpg', tuijianzhishu: 0},
          { id: '4', count: 0, caiming: '香脆鸡米花', xiaoshoujia: 10, huiyuanjia: 10, danwei: '份', url: '/page/resources/images/xcjmh.jpg', tuijianzhishu: 0 },
          { id: '5', count: 0, caiming: '炸土豆条', xiaoshoujia: 7, huiyuanjia: 7, danwei: '份', url: '/page/resources/images/ztdt.jpg', tuijianzhishu: 0 }]
      },
      {
        id: '5', tag: 'm5', fenleimingcheng: '饮品', sum: null, dishs: [
          { id: '1', count: 0, caiming: '百香果汁', xiaoshoujia: 10, huiyuanjia: 8, danwei: '杯', url: '/page/resources/images/bxgz.jpg', tuijianzhishu: 3 },
          { id: '2', count: 0, caiming: '可乐', xiaoshoujia: 5, huiyuanjia: 5, danwei: '杯', url: '/page/resources/images/kl.jpg', tuijianzhishu: 4 },
          { id: '3', count: 0, caiming: '柠檬水', xiaoshoujia: 7, huiyuanjia: 6, danwei: '杯', url: '/page/resources/images/nms.jpg', tuijianzhishu: 5},
          { id: '4', count: 0, caiming: '西瓜汁', xiaoshoujia: 6, huiyuanjia: 6, danwei: '杯', url: '/page/resources/images/xgz.jpg', tuijianzhishu: 5},
          { id: '5', count: 0, caiming: '西米露奶茶', xiaoshoujia: 8, huiyuanjia: 8, danwei: '杯', url: '/page/resources/images/xmlnc.jpg', tuijianzhishu: 4 },
          { id: '6', count: 0, caiming: '原味奶茶', xiaoshoujia: 6, huiyuanjia: 6, danwei: '杯', url: '/page/resources/images/ywnc.jpg', tuijianzhishu: 0 },
          { id: '7', count: 0, caiming: '鸡尾酒', xiaoshoujia: 6, huiyuanjia: 6, danwei: '罐', url: '/page/resources/images/jwj.jpg', tuijianzhishu: 5 },
          { id: '8', count: 0, caiming: '啤酒', xiaoshoujia: 5, huiyuanjia: 5, danwei: '罐', url: '/page/resources/images/pj.jpg', tuijianzhishu: 0 },
          { id: '9', count: 0, caiming: '江小白', xiaoshoujia: 17, huiyuanjia: 17, danwei: '瓶', url: '/page/resources/images/jxb.jpg', tuijianzhishu: 5 }]
      },
      {
        id: '6', tag: 'm6', fenleimingcheng: '其他', sum: null, dishs: [
          { id: '1', count: 0, caiming: '蛋炒饭', xiaoshoujia: 10, huiyuanjia: 8, danwei: '份', url: '/page/resources/images/dcf1.jpg', tuijianzhishu: 0 },
          { id: '2', count: 0, caiming: '水果沙拉', xiaoshoujia: 15, huiyuanjia: 12, danwei: '份', url: '/page/resources/images/sgsl.jpg', tuijianzhishu: 0 },
          { id: '3', count: 0, caiming: '米饭（碗）', xiaoshoujia: 2, huiyuanjia: 2, danwei: '碗', url: '/page/resources/images/mf.jpg', tuijianzhishu: 0 },
          { id: '4', count: 0, caiming: '米饭（古)', xiaoshoujia: 8, huiyuanjia: 8, danwei: '古', url: '/page/resources/images/mf_g.jpg', tuijianzhishu: 0},]
      },
      
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
 
})