// components/dialog/dialog.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '未实名认真'
    },
    content: {
      type: String,
      value: '平台鼓励举报违法违规，乱发广告等内容，同时请不要恶意举报。'
    },
    cancel: {
      type: String,
      value: '取消'
    },
    confirm: {
      type: String,
      value: '去认证'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
    animation: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDialog() {
      this.setData({
        isShow: false,
      })
    },
    cancel() {
      console.log(this.data.cancel, "取消");
      this.setData({
        isShow: true
      })
      this.triggerEvent('cancelEvent');
    },
    confirm() {
      console.log(this.data.confirm, "确认");
      this.setData({
        isShow: false
      })
      this.triggerEvent('confirmEvent');
    }
  }
})
