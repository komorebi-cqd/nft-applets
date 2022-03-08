// pages/authentication/index.ts
Page({

  /**
   * 页面的初始数据
   */
  authState: <any> null,
  data: {
    identityInfo: {
      name: '',
      idCard: '',
      isAuth: false
    },
    state: false
  },
  //改变名字
  changeName(e: any) {
    this.setData({
      'identityInfo.name': e.detail.value
    })
  },
  //改变身份信息
  changeIdCard(e: any) {
    this.setData({
      'identityInfo.idCard': e.detail.value
    })
  },
  //没实名认证的时候提交
  submitAuth() {
    let that = this;
    //认证失败
    // this.setData({
    //   state: false
    // })
    // wx.setNavigationBarTitle({ title: '认证失败' })
    //认证成功
    this.setData({
      state: true
    })
    wx.setNavigationBarTitle({ title: '认证成功' })

    wx.nextTick(() => {
      that.authState.showAuth();
    })
    console.log(this.data.identityInfo);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.authState= this.selectComponent("#authState");
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