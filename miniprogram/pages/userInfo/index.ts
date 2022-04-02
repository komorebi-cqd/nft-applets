// pages/userInfo/index.ts
import { ajax, userDataUpdate } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  toast: <any>null,
  notify:<any>null,
  data: {
    userInfo: {
      headPortraits: '',
      readme: '',
      nickName: '',
    }
  },
  //改变昵称
  changeNike(e: any) {
    let nickName = e.detail.value.slice(0,10);
    this.setData({
      'userInfo.nickName': nickName
    })
  },
  //改变简介
  changeIntro(e: any) {
    let detail = e.detail.value.slice(0,100);
    this.setData({
      'userInfo.readme': detail
    })
  },
  //用户修改保存用户信息
  userInfoSave() {
    let currentAvatar = this.data.userInfo.headPortraits;
    let currentNickName = this.data.userInfo.nickName;
    let currentReadme = this.data.userInfo.readme;
    if(!currentNickName.trim()){
      this.notify.showNotify({ message: '昵称不能为空' });
      return;
    }
    wx.showLoading({ title: '', mask: true });
    ajax('POST', { nickName: currentNickName, readme: currentReadme, headPortraits: currentAvatar }, userDataUpdate, (res: any) => {
      if (res.data.code === "SUC0000") {
        this.toast.showToast({ msg: '修改成功' });
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo));
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }else if(res.data.code === "DIGI011"){
        this.notify.showNotify({ message: '昵称含有敏感字符' });
      }else if(res.data.code === "DIGI029"){
        this.notify.showNotify({ message: '个人介绍含有敏感字符' });
      }
      wx.hideLoading()
    }, () => {
      wx.hideLoading()
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
    this.toast = this.selectComponent("#toast");
    this.notify = this.selectComponent("#notify");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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