// pages/userInfo/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nike: '桃之助',
      phone: '13333333333',
      introduction: '故人西辞黄鹤楼, 烟花三月下扬州。故人西辞黄鹤楼, 烟花三月下扬州。故人西辞黄鹤楼, 烟花三月下扬州。 孤帆远影碧空尽, 唯见长江天际流。'
    }
  },
  //改变昵称
  changeNike(e: any) {
    this.setData({
      'userInfo.nike': e.detail.value
    })
  },
  //改变简介
  changeIntro(e:any){
    this.setData({
      'userInfo.introduction': e.detail.value
    })
  },
  //用户修改保存用户信息
  userInfoSave() {
    console.log(this.data.userInfo);
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