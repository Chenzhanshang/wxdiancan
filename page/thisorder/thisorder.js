
/*----------------------------------------------------------------

    文件名：thisorder.js
    文件功能描述：当前点餐订单
        
----------------------------------------------------------------*/
var util = require('../../util/util.js')
var app = getApp()
var QQMapWX = require('../../util/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    menus: app.globalData.menus,
    total: app.globalData.total,
    kehuliuyan: '',
    //类型列表
    leixingItems: [
      { name: '堂食', value: '堂食', checked: true },
      { name: '打包', value: '打包' },
      { name: '外卖', value: '外卖' }
    ],
    //人数列表
    renshuArray: ['---', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '大于15人'],
    //到店日期列表
    daoDianArray: ['已在店', '今天', '明天', '后天'],
    renshuIndex: 0, //人数
    daoDianIndex: 0,  //已在店 今天 明天 后天
    date: '2020-02-02',
    time: '---', //到店时间
    aLeixing: '堂食', //类型
    aWaiMaiDiZhi: '',//外卖地址
    aLianXiDianHua: '',//顾客联系电话
    aFendian: {},//分店对象
  },
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
  },
  addCount: function (event) {
    let data = event.currentTarget.dataset
    let menu = util.arrfind(this.data.menus, data.cid)
    if (menu.sum == null) {
      menu.sum = 0
      util.arrfind(app.globalData.menus, data.cid).sum = 0
    }
    menu.sum += 1;
    util.arrfind(app.globalData.menus, data.cid).sum += 1;
    let dish = util.arrfind(menu.dishs, data.id)
    dish.count += 1;
    this.data.total.count += 1
    this.data.total.money = (parseFloat(this.data.total.money) + parseFloat(dish.huiyuanjia)).toFixed(2)
    app.globalData.total.count += 1
    app.globalData.total.money = (parseFloat(app.globalData.total.money) + parseFloat(dish.huiyuanjia)).toFixed(2)
    util.arrfind(util.arrfind(app.globalData.menus, data.cid).dishs, data.id).count += 1;
    this.setData({
      menus: this.data.menus,
      total: this.data.total,
    })
  },
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
      total: this.data.total,
    })
  },
  bindback: function (event) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        console.log('返回成功')
      },
      fail: function () {
        console.log('返回失败')
      },
      complete: function () {
      }
    })
  },

  bindsubmit: function (event) {
    var that = this
    //判断是否有最小销售数量不满足情况
    var judgeBidiancai = util.judgeBidiancai(app.globalData.menus);
    if (judgeBidiancai != '') {
      util.showFailModal('下单限制：', judgeBidiancai)
      return;
    }
    //强制选人数
    if (app.globalData.aFendian.qiangzhixuanrenshu && (that.data.renshuIndex <= 0 || that.data.renshuIndex > 14) && this.data.aLeixing == '堂食') {
      util.showFailModal('提示', '请选择人数')
      return;
    }
    var tmemo = this.data.kehuliuyan;
    wx.showModal({
      title: '订单即将发商户处理：',
      content: '是否提交?',
      confirmText: "提交",
      cancelText: "取消",
      success: function (res) {
        //清空左边已选数量数字显示标识
        for(let i = 0; i<app.globalData.menus.length;i++){
          app.globalData.menus[i].sum = null
        }
        if (res.confirm) {
          var ret = true;
          var msg = '';
          var tempdata = {
            memo: tmemo,
            order: JSON.stringify(util.getThisOrder(app.globalData.menus)),
            hasLogin: app.globalData.hasLogin,
            userInfo: JSON.stringify(app.globalData.userInfo),
            dingdanno:null,
            //总价
            zongxiaoshoujia: that.data.total.money,
            //应付价钱
            yingfujia: that.data.total.money,
            lat: app.globalData.aFendian.lat,
            lng: app.globalData.aFendian.lng,
            shijian: util.currentDate()+ ' ' + util.currentTime(),
            jiacaiDingdanno: app.globalData.jiacaiDingdanno,
            //订单类型
            dingDanLeiXing: that.data.aLeixing,
            renShu: that.data.renshuArray[that.data.renshuIndex],
            daoDianShiJian: that.data.daoDianIndex == 0 ? '已到店' : that.data.daoDianArray[that.data.daoDianIndex] + '-' + that.data.time,
            waiMaiDiZhi: that.data.aWaiMaiDiZhi,
            lianXiDianHua: that.data.aLianXiDianHua,
          };
          //生成uuid订单号
          let uuid = util.wxuuid()
          tempdata.dingdanno = uuid.toString()
          app.globalData.aPrepay.dingdanno = uuid.toString()
          app.globalData.aPrepay.message = '订单生成成功，订单号：' + uuid + '。请到前台付款。'
          //将数据放入本地缓存，先查询缓存，存在未非第一个订单，不存在则是第一个订单
          wx.getStorage({
            key: 'orderList',
            success: function (res) {
              app.globalData.orderList = res.data
              app.globalData.orderList.push(tempdata)
              wx.setStorage({
                key: 'orderList',
                data: app.globalData.orderList,
              })
            },
            fail: function (res) {
              console.log('获取订单失败')
              app.globalData.orderList.push(tempdata)
              wx.setStorage({
                key: 'orderList',
                data: app.globalData.orderList,
              })
            },
            complete: function (res) { },
          })
          let msg = app.globalData.aPrepay.message;
          app.globalData.total.count = 0;
          app.globalData.total.money = 0;
          app.globalData.dingdanno = app.globalData.aPrepay.dingdanno;
          app.globalData.menus = util.resetMenu(app.globalData.menus);
          wx.showModal({
            title: '订单处理结果：',
            content: msg,
            showCancel: false,
            complete: function (res) {
              wx.switchTab({
                url: '/page/my/my'
              })
            }
          })
        } else {
          console.log('用户点击辅助操作')
        }
      },
      fail: function (error) {
        util.showFailModel('调用模式窗体失败', error);
      }
    });
  },
  onShow: function () {
    this.setData({
      'menus': app.globalData.menus,
      'total': app.globalData.total,
      time: util.currentTime(),
      aFendian: app.globalData.aFendian,
    });
    wx.setNavigationBarTitle({
      title: '确认订单'
    });
    //提醒未点饮品 堂食非加菜模式提醒
    if (app.globalData.aFendian.tishixuanjiushui == true) {
      var judgeJiushuiyingliao = util.judgeJiushuiyingliao(app.globalData.menus);
      if (judgeJiushuiyingliao == ''  && this.data.aLeixing == '堂食') {
        wx.showModal({
          title: '提示：',
          content: '您没有点饮品，需要吗？',
          confirmText: "去点饮品",
          cancelText: "不要",
          complete: function (res) {
            if (res.confirm) {
              console.log('您没有点饮品，需要吗？', res)
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
        return;
      }
    }
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '确认订单'
    }
    )
    util.hideBusy();
  },
  bindRenshuChange: function (e) {
    this.setData({
      renshuIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      aLeixing: e.detail.value
    })
    this.setAdd()
  },
  bindDaoDianChange: function (e) {
    this.setData({
      daoDianIndex: e.detail.value
    })
  },
  bindMemoblur: function (e) {
    this.setData({
      kehuliuyan: e.detail.value
    })
  },
  bindWaiMaiDiZhiblur: function (e) {
    this.setData({
      aWaiMaiDiZhi: e.detail.value
    })
  },
  bindLianXiDianHuablur: function (e) {
    this.setData({
      aLianXiDianHua: e.detail.value
    })
  },
  
  setAdd: function () {
    var that = this
    if (this.data.aLeixing == '外卖') {
      if ( app.globalData.aKehu.dianhua) {
        that.setData({
          aLianXiDianHua: app.globalData.aKehu.dianhua
        });
      }
      qqmapsdk = new QQMapWX({
        key: 'PCLBZ-Q46LD-PO64S-PLAQW-ESMJF-RXBRZ'
      });
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (resp) {
              console.log(' qqmapsdk.reverseGeocoder sucess:', resp);
              if (resp.status == 0) {
                that.setData({
                  aWaiMaiDiZhi: resp.result.address_reference.landmark_l2.title
                })
              }
            },
            fail: function (resp) {
              console.log('qqmapsdk.reverseGeocoder fail:', resp);
            },
            complete: function (resp) {
              console.log('qqmapsdk.reverseGeocoder complete:', resp);
            }
          });
        },
        fail: function (res) {
          console.log('wx.getLocation fail:', res);
        },
        complete: function (res) {
          console.log('wx.getLocation complete:', res);
        }
      });
    }
  },
})