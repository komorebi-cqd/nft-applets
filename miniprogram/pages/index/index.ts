// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    navTap: [{ id: 0, navName: '动态' }, { id: 1, navName: '数字藏品' }, { id: 2, navName: '关注' }],
    swiperHeight: 0, //swiper高度
    current: 0,//初始swiper-item
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    avatar: 'https://img2.baidu.com/it/u=1091037879,887784109&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=700',
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
    followList: [
      {
        avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        name: '灰原哀',
        approve: true,
        isFollow: false,
        articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        id: 999,
        articleText: '明月出天山,苍茫云海间。长风几万里,吹度玉门关。 汉下白登道,胡窥青海湾。由来征战地,不见有人还。 戍客望边色,思归多苦颜。高楼当此夜,叹息未应闲。',
        love: 66,
        comment: 22,
        isCollection: true
      },
      {
        avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        name: '灰原哀',
        approve: true,
        isFollow: false,
        articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
        id: 1,
        articleText: '明月出天山,苍茫云海间。长风几万里,吹度玉门关。 汉下白登道,胡窥青海湾。由来征战地,不见有人还。 戍客望边色,思归多苦颜。高楼当此夜,叹息未应闲。',
        love: 66,
        comment: 22,
      }
    ]
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs',
    // })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
    
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
  //去到个人中心
  goSpace(){
    //没有登录 跳到登录页
    if(true){
      wx.navigateTo({
        url: '../login/index'
      })
    }else{
      //登录了跳到个人中心
      wx.navigateTo({
        url: '../personalSpace/index'
      })
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
