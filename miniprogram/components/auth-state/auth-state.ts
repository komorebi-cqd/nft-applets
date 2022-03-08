// components/authState/auth-state.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    state: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showAuth(){
      this.setData({
        isShow: true
      })
    },
    authSuccess(){
      wx.redirectTo({
        url: '../../pages/personalSpace/index'
      })
      this.setData({
        isShow: false
      })
    },

    authFail(){
      this.setData({
        isShow: false
      })
      wx.setNavigationBarTitle({ title: '实名认证' })
    }
  }
})
