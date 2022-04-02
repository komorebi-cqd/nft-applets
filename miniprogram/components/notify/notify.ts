// components/dialog/dialog.ts
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    background: {
      type: String,
      value: 'rgba(190,54,32,.7)'
    },
    color: {
      type: String,
      value: '#FFFFFF'
    },
    duration: {
      type: Number,
      value: 400
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    animation: <any>null,
    message: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showNotify(e:any) {
      if(e){
        this.setData({
          message: e.message
        })
      }
      let that = this;
      var animation = wx.createAnimation({
        duration: this.data.duration,
        timingFunction: 'ease'
      })
      this.data.animation = animation;
      animation.opacity(1).translateY(0).step();
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.opacity(0).translateY(-100).step()
        that.setData({
          animationData: animation.export()
        })
      }.bind(this), 1500)
    }
  }
})
