
// components/dialog/dialog.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentArray: Array
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
    goDetail(e: any) {
      let detailId = e.currentTarget.dataset.index;
      let result = this.data.contentArray.filter(item => {
        return item.nftRecording === detailId;
      })
      let strResult = JSON.stringify(result);
      wx.navigateTo({
        url: `../../pages/dynamicDetail/index?detail=${strResult}`
      })
    },
    goPersonalSpace(e: any) {
      let userid = e.currentTarget.dataset.userid;
      console.log(userid,'去他人的个人中心');
      wx.navigateTo({
        url: `../../pages/personalSpace/index?userid=${userid}`
      })
    }
  }
})
