// pages/inviteFriend/index.ts
import drawQrcode from '../../utils/weapp-qrcode';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ewmImg: '',
    bg: 'https://jiuselu.oss-cn-shenzhen.aliyuncs.com/invite/applet/invite-bg.jpg',
    isShowEwm: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  //生成二维码
  async ewmChange() {
    wx.showLoading({
      title: '二维码生成中',
      mask: true
    })
    let _this = this;
    setTimeout(async () => {
      const query = wx.createSelectorQuery();
      query.select('#ewmCanvas').fields({ node: true, size: true }).exec(async (res) => {
        const canvas = res[0].node;
        await drawQrcode({
          canvas: canvas,
          canvasId: 'ewmCanvas',
          width: 900,
          height: 0,
          padding: 100,
          text: 'https://www.boicehot.com/invite?action=invite&inviter=17',
        }, false)
      })

      const canvasObj: Object = await new Promise((resolve) => {
        query.select('#ewmCanvas')
          .fields({ node: true, size: true })
          .exec(async (res) => {
            resolve(res[0].node);
          })
      });
      wx.canvasToTempFilePath({
        canvas: canvasObj,
        success(res) {
          _this.setData({
            ewmImg: res.tempFilePath,
          })
          wx.nextTick(() => {
            _this.init();
          })
        },
        complete() {
          wx.hideLoading();
        }
      })
    }, 1000)



  },
  init() {
    const query = wx.createSelectorQuery();
    query.select('#posterCanvas').fields({ node: true, size: true }).exec(async (res) => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      let _w = res[0].width;
      let _h = res[0].height;
      canvas.width = _w;
      canvas.height = _h;
      ctx.clearRect(0, 0, _w, _h); //清空画板
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, _w, _h);

      //生成主图
      const mainImg = canvas.createImage();
      mainImg.src = this.data.bg;
      let mainImgPo: any = await new Promise((resolve, reject) => {
        mainImg.onload = () => {
          resolve(mainImg)
        }
        mainImg.onerror = (e: any) => {
          reject(e)
        }
      });
      console.log(mainImgPo, 'mainImgPo');

      ctx.drawImage(mainImgPo, 0, 0, mainImgPo.width, mainImgPo.height, 0, 0, _w, _h);
      //生二维码
      let _ewmWidth = _w / 4.5; //二维码宽度
      let _ewmLeftPadding = _w / 22; //二维码左边距
      let _ewmBottomPadding = _h / 1.25; //二维码距离顶部
      const ewm = canvas.createImage();
      ewm.src = this.data.ewmImg;
      let ewmPo: any = await new Promise((resolve, reject) => {
        ewm.onload = () => {
          resolve(ewm)
        }
        ewm.onerror = (e: any) => {
          reject(e)
        }
      });

      ctx.drawImage(ewmPo, _ewmLeftPadding, _ewmBottomPadding, _ewmWidth, _ewmWidth);
      wx.nextTick(() => {
        this.setData({
          isShowEwm: true
        })
      })

    })
  },
  goInviteList() {
    wx.navigateTo({
      url: '../../pages/inviteList/index'
    })
  },

  //保存邀请图片
  async inviteSaveImg() {
    const query = wx.createSelectorQuery();
    const canvasObj: Object = await new Promise((resolve) => {
      query.select('#posterCanvas')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          resolve(res[0].node);
        })
    });

    wx.canvasToTempFilePath({
      canvas: canvasObj,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '您的二维码已保存到相册，赶快分享给你的朋友吧',
              showCancel: false,
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success() {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          },
          complete() {
            wx.hideLoading()
          }
        })
      },

    })

    // wx.downloadFile({
    //   url: 'https://img1.baidu.com/it/u=4246005398,2060518032&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    //   success(res) {
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success: function () {
    //         wx.hideLoading()
    //         wx.showModal({
    //           title: '提示',
    //           content: '您的二维码已保存到相册，赶快分享给你的朋友吧',
    //           showCancel: false,
    //         })
    //       },
    //     })
    //   },
    //   fail: function (err) {
    //     if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
    //       // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
    //       wx.showModal({
    //         title: '提示',
    //         content: '需要您授权保存相册',
    //         showCancel: false,
    //         success() {
    //           wx.openSetting({
    //             success(settingdata) {
    //               console.log("settingdata", settingdata)
    //               if (settingdata.authSetting['scope.writePhotosAlbum']) {
    //                 wx.showModal({
    //                   title: '提示',
    //                   content: '获取权限成功,再次点击图片即可保存',
    //                   showCancel: false,
    //                 })
    //               } else {
    //                 wx.showModal({
    //                   title: '提示',
    //                   content: '获取权限失败，将无法保存到相册哦~',
    //                   showCancel: false,
    //                 })
    //               }
    //             },
    //             fail(failData) {
    //               console.log("failData", failData)
    //             },
    //             complete(finishData) {
    //               console.log("finishData", finishData)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   },
    //   complete() {
    //     wx.hideLoading()
    //   }

    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.ewmChange();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})