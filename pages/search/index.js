// pages/search/index.js
import { request } from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: "",
    searchList: []
  },
  // 处理搜索关键词
  handleInputChange(e) {
    // 动态绑定输入关键字
    this.setData({
      searchKey: e.detail.value
    })
  },
  // 处理点击搜索按钮
  async handleClick(e) {
    // 判断关键词是否为空,若为空则终止操作并给出提示
    if (!this.data.searchKey) {
      wx.showToast({
        title: '请输入关键字',
        icon: 'none'
      })
      return;
    }
    // 否则向服务器请求搜索结果
    const searchRes = await request({
      url: "/goods/qsearch",
      data: {
        query: this.data.searchKey
      }
    });
    console.log(searchRes)
    this.setData({
      searchList: searchRes.data.message
    })
    // 判断是否有搜索结果,如果没有则终止操作并且给出提示
    if (this.data.searchList.length === 0) {
      wx.showToast({
        title: '没有你想要的结果哦!',
        icon: "none"
      })
      return;
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})