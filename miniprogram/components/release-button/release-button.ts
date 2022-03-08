

// components/release-botton/release-botton.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goRelease(){
      console.log('点击了发布动态按钮');
      wx.navigateTo({
        url: '/pages/release/index'
      })
    },
  }
})
