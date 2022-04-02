// pages/dynamicDetail/index.ts
import { ajax, isSubscript, subscribe,browseNft } from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  toast: <any>null,
  dialog: <any>null,
  data: {
    item: {
      nftFilePath: '',
      nftRecording: '',
      unionId: '',
    },
    hasUserInfo: false,
    isSubscript: 0
  },
  //未登录的弹框确认
  _confirm() {
    console.log(222);
    
    wx.navigateTo({
      url: '../login/index'
    })
  },
  //未登录的弹框取消
  _cancel() {

  },
  _goBuyView(){
    const trendInfo = JSON.stringify(this.data.item);
    wx.navigateTo({
      url: `../orderDetail/index?trendInfo=${trendInfo}`
    })
  },
  //预约点击组件
  _reserve() {
    if (!this.data.hasUserInfo) {
      this.dialog.showDialog();
      return;
    }

    if (this.data.isSubscript === 0) {
      ajax('GET', { nftRecording: this.data.item.nftRecording, unionId: this.data.item.unionId }, subscribe, (res: any) => {
        console.log(res);
        if (res.data.code === "SUC0000") {
          this.toast.showToast({msg: '预约成功'});
          this.setData({
            isSubscript: 1
          })
        }else{
          this.toast.showToast({msg: '此数字藏品不能预约'});
        }
      })
    }
  },
  //获取是否预约
  getReserveState() {
    if (!this.data.hasUserInfo) {
      return;
    }
    ajax('GET', { nftRecording: this.data.item.nftRecording }, isSubscript, (res: any) => {
      if (res.data.code === "SUC0000") {
        this.setData({
          isSubscript: res.data.data.isSubscribe
        })
      }
    }, (err: any) => {
      console.log(err);
    })
  },
  //去预览大图界面
  goPreviewImg() {
    wx.navigateTo({
      url: `../previewImg/index?imgUrl=${this.data.item.nftFilePath}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    if (wx.getStorageSync('token') && wx.getStorageSync('userInfo')) {
      this.setData({
        hasUserInfo: true
      })
    }
    if (option && option.detail) {
      let dynamicDetail = JSON.parse(option.detail);
      this.setData({
        item: dynamicDetail
      })
      console.log(this.data.item,'详情');
      
      wx.nextTick(() => {
        ajax('POST',{unionId: dynamicDetail.unionId,nftRecording: dynamicDetail.nftRecording},browseNft,() => {
        })
        this.getReserveState();
      })
    }

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
    this.toast = this.selectComponent("#toast");
    this.dialog = this.selectComponent("#dialog");
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