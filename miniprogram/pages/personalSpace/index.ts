// pages/personalSpace/index.ts
Page({

  /**
   * 页面的初始数据
   */
  notify:<any>null,
  data: {
    navTap: [{ id: 0, navName: '动态' }, { id: 1, navName: '数字藏品' }],
    userid:<any> null,  //有值就是别人的空间
    isSelf: true,
    swiperHeight: 0, //swiper高度
    current: 0,//初始swiper-item
    dynamicList: [
      {
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
      {
        avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        name: '柯南',
        approve: true,
        isFollow: true,
        articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        id: 15465,
        articleText: '挽弓当挽强，用箭当用长。',
        love: 88,
        comment: 1,
      },
      {
        avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        name: '小兰',
        approve: true,
        isFollow: false,
        articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        id: 5655,
        articleText: '明月几时有,把酒问青天。 不知天上宫阙,今夕是何年? 我欲乘风归去, 又恐琼楼玉宇, 高处不胜寒',
        love: 45,
        comment: 44,
      },
      {
        avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        name: '路飞',
        approve: false,
        isFollow: true,
        articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        id: 656,
        articleText: '青天有月来几时,我今停杯一问之: 人攀明月不可得,月行却与人相随? 皎如飞镜临丹阙,绿烟灭尽清辉发? 但见宵从海上来,宁知晓向云间没? 白兔捣药秋复春,嫦娥孤栖与谁邻? 今人不见古时月,今月曾经照',
        love: 88,
        comment: 99,
      },
    ],
    collection: [
      {
        avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        name: '灰原哀',
        approve: true,
        isFollow: false,
        articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        id: 5,
        articleText: '明月出天山,苍茫云海间。长风几万里,吹度玉门关。 汉下白登道,胡窥青海湾。由来征战地,不见有人还。 戍客望边色,思归多苦颜。高楼当此夜,叹息未应闲。',
        love: 66,
        comment: 22,
        isCollection: true
      }
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
  showNotify(){
    this.notify.showNotify();
  },
  //去个人通知列表
  goPersonalNotify(){
    wx.navigateTo({
      url: '../personalNotify/index'
    })
  },
  //去个人设置页面
  goPersonalSite(){
    wx.navigateTo({
      url: '../personalSite/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
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