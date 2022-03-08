// components/toast/toast.ts
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    message: {
      type: String,
      value: '发布成功'
    },
    duration:{
      type: Number,
      value: 900
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    animation: <any>null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(){
      let that = this;
      var animation = wx.createAnimation({
        duration: this.data.duration,
        timingFunction: 'ease'
      })
      this.data.animation = animation;
      animation.opacity(1).step();
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.opacity(0).step()
        that.setData({
          animationData: animation.export()
        })
      }.bind(this), 1500)
    }
  }
})
