// index.ts
// 获取应用实例
import { queryRecentNft, ajax } from '../../utils/request';

// const app = getApp<IAppOption>()

Page({
  data: {
    navTap: [{ id: 0, navName: '数字藏品' }],
    swiperHeight: 0, //swiper高度
    current: 0,//初始swiper-item
    userInfo: {},
    hasUserInfo: false,
    isLoading: false,
    pageNum: 1, //当前页码
    pageSize: 5,// 一页数量
    total: 0,
    defaultAvatar: 'https://metadata.x-protocol.com/xma/test/nft_image/default-img.png',
    collection: [], //藏品列表
    inviteId: '',
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs',
    // })
  },
  onShow() {
    this.getElementHeight(`.swiper-${this.data.current + 1}`);
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: JSON.parse(userInfo)
      })
    } else {
      this.setData({
        hasUserInfo: false,
      })
    }
  },
  getNftData() {
    wx.showLoading({
      title: '',
      mask: true
    })
    ajax('POST', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, queryRecentNft, (res: any) => {
      if (res.data.code === 'SUC0000') {
        let items = res.data.data;
        let beforeCollection = this.data.collection;
        if (items) {
          this.setData({
            collection: beforeCollection.concat(items.list),
            total: items.total,
          })
        }
        this.getElementHeight(`.swiper-${this.data.current + 1}`);
      }
      wx.hideLoading();
    }, () => {
      wx.hideLoading();
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      pageNum: 1,
      collection: []
    })
    wx.nextTick(() => {
      this.getNftData();
      wx.stopPullDownRefresh();
    })
  },
  //触底加载更多
  onReachBottom() {
    if (this.data.collection.length < this.data.total) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      wx.nextTick(() => {
        this.getNftData();
      })
    }

  },
  onLoad(options) {
    // @ts-ignore
    //是否有用户信息
    if (options && options.q) {
      let queryAll = decodeURIComponent(options.q);
      let params = this.getParams(queryAll);
      this.setData({
        inviteId: params.inviter
      })
      console.log(params.inviter, '动态参数');
    }


    this.getNftData();
    this.getElementHeight(`.swiper-${this.data.current + 1}`);
  },
  //解析url参数
  getParams(params:string){
    let url = params.substring(params.indexOf("?"));
    let theRequest:any = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
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
  goSpace() {
    //没有登录 跳到登录页
    if(!this.data.hasUserInfo){
      this.setData({
        hasUserInfo: false,
        userInfo: {}
      })
      return;
    }
    if (!this.data.hasUserInfo) {
      wx.navigateTo({
        url: `../login/index?inviteId=${this.data.inviteId}`,
      })
    } else {
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
