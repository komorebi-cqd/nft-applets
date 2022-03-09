// pages/login/index.ts
import { userLogin, ajax } from '../../utils/request';

Page({
  /**
   * 页面的初始数据
   */
  dialog: <any>null,
  toast: <any>null,
  notify: <any>null,
  data: {
    agree: false,
    userInfo: <any>{},
    hasUserInfo: false, //是否有用户信息
    hasPhone: false, //是否有手机
    unionId: '',
    phoneCode: ''
  },
  //登录
  // login() {
  //   if (!this.data.agree) {
  //     this.toast.showNotify({ message: '请选中阅读并同意后再登录' });
  //     return;
  //   }
  //   let _this = this;
  //   wx.login({
  //     success(res) {
  //       if (res.code) {
  //         _this.getUserProfile();
  //       }
  //     }
  //   })
  // },
  //获取用户信息
  getUserProfile() {

    if (!this.data.agree) {

      this.toast.showNotify({ message: '请选中阅读并同意后再登录' });
      return;
    }
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success: (res) => {
        console.log(res, '获取用户信息');
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getPhoneNumber(e: any) {
    let _this = this;
    //获取电话临时凭证
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       if (e.detail.errMsg !== "getPhoneNumber:fail user deny") {
    //         _this.setData({
    //           phoneCode: e.detail.code
    //         })
    //         wx.nextTick(() => {
    //           ajax('POST', { code: e.detail.code, inviterId: _this.data.unionId, headPortraits: _this.data.userInfo.avatarUrl, nickName: _this.data.userInfo.nickName }, userLogin, (res: any) => {
    //             console.log(res);
    //           }, (error: any) => {
    //             console.log(error);
    //           }, (res: any) => {
    //             console.log(res);
    //           })
    //         })
    //       } else {

    //       }
    //     }
    //   }
    // })
    if (e.detail.errMsg !== "getPhoneNumber:fail user deny") {
      this.setData({
        phoneCode: e.detail.code
      })
      console.log(e.detail.code);
      
      wx.nextTick(() => {
        ajax('POST', { code: e.detail.code, inviterId: _this.data.unionId, headPortraits: _this.data.userInfo.avatarUrl, nickName: _this.data.userInfo.nickName }, userLogin, (res: any) => {
          console.log(res);
        }, (error: any) => {
          console.log(error);
        }, (res: any) => {
          console.log(res);
        })
      })
    } else {

    }
  },


  checkChange(e: any) { //是否同意协议及隐私政策
    console.log(e, '勾选隐私政策');

    if (e.detail.value.length === 0) {
      this.setData({
        agree: false
      })
    } else {
      this.setData({
        agree: true
      })
    }
  },
  _confirmEvent() {
    console.log('_confirmEvent');

  },
  _cancelEvent() {
    console.log('_cancelEvent');

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    if (option && option.unionId) {
      this.setData({
        unionId: option.unionId
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.dialog = this.selectComponent("#dialog");
    this.toast = this.selectComponent("#toast");
    this.notify = this.selectComponent("#notify");

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