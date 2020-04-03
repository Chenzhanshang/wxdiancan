/**
   * 页面的初始数据
   */
var app = getApp()
  Page({
    data: {
      //准备存入缓存的文件
      tempFilePath:'',
      //商品类型select索引
      index:'',
      //推荐指数select索引
      index1:'',
      //菜名
      caiming:'',
      //价格
      jiage:'',
      //会员价
      huiyuanjia:'',
      //上传的文件
      imgs: [],
      //商品类型select默认值和数值数组
      placeholder: '请选择',
      array: ['特色菜', '粉类', '粥类', '点心小吃', '饮品', '其他'],
      objectArray: [
        {id: 0,name: '1'},{id: 1,name: '2'},{id: 2,name: '3'},
        {id:3,name: '4'},{id:4,name: '5'},{id: 5,name: '6'}
      ],
      //推荐指数select默认值和数值数组
      placeholder1: '请选择',
      array1: ['1星', '2星', '3星', '4星','5星'],
      objectArray1: [
        {id: 0,name: '1'},{id: 1,name: '2'},{id: 2,name: '3'},
        {id: 3,name: '4'},{id: 4,name: '5'}
      ],
},

// 上传图片
chooseImg: function (e) {
  var that = this;
  var imgs = this.data.imgs;
  if (imgs.length >= 1) {
    this.setData({
      lenMore: 1
    });
    setTimeout(function () {
      that.setData({
        lenMore: 0
      });
    }, 2500);
    return false;
  }
  wx.chooseImage({
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      that.setData({
        tempFilePath:tempFilePaths
      });
  
      var imgs = that.data.imgs;
      if (imgs.length >= 1) {
        that.setData({
          imgs: imgs
        });
        return false;
      } else {
        imgs.push(tempFilePaths[0]);
      }
      
      // console.log(imgs);
      that.setData({
        imgs: imgs
      });
    }
  });
},

// 删除图片
deleteImg: function (e) {
  var imgs = this.data.imgs;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
    imgs: imgs
  });
},

// 预览图片
previewImg: function (e) {
  //获取当前图片的下标
  var index = e.currentTarget.dataset.index;
  //所有图片
  var imgs = this.data.imgs;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
  })
},

//商品名称改变触发
charChange: function (e) {
  this.setData({
    caiming: e.detail.value
  });
},


bindPickerChange(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},

//推荐星级select未点确定触发
clearFont1() {
  this.setData({
    placeholder1: ''
  })
},

//推荐等级监听
bindPickerChange1(e) {
  console.log('picker1发送选择改变，携带值为', e.detail.value)
  this.setData({
    index1: e.detail.value
  })
},

//商品类型select未点确定触发
clearFont() {
  this.setData({
    placeholder: ''
  })
},

//商品类型监听
bindRegionChange(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    region: e.detail.value
  })
},

//价格输入框事件
jiageChange: function (e) {
  this.setData({
    jiage: e.detail.value
  });
},

//会员价输入框事件
huiyuanjiaChange: function (e) {
  this.setData({
    huiyuanjia: e.detail.value
  });
},

//提交添加信息
submit:function(){
  wx.setStorageSync('img' + app.globalData.newImageSum, this.data.tempFilePath);//将图片路径缓存到本地
  var json = {
  id:app.globalData.menus[this.data.objectArray[this.data.index].id].dishs.length + 1,
  count:0,
  caiming:this.data.caiming,
  xiaoshoujia: this.data.jiage ,
  huiyuanjia: this.data.huiyuanjia ,
  danwei:'份',
  url: wx.getStorageSync('img' + app.globalData.newImageSum),//成功后将缓存照片放入
  tuijianzhishu: this.data.objectArray1[this.data.index1].name 
  };
  app.globalData.newImageSum++

  app.globalData.menus[this.data.objectArray[this.data.index].id].dishs.push(json)

  //弹出增加成功，2秒后跳转到点餐界面
  wx.showToast({
    title: '增加成功',
    icon: 'success',
    duration: 2000,
    success:function(){
      //延迟跳转
      setTimeout(function () {
        wx.switchTab({
          url: '/page/diancan/index'
        })},2000);
    }
  })
  
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

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})