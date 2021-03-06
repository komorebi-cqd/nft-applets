// pages/personalSite/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //去个人账户资料
  goUserInfo(){
    wx.navigateTo({
      url: '../userInfo/index'
    })
  },
  //我的认证
  goAuth(){
    wx.navigateTo({
      url: '../authentication/index'
    })
  },
  //邀请好友
  goInvite(){
    wx.navigateTo({
      url: '../inviteFriend/index'
    })
  },
  //去关于我们
  goAbout(){
    wx.navigateTo({
      url: '../site/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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