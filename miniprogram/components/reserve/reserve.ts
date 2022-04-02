// components/reserve/reserve.ts
Component({
  lifetimes:{
    attached(){
      console.log(this.data);
    }
  },
  observers:{
    'status': function (status) {
      this.setData({
        nftStatus: parseInt(status)
      })
    },

  },
  /**
   * 组件的属性列表
   */
  properties: {
    nftQuantity:{
      type: Number,
      value: 0
    },
    nftPrice: {
      type: Number,
      value: 0
    },
    isSubscribe: {
      type: Number,
      value: 0
    },
    status: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nftStatus: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    subscribeButton(){
      this.triggerEvent('reserve');
    },
    goBuyCollection(){
      this.triggerEvent('buyCollection')
    }
  }
})
