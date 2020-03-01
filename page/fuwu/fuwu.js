/*----------------------------------------------------------------

    文件名：fuwu.js
    文件功能描述：服务
        
----------------------------------------------------------------*/
var imageUtil = require('../../util/autoheight.js')
var util = require('../../util/util.js')
var app = getApp()
Page({
  data: {
    focus:false,
    fuwuNeirong:'',
    fuwuBeizhu:'',
    items: [
      { name: '餐巾纸', value: '餐巾纸' },
      { name: '茶水', value: '茶水' },      
      { name: '牙签', value: '牙签' },
      { name: '打包', value: '打包' },
      { name: '起菜', value: '起菜' },
      { name: '米饭', value: '米饭' },
      { name: '其他', value: '其他' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.fuwuNeirong = e.detail.value
    if (e.detail.value == '其他')
    {
      this.setData({
        focus: true
      })
    }
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
        // complete
      }
    })
  },
  charChange: function (e) {
    this.setData({
      fuwuBeizhu: e.detail.value
    });
  },
  bindsubmit: function (event) {
    var that = this
    var beizhu=''
    if (that.data.fuwuNeirong == '')
    {
      util.showFailModal('提示', '请选择服务类型');
      return;
    }
    if (that.data.fuwuBeizhu !='')
      beizhu = ' ' + that.data.fuwuBeizhu
    var fuwuContent = '用户需要：' + that.data.fuwuNeirong + '备注：' +beizhu
    wx.showModal({
      title: '即将发商户处理：',
      content: fuwuContent,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log('that.fuwuContent:',fuwuContent);
        if (res.confirm) {
          var ret = true;
          var msg = '发送成功。店长已收到消息，请稍等。';               
          wx.showModal({
            title: '',
            content: msg,
            showCancel: false,
            complete: function (res) {
              wx.switchTab({
                url: '/page/my/my'
              })
            }
          });
        } else {
          console.log('用户点击辅助操作')
        }
      },
      fail: function (error) {
        util.showFailModel('调用模式窗体失败', error);
      }
    });
  },
  onLoad: function (params) {
     
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: app.globalData.aZhuozi.zhuozimingcheng +'-呼叫服务员'
    });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})