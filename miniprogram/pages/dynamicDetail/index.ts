// pages/dynamicDetail/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
      name: '灰原哀',
      approve: true,
      isFollow: false,
      articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
      id: 154654,
      articleText: '明月出天山,苍茫云海间。长风几万里,吹度玉门关。 汉下白登道,胡窥青海湾。由来征战地,不见有人还。 戍客望边色,思归多苦颜。高楼当此夜,叹息未应闲。',
      love: 66,
      comment: 22,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    console.log(option);

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