/*
封装请求库
1.添加请求前后的遮罩层
2.配合promise 进行封装
3.配置一个全局的URL
 */

// 引入全局URL
import { BASE_URL } from "./url.js"

// 配置请求
export const request = (params) => {
  // 添加请求前后遮罩层
  wx.showLoading({
    title: '正在加载中...',
    mask: true
  })
  // 返回promise函数,在请求完成后将遮罩层关闭 
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: BASE_URL + params.url,
      success:  (res) => { 
        resolve(res);
      },
      fail:  (err) => { 
        reject(err);
      },
      complete: () => {
        wx.hideLoading();
       }
    })
  })
}