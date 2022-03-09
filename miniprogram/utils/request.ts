let userLogin = '/user/login';
let getPrivacy ='/config/queryAgreement';
/**
 * 
 * @param {String} type 请求类型
 * @param {Object} params 请求参数
 * @param {String} url 请求地址
 * @param {Function} successHandle 成功回调函数
 * @param {Function} failHandle 失败回调函数
 * @param {Function} completeHandle 完成的回调函数
 */

function ajax(type:'GET' | 'POST', params:any, url:String, successHandle:Function, failHandle:Function, completeHandle:Function) {
  let https = 'http://4k9v843328.zicp.vip';
  let methodType = "application/json";
  if (type === 'GET') {
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
      'content-type': methodType
    },
    data: params,
    success(res) {
      successHandle(res)
    },
    fail(err:any) {
      if (failHandle) {
        failHandle(err)
      }
    },
    complete(res) {
      if (completeHandle) {
        completeHandle(res)
      }
    }
  })
}


export {
  ajax,
  userLogin,
  getPrivacy
}