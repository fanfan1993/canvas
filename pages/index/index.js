//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    showFen:false,
    userInputName: '',
  },
  onLoad (options) {
    let _this=this;
    wx.getSystemInfo({//  获取页面的有关信息
      success: function (res) {
        wx.setStorageSync('systemInfo', res)
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        var model = res.model;
        var pixelRatio = res.pixelRatio;
        _this.setData({
          windowWidth: ww,
          windowHeight: hh,
          pixelRatio: pixelRatio
        })
      }
    });
  },
  //分享按钮
  clickToFen() {
    let _this = this;
    _this.setData({
      showFen: !_this.data.showFen,
    })
  },
  //t生成朋友圈分享
  toFriend() {
    let _this = this;
    _this.setData({
      is_fried: !_this.data.is_fried,
      showFen: !_this.data.showFen,
    });
    // 关闭跳转
    wx.navigateTo({
      url: '../share/share'
    })
    //_this.drawCanvas();

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
