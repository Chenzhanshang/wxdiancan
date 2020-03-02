/*----------------------------------------------------------------
  
    文件名：util.js
    文件功能描述：工具方法封装
    
----------------------------------------------------------------*/
var app = getApp();
function currentTime() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;

  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  return h + ":" + m
}

function currentDate() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;

  //获取当前日期
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  return Y + "-" + M+ "-" + D
}

Array.prototype.find = function (func) {
  var temp = [];
  for (var i = 0; i < this.length; i++) {
    if (func(this[i])) {
      temp[temp.length] = this[i];
    }
  }
  return temp;
}

//数组遍历查找
function arrfind(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id == item)
      return arr[i]
  }
}

var getThisOrder = (menus) => {
  var returnmenus = []
  if (menus != null && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      var havemenu = false
      var amenu = menus[i]
      if (amenu != null && amenu.dishs != null && amenu.dishs != undefined && amenu.dishs.length > 0) {
        for (var j = 0; j < amenu.dishs.length; j++) {
          var adish = menus[i].dishs[j]
          if (adish.count > 0) {
            var tdish = new Object
            tdish.id = adish.id
            tdish.caiming = adish.caiming
            tdish.xiaoshoujia = adish.xiaoshoujia
            tdish.huiyuanjia = adish.huiyuanjia
            tdish.count = adish.count
            tdish.fendianid = adish.fendianid
            tdish.fendianmingcheng = adish.fendianmingcheng
            returnmenus.push(tdish)
          }
        }
      }
    }
  }
  return returnmenus
};

//必点菜，通过zuixiaoshulian控制
var judgeBidiancai = (menus) => {
  var ret = ''
  if (menus != null && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      var havemenu = false
      var amenu = menus[i]
      if (amenu != null && amenu.dishs != null && amenu.dishs != undefined && amenu.dishs.length > 0) {
        for (var j = 0; j < amenu.dishs.length; j++) {
          var adish = menus[i].dishs[j]
          if (adish.count > 0 && adish.count < adish.zuixiaoshuliang) {
            ret += adish.caiming + ' 起订量：' + adish.zuixiaoshuliang + adish.danwei
          }
        }
      }
    }
  }
  return ret
};

//是否点酒水或饮料
var judgeJiushuiyingliao = (menus) => {
  var ret = ''
  if (menus != null && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      var havemenu = false
      var amenu = menus[i]
      if (amenu != null && amenu.dishs != null && amenu.dishs != undefined && amenu.dishs.length > 0) {
        for (var j = 0; j < amenu.dishs.length; j++) {
          var adish = menus[i].dishs[j]
          if (adish.count > 0) {
            if (adish.caiming == '百香果汁' || adish.caiming =='可乐'
              || adish.caiming == '柠檬水' || adish.caiming == '西瓜汁'
              || adish.caiming == '西米露奶茶' || adish.caiming =='原味奶茶'
              || adish.caiming == '鸡尾酒' || adish.caiming == '啤酒'
              || adish.caiming == '江小白') {
              ret += adish.caimin
            }
          }
        }
      }
    }
  }
  return ret
};

var resetMenu = (menus) => {
  if (menus != null && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      menus[i].url = 0
      var amenu = menus[i]
      if (amenu != null && amenu.dishs != null && amenu.dishs != undefined && amenu.dishs.length > 0) {
        for (var j = 0; j < menus[i].dishs.length; j++) {
          menus[i].dishs[j].count = 0
        }
      }
    }
  }
  return menus
};
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: '处理中。。。',
  duration: 10000
});
var hideBusy = function () {
  wx.hideToast();
};
// 显示成功提示
var showSuccess = text => {
  wx.hideToast();
  wx.showToast({
    title: text,
    icon: 'success'
  });
};
// 显示失败提示
var showFailModal = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
var navigateBack1 = function () {
  wx.navigateBack({
    delta: 1, // 回退前 delta(默认为1) 页面
    success: function (res) {

    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
};

//uuid生成
const wxuuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid

};


//一定要在这里面注册，否则没有用
module.exports = {
  currentDate: currentDate,
  currentTime: currentTime,
  arrfind: arrfind,
  showBusy: showBusy,
  hideBusy: hideBusy,
  showSuccess: showSuccess,
  showFailModal: showFailModal,
  getThisOrder: getThisOrder,
  judgeBidiancai: judgeBidiancai,
  judgeJiushuiyingliao: judgeJiushuiyingliao,
  resetMenu: resetMenu,
  navigateBack1: navigateBack1,
  wxuuid: wxuuid,
}
