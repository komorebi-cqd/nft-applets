// components/auth-phone/index.ts
import { userLogin, getUserInfo, ajax } from '../../utils/request';

Component({
  /**
   * 组件的属性列表
   */

  properties: {
    inviteId: { //邀请ID
      type: String || Number,
      value: ''
    },
    avatarUrl: String, //用户头像
    nickName: String, //用户昵称
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
    notify: <any>null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    getPhoneNumber(e: any) {
      let _this = this;
      //获取电话临时凭证
      wx.login({
        success(res) {
          if (res.code) {
            if (e.detail.errMsg !== "getPhoneNumber:fail user deny") {
              _this.setData({
                phoneCode: e.detail.code
              })
              wx.nextTick(() => {
                wx.showLoading({
                  title: '请求中',
                  mask: true
                })
                ajax('POST', { openIdCode: res.code, iphoneCode: e.detail.code, inviterId: _this.data.inviteId, headPortraits: _this.data.avatarUrl, nickName: _this.data.nickName }, userLogin, (res: any) => {
                  if(res.data.code !== 'SUC0000'){
                    _this.data.notify.showNotify({ message: res.data.msg })
                    return;
                  }
                  // 存储Token
                  try {
                    wx.setStorage({
                      key: 'token',
                      data: res['header']['token'] || res['header']['Token'],
                      success() {
                        ajax('GET', {}, getUserInfo, (res: any) => {
                          if (res.data.code === 'SUC0000') {
                            wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
                            wx.nextTick(() => {
                              wx.reLaunch({
                                url: '../../pages/index/index'
                              })
                            })
                          }
                        }, () => {
                          _this.data.notify.showNotify({ message: '授权失败，请稍后重试' })
                        }, () => {
                          wx.hideLoading();
                        })
                      }
                    });
                  } catch (e) { }
                }, (error: any) => {
                  console.log(error);
                }, () => {
                  wx.hideLoading();
                })
              })
            } else {
              _this.data.notify.showNotify({ message: '授权失败' })
            }
          }
        }
      })
    },
    showAuthPhoneView() {
      this.setData({
        isShow: false,
        notify: this.selectComponent("#notify")
      })
    },
  },

})
