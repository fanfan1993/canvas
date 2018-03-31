// pages/home/share/share.js
let app = getApp();
let that;
Page({
  data: {
    shareImage: '',
    pixelRatio: 0,
    windowWidth: 0,
    windowHeight: 0,
    showBgImagePath: '',
    showBgImagePath2: '../../images/showtextbg@2x.png',
    showBgImagePath3: '../../images/showtextbg@3x.png',
    footerImg: '../../images/footer@2x.png',
    showShopImg: '../../images/jj3.png',
    dogBgImagePath: '',
    qrBgImagePath: '../../images/xcx_logo.png',
    name: '',
  },
  onLoad(options) {
    let _this = this;
    //请求数据
    _this.setData({
      name: '一千年以后',
    })
    let systemInfo = wx.getStorageSync('systemInfo');
    console.log(systemInfo)
    _this.setData({
      windowHeight: systemInfo.windowHeight,
      windowWidth: systemInfo.windowWidth,
      pixelRatio: systemInfo.pixelRatio,
    });
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady() {
    let _this = this;
    wx.showLoading({
      title: '正在生成图片...',
      mask: true,
    });
    _this.drawCanvas();
  },
  onShow() {
    let _this = this;
    _this.setData({
      is_first: true,
      hasData: true,
      showLoading: false,
    })
  },
  drawCanvas() {
    let _this = this;
    // 根据像素比绘画不同的图片
    if (_this.data.pixelRatio == 2) {
      _this.setData({
        showBgImagePath: _this.data.showBgImagePath2,
      });
    } else {
      _this.setData({
        showBgImagePath: _this.data.showBgImagePath3,
      });
    }
    let ctx = wx.createCanvasContext('myCanvas');
    // 画布宽高
    let ctxW = _this.data.windowWidth;
    let ctxH = _this.data.windowHeight;
    // 默认像素比
    let pixelRatio = _this.data.pixelRatio;
    // 屏幕系数比，以设计稿375*667（iphone7）为例
    let XS = _this.data.windowWidth / 375;

    // 垂直渐变
    const grd = ctx.createLinearGradient(0, 0, 0, ctxH);
    grd.addColorStop(0, '#79c7f4');
    grd.addColorStop(1, '#4199f9');
    ctx.setFillStyle(grd);

    ctx.fillRect(0, 0, ctxW, ctxH);

    ctx.drawImage(this.data.showBgImagePath, ctxW / 2 - 158 * XS, 34 * XS, 317 * XS, 431 * XS);

    //头像图片
    ctx.drawImage(_this.data.showShopImg, ctxW / 2 - 45 * XS, 90 * XS, 80 * XS, 90 * XS);

    //文字
    ctx.setFontSize(20 * XS);
    ctx.setFillStyle('#419DF9');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(_this.data.name, ctxW / 2, 218 * XS);

    //小程序2微码
    ctx.drawImage(_this.data.qrBgImagePath, ctxW / 2 - 80 * XS, 270 * XS, 160 * XS, 160 * XS);
    ctx.stroke();
    ctx.draw();
    //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: ctxW,
        height: ctxH,
        destWidth: ctxW,
        destHeight: ctxH,
        canvasId: 'myCanvas',
        success: function (res) {
          _this.setData({
            shareImage: res.tempFilePath,
            showSharePic: true
          })
          //_this.save_photo();
         // _this.share_imgY();
          console.log(res.tempFilePath)
          wx.hideLoading(res.tempFilePath);
        },
        fail: function (res) {
          console.log(res)
          wx.hideLoading();
        }
      })
    }, 1000);

    
  },
  // 保存图片
  saveImage (e) {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },


})