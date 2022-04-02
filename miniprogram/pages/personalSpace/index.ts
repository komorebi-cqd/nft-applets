// pages/personalSpace/index.ts
Page({

  /**
   * 页面的初始数据
   */
  notify: <any>null,
  data: {
    navTap: [{ id: 0, navName: '数字藏品' }],
    userid: <any>null,  //有值就是别人的空间
    isSelf: true,
    swiperHeight: 0, //swiper高度
    current: 0,//初始swiper-item
    userInfo:{
    },
    collection: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.setData({
    //   userid: option.userid
    // })

    this.getElementHeight(`.swiper-${this.data.current + 1}`);
  },
  //动态获取swiper高度
  getElementHeight(element: any) {
    console.log(element,'element');
    let query = wx.createSelectorQuery();
    query.select(element).boundingClientRect(rect => {
      let height = rect.height;
      this.setData({
        swiperHeight: height
      })
    }).exec();
  },
  //切换顶部tap
  swichType(e: any) {
    let clickNav = e.target.dataset.index;
    this.setData({
      current: clickNav
    })
    this.getElementHeight(`.swiper-${clickNav + 1}`);
  },
  //swiper滑动改变
  swiperChange(e: any) {
    let current = e.detail.current;
    this.getElementHeight(`.swiper-${current + 1}`);
    this.setData({
      current: current
    })
  },
  showNotify() {
    this.notify.showNotify();
  },
  //去个人通知列表
  goPersonalNotify() {
    wx.navigateTo({
      url: '../personalNotify/index'
    })
  },
  //去个人设置页面
  goPersonalSite() {
    wx.navigateTo({
      url: '../personalSite/index'
    })
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
    this.notify = this.selectComponent("#notify");
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: JSON.parse(userInfo)
      })
    } else {
      wx.reLaunch({
        url: '../index/index'
      })
    }
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