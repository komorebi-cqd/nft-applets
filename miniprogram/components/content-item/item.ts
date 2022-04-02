
// components/dialog/dialog.ts
Component({
  lifetimes: {
    attached: function () {
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    collection: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    defalutImg: 'https://c-ssl.duitang.com/uploads/item/202007/27/20200727092559_dMvje.jpeg',
    loadImg: '',
    loaded: false,
  },


  /**
   * 组件的方法列表
   */
  methods: {
    imgOnLoad(e: any) {
        this.setData({
          loadImg: e.target.dataset.thumb,
          loaded: true
        })
    },
    goDetail() {
      console.log(this.data.collection);
      let strResult = JSON.stringify(this.data.collection);
      wx.navigateTo({
        url: `../../pages/dynamicDetail/index?detail=${strResult}`
      })
    },
    goPersonalSpace(e: any) {
      let userid = e.currentTarget.dataset.userid;
      console.log(userid, '去他人的个人中心');
      wx.navigateTo({
        url: `../../pages/personalSpace/index?userid=${userid}`
      })
    }
  }
})
