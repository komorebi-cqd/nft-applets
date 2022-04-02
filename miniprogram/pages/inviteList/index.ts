// pages/inviteList/index.ts
import { ajax, selectInviteList } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteList: [],
    pageNum: 1,
    pageSize: 15,
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getInviteList();
  },
  getInviteList() {
    wx.showLoading({
      title: '',
      mask: true
    })
    ajax('POST', { pageNum: this.data.pageNum, pageSize: this.data.pageSize }, selectInviteList, (res: any) => {
      if(res.data.code === "SUC0000" && res.data.data){
        this.setData({
          total: res.data.total,
          inviteList: this.data.inviteList.concat(res.data.data.list)
        })
      }
      wx.hideLoading()
    },() => {
      wx.hideLoading()
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
    this.setData({
      pageNum: 1,
      inviteList: []
    })
    wx.nextTick(() => {
      this.getInviteList();
      wx.stopPullDownRefresh();
    })
  },
    

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.inviteList.length < this.data.total) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      wx.nextTick(() => {
        this.getInviteList();
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})