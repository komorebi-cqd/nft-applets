// pages/login/index.ts
Page({
  /**
   * 页面的初始数据
   */
  dialog:<any>null,
  toast:<any>null,
  notify:<any>null,
  data: {
    agree: false,
  },
  login() {
    if (!this.data.agree) {
      console.log('请同意授权');
      // this.dialog.showDialog();
      this.toast.showNotify();
      return;
    }
    console.log('登录按钮点击了');
  },
  checkChange(e:any) { //是否同意协议及隐私政策
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
  _confirmEvent(){
    console.log('_confirmEvent');
    
  },
  _cancelEvent(){
    console.log('_cancelEvent');
    
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
    this.dialog= this.selectComponent("#dialog");
    this.toast= this.selectComponent("#toast");
    this.notify= this.selectComponent("#notify");
    
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