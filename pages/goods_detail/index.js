// pages/goods_detail/index.js
// 引入请求库
import {
  request
} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodData: {} //商品详细信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面传递过来的参数只能在onload内获取
    this.getGoodsDetail(options);
  },
  // 获取商品详情
  async getGoodsDetail(params) {
    const detailRes = await request({
      url: "/goods/detail",
      data: params
    });
    const prodData = detailRes.data.message;
    this.setData({
      prodData
    });
  },
  // 处理图片预览
  handleImgPreview(e) {
    // 将传递参数解构出来
    console.log(e)
    const { current,pics } = e.currentTarget.dataset
    wx.previewImage({
      current,
      urls: pics.map(v => v.pics_mid)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})