// app.ts
import { getUserInfo, ajax } from './utils/request';
App<IAppOption>({
  globalData: {

  },
  onLaunch() {
    // 展示本地存储能力
    const token = wx.getStorageSync('token') || '';
    if (token) {
      //请求用户信息，设置
      ajax('GET', {}, getUserInfo, (res: any) => {
        if (res.data.code === 'SUC0000') {
          wx.setStorageSync('userInfo',JSON.stringify(res.data.data));
        }
      })
    }
  },
})