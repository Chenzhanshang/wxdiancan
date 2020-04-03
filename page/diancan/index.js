/*----------------------------------------------------------------

    文件名：index.js
    文件功能描述：点餐首页
        
----------------------------------------------------------------*/
var util = require('../../util/util.js')
var app = getApp()
Page({
  data: {
    duration: 1200,
    moshi:null,
    toView: 'blue',
    menus: app.globalData.menus,
    //选择菜单项
    selectedMenuId: 1,
    //已选商品合计
    total: app.globalData.total,
    //显示商品详情
    showGoodsDetail: false,
    //商品图片链接
    goodsDetailUrl: '',
    //商品名称
    goodsDetailName: '',
    //售价
    goodsDetailSalePrice: 0.00,
    //会员价
    goodsDetailMenberPrice: 0.00,
    //商品单位
    goodsDetailDanwei: '份',
    //商品推荐星数
    goodsDetailTuijian: 0,
    //商品id
    goodsDetailId: 0,
    //商品所属种类
    goodsDetailMenuId: 0,
    animationData: {},
    hidAnim: true,
    X: 0,
    Y: 0,
    lastX: 0,
    lastY: 0,
    targetX: 200,
    targetY: 600,
    currGoods: null,
    aFendian: {},//分店对象
    canDiancan: true, //显示因地理位置限制 限制用户看本店菜单
    canDiancanChangjing: true,//是否显示提示扫描二维码
    yincangShouquan: true, //隐藏用户授权
  },
  //选择商品类型
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
    if(data.id == 7){
      //跳转到商品添加
      wx.navigateTo({
        url: '/page/newshop/newshop'
      })
    }
    else{
      this.setData({
        toView: data.tag,
        selectedMenuId: data.id
      })
    }
    
  },
  //数量增加
  addCount: function (event) {
    console.log(event)
    let data = event.currentTarget.dataset
    let menu = util.arrfind(this.data.menus, data.cid)
    let aDish = util.arrfind(menu.dishs, data.id)
    console.log(aDish)
    //如果商品存在
    //思考，为什么去掉aDish.kouWeiList != null出错-----------------------------------
    if (aDish != null && aDish.kouWeiList != null && data.hide != 'true') {
      this.selectItem(event);
      return
    }
    //如果当前该类商品为首次选择
    if (menu.sum == null) {
      menu.sum = 0;
      util.arrfind(app.globalData.menus, data.cid).sum = 0;
    }
    //如果详情显示，关闭
    if (data.hide == 'true') {
      this.hideGoodsDetail();
    }
    //该类所选数量加1
    menu.sum += 1;
    util.arrfind(app.globalData.menus, data.cid).sum += 1;
    let dish = util.arrfind(menu.dishs, data.id)
    dish.count += 1;
    this.data.total.count += 1
    this.data.total.money = (parseFloat(this.data.total.money) + parseFloat(dish.huiyuanjia)).toFixed(2)
    app.globalData.total.count += 1
    app.globalData.total.money = (parseFloat(app.globalData.total.money) + parseFloat(dish.huiyuanjia)).toFixed(2)
    util.arrfind(util.arrfind(app.globalData.menus, data.cid).dishs, data.id).count += 1;

    // 获取click事件坐标
    var tranX = event.touches[0].pageX - this.data.targetX;
    var tranY = event.touches[0].pageY - this.data.targetY;
    this.setData({
      menus: this.data.menus,
      total: this.data.total,
      hidAnim: true,
      X: event.touches[0].pageX - tranX,
      Y: event.touches[0].pageY - tranY
    })

    //制作动画
    var aAnimation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear',
      delay: 0
    })
    this.animation = aAnimation

    //回来
    aAnimation.translate(tranX, tranY).step()
    this.setData({
      animationData: aAnimation.export()
    })
    //下去
    this.setData({
      hidAnim: false
    })
    aAnimation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'linear',
      delay: 0
    })
    this.animation = aAnimation
    setTimeout(function () {
      aAnimation.translate((-1) * tranX, (-1) * tranY).step()
      this.setData({
        animationData: aAnimation.export()
      })
    }.bind(this), 100);


    //记录本次位置，作为下次新位置
    this.data.lastX = event.touches[0].pageX;
    this.data.lastY = event.touches[0].pageY;
  },
  //减少商品数量
  minusCount: function (event) {
    let data = event.currentTarget.dataset
    let menu = util.arrfind(this.data.menus, data.cid)
    menu.sum = menu.sum - 1;
    util.arrfind(app.globalData.menus, data.cid).sum -= 1;
    let dish = util.arrfind(menu.dishs, data.id)
    if (dish.count <= 0)
      return
    dish.count -= 1;
    this.data.total.count -= 1
    this.data.total.money = (this.data.total.money - dish.huiyuanjia).toFixed(2)
    app.globalData.total.count -= 1
    app.globalData.total.money = (app.globalData.total.money - dish.huiyuanjia).toFixed(2)
    util.arrfind(util.arrfind(app.globalData.menus, data.cid).dishs, data.id).count -= 1;
    this.setData({
      menus: this.data.menus,
      total: this.data.total
    })
  },

  //加菜提交
  jiacaitijiao:function(event){
    var that = this
    console.log(JSON.stringify(util.getThisOrder(app.globalData.menus)))
    var menus = JSON.stringify(util.getThisOrder(app.globalData.menus))
    menus = menus.substr(1,menus.length - 1)
    console.log(menus)
    var orderList = new Array()
    wx.getStorage({
      key: 'orderList',
      success: function(res) {
        console.log(res.data)
        orderList = res.data
        for (let i = 0; i < orderList.length;i++){
          if (orderList[i].dingdanno == app.globalData.jiacaiDingdanno){
            orderList[i].order = orderList[i].order.substr(0, orderList[i].order.length-1) + ',' + menus;
            console.log(that.data.total.money)
            //总价
            orderList[i].zongxiaoshoujia = (parseFloat(orderList[i].zongxiaoshoujia) + parseFloat(that.data.total.money)).toFixed(2)
            //应付价钱
            orderList[i].yingfujia = (parseFloat(orderList[i].yingfujia) + parseFloat(that.data.total.money)).toFixed(2)
            console.log(orderList)
            break;
          }
        }
        wx.removeStorageSync('orderList')
        wx.setStorage({
          key: 'orderList',
          data: orderList,
        })
        wx.showToast({
          title: '提交成功', success: res => {
            app.globalData.moshi = ''
            app.globalData.total.count = 0
            app.globalData.total.money = 0
            app.globalData.menus = util.resetMenu(app.globalData.menus);
            //清空左边已选数量数字显示标识
            for (let i = 0; i < app.globalData.menus.length; i++) {
              app.globalData.menus[i].sum = null
            }
            wx.switchTab({
              url: '/page/my/my',
            })
          }
        })
      },
    })
  },
  
  selectItem: function (event) {
    let data = event.currentTarget.dataset
    let menu = util.arrfind(this.data.menus, data.cid)
    if (menu.sum == null) {
      menu.sum = 0;
      util.arrfind(app.globalData.menus, data.cid).sum = 0;
    }
    let dish = util.arrfind(menu.dishs, data.id)

    this.setData({
      showGoodsDetail: true,
      goodsDetailUrl: dish.url,
      goodsDetailName: dish.caiming,
      goodsDetailSalePrice: dish.xiaoshoujia,
      goodsDetailMenberPrice: dish.huiyuanjia,
      goodsDetailDanwei: dish.danwei,
      goodsDetailTuijian: dish.tuijianzhishu,
      goodsDetailId: data.id,
      goodsDetailMenuId: data.cid,
      currGoods: dish
    })
  },
  //隐藏商品详情
  hideGoodsDetail: function () {
    this.setData({
      showGoodsDetail: false
    });
  },
  //显示商品详情
  showGoodsDetail: function () {
    this.setData({
      showGoodsDetail: true
    });
  },
  onShow: function () {
    this.setData({
      'moshi':app.globalData.moshi,
      'menus': app.globalData.menus,
      'total': app.globalData.total
    });
    wx.setNavigationBarTitle({
      title: app.globalData.aFendian.fendianmingcheng + '-' + '点餐' + app.globalData.moshi
    });
    if (!app.globalData.hasLogin) {
      wx.login({
        success: function (loginResult) {
          wx.getUserInfo({
            success: function (userResult) {
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
  onReady: function () {
  },
  onLoad: function (params) {
    //判断是否为管理员并且第一次加载
    if (app.globalData.userInfo.nickName == 'bug' && !app.globalData.isAdmin){
      app.globalData.isAdmin = true
      var json = { id: '7', tag: 'm7', fenleimingcheng: '新增商品(店长功能)' };
      console.log(json.toString())
      app.globalData.menus.push(json)
      console.log(app.globalData.menus)
      
    }
  },
})