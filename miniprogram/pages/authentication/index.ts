// pages/authentication/index.ts
import { authentication, ajax } from '../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  authState: <any>null,
  notify: <any>null,
  data: {
    identityInfo: {
      name: '',
      idCard: '',
    },
    userInfo: {

    },
    state: false
  },
  //改变名字
  changeName(e: any) {
    const reg = /[^\u4e00-\u9fa5]/g;
    let name = e.detail.value.replace(reg,'');
    this.setData({
      'identityInfo.name':name
    })
    console.log(name);
  },
  //改变身份信息
  changeIdCard(e: any) {
    const reg = /[^xX\d.]/g;
    let idCard = e.detail.value.replace(reg,'');
    this.setData({
      'identityInfo.idCard': idCard
    })
  },
  //没实名认证的时候提交
  submitAuth() {
    let that = this;
    const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/ig;
    if(!reg.test(this.data.identityInfo.idCard)){
      this.notify.showNotify({ message: '身份证格式错误' });
      return;
    }
    if(!this.data.identityInfo.idCard || !this.data.identityInfo.name){
      this.notify.showNotify({ message: '身份证或姓名不能为空' });
      return;
    }
    
    ajax('POST', {
      identityCard: this.data.identityInfo.idCard,
      realName: this.data.identityInfo.name
    }, authentication, (res: any) => {
      if (res.data.code === "SUC0000") {
        this.setData({
          state: true
        })
        let userInfo = wx.getStorageSync('userInfo');
        let newUserInfo = JSON.parse(userInfo);
        newUserInfo.identityCard = res.data.data.identityCard;
        newUserInfo.realName = res.data.data.realName;
        newUserInfo.isAuthentication = 1;
        console.log(newUserInfo,'newUserInfo::::');
        wx.setStorageSync('userInfo',JSON.stringify(newUserInfo));
        wx.setNavigationBarTitle({ title: '认证成功' })
        wx.nextTick(() => {
          that.authState.showAuth();
        })
      } else {
        this.setData({
          state: false
        })
        wx.setNavigationBarTitle({ title: '认证失败' })
        wx.nextTick(() => {
          that.authState.showAuth();
        })
      }
    }, () => {
      //认证失败
      this.setData({
        state: false
      })
      wx.setNavigationBarTitle({ title: '认证失败' })
      wx.nextTick(() => {
        that.authState.showAuth();
      })
    })
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.authState = this.selectComponent("#authState");
    this.notify = this.selectComponent("#notify");
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
    let userInfo = wx.getStorageSync('userInfo');
    let formatUserInfo = JSON.parse(userInfo)
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: formatUserInfo
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