
// components/dialog/dialog.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentArray: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    collection: {
      avatar: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500',
      name: '灰原哀',
      approve: true,
      isFollow: false,
      articleCover: 'https://img2.baidu.com/it/u=762896549,2665974992&fm=253&fmt=auto&app=138&f=JPEG?w=887&h=500'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e: any) {
      let detailId = e.currentTarget.dataset.index;
      console.log(detailId,'详情Id');
      wx.navigateTo({
        url: `../../pages/dynamicDetail/index?detail=${detailId}`
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
