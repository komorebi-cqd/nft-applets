let userLogin = '/user/login';

/**
 * 
 * @param {String} type 请求类型
 * @param {Object} params 请求参数
 * @param {String} url 请求地址
 * @param {Function} successHandle 成功回调函数
 * @param {Function} failHandle 失败回调函数
 * @param {Function} completeHandle 完成的回调函数
 */
function ajax(type, params, url, successHandle, failHandle, completeHandle) {
  let https = 'http://192.168.3.122:8080';
  let methodType = "application/json";
  if (type === 'GET') {
    let p = Object.keys(params).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    url += '?' + p;
    params = {}
  }
  if (type === 'POST') {
    methodType = 'application/x-www-form-urlencoded'
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
    err(err) {
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


module.exports = {
  ajax,
  userLogin,
}