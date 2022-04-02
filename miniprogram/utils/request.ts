let userLogin = '/test-api/user/login'; //用户登录
let getPrivacy = '/test-api/config/queryAgreement'; //获取隐私
let getUserInfo = '/test-api/user/queryLoginUserData'; //获取用户信息
let queryRecentNft = '/test-api/nft/queryRecentNft'; //查询最近的动态
let authentication = '/test-api/user/authentication' //验证身份信息
let inviteQRcode = '/test-api/user/inviteQRcode' //获取邀请图片
let selectInviteList = '/test-api/user/selectInviteList ' //获取邀请列表
let userDataUpdate = '/test-api/user/userDataUpdate' //修改昵称自述和头像
let isSubscript = '/test-api/nft/isSubscribe' //是否预约
let subscribe = '/test-api/nft/subscribe' //预约藏品
let browseNft = '/test-api/nft/browseNft' //浏览量
/**
 * 
 * @param {String} type 请求类型
 * @param {Object} params 请求参数
 * @param {String} url 请求地址
 * @param {Function} successHandle 成功回调函数
 * @param {Function} failHandle 失败回调函数
 * @param {Function} completeHandle 完成的回调函数
 */

function ajax(type: 'GET' | 'POST', params: any, url: String, successHandle: Function, failHandle?: Function, completeHandle?: Function) {
  let https = 'https://www.boicehot.com'; //http://4k9v843328.zicp.vip  https://www.boicehot.com  /test-api
  let methodType = "application/json";
  let token = wx.getStorageSync('token');
  if (type === 'GET' && JSON.stringify(params) !== '{}') {
    let p = Object.keys(params).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    url += '?' + p;
    params = {}
  }
  if (type === 'POST') {
    methodType = 'application/json'
  }
  wx.request({
    url: https + url,
    method: type,
    header: {
      'content-type': methodType,
      'token': token
    },
    data: params,
    success(res: any) {
      if (res.statusCode === 401) {
        try {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
        } catch (e) {
        }
      }
      successHandle(res)
    },
    fail(err: any) {
      console.log(err,'fail');
      if (failHandle) {
        failHandle(err)
      }
    },
    complete(res) {
      console.log(res,'complete');
      
      if (completeHandle) {
        completeHandle(res)
      }
    }
  })
}


export {
  ajax,
  userLogin,
  getPrivacy,
  getUserInfo,
  queryRecentNft,
  authentication,
  inviteQRcode,
  selectInviteList,
  userDataUpdate,
  isSubscript,
  subscribe,
  browseNft
}