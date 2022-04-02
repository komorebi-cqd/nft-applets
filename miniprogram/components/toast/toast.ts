// components/toast/toast.ts
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    // message: {
    //   type: String,
    //   value: '发布成功'
    // },
    duration: {
      type: Number,
      value: 300
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    animation: <any>null,
    message: '',
    isShowView: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(e: any) {
      let that = this;
      if (e && e.msg) {
        this.setData({
          message: e.msg,
          isShowView: false,
          isLoading: true,
        })
        var animation = wx.createAnimation({
          duration: this.data.duration,
          timingFunction: 'ease-in-out'
        })
        this.data.animation = animation;
        animation.opacity(1).step();
        this.setData({
          animationData: animation.export(),
        })
        setTimeout(function () {
          animation.opacity(0).step()
          that.setData({
            animationData: animation.export(),
            isShowView: true,
            isLoading: false
          })
        }.bind(this), 1500)
      }
    }
  }
})
