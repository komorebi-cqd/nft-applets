// pages/login/index.ts
Page({
  /**
   * 页面的初始数据
   */
  dialog: <any>null,
  notify: <any>null,
  authPhone: <any>null,
  data: {
    agree: false,
    userInfo: <any>{},
    hasUserInfo: false, //是否有用户信息
    hasPhone: false, //是否有手机
    inviteId: '',
    phoneCode: '',
    avatarUrl: '',
    nickName: '',
    isAuthPhone: false,
  },
  //获取用户信息
  getUserProfile() {
    if (!this.data.agree) {
      this.notify.showNotify({ message: '请选中阅读并同意后再登录' });
      return;
    }
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          isAuthPhone: true,
        })
        console.log(this.authPhone);
        
        wx.nextTick(() => {
          this.authPhone.showAuthPhoneView();
        })

      },
      complete: () => {
      }
    })
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
    this.dialog = this.selectComponent("#dialog");
    this.notify = this.selectComponent("#notify");
    this.authPhone = this.selectComponent("#authPhone");
    //如果有邀请用户的ID
    if (option && option.inviteId) {
      this.setData({
        inviteId: option.inviteId
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  

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