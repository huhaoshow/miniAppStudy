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
    prodData: {}, //商品详细信息
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 页面传递过来的参数只能在onload内获取
    // 页面加载时获取商品详情渲染页面
    const detailRes = await request({
      url: "/goods/detail",
      data: options
    });
    const { message } = detailRes.data;
    // 改造数据,添加num属性,为之后添加购物车作准备
    const prodData = {...message,num:1};
    // 从本地获取商品收藏列表
    let collectList = wx.getStorageSync("collectList") || [];
    // 查询该商品是否收藏
    let isCollect = collectList.some(v => v.goods_id === prodData.goods_id);
    // 更新数据
    this.setData({
      prodData,isCollect
    });
    console.log(this.data)
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
  // 处理点击收藏/取消收藏商品
  handleCollect(e) {
    // 从本地中取出收藏列表
    let collectList = wx.getStorageSync("collectList") || [];
    // 先判断此次点击是收藏还是取消收藏
    if(!this.data.isCollect) {
      // 该次点击是收藏,向收藏列表中添加商品
      collectList.push(this.data.prodData);
      // 给出提示,收藏成功
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask:'true'
      })
    } else {
      // 该次点击是取消,从收藏列表中找到该商品的index来删除商品
      const index = collectList.findIndex( v => v.goods_id ===this.data.prodData.goods_id);
      collectList.splice(index,1);
      // 给出提示,取消成功
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask:'true'
      })
    }
    // 更改收藏按钮的选中状态
    this.setData({
      isCollect: !this.data.isCollect
    })
    // 更新本地数据
    wx.setStorageSync("collectList",collectList);
  },
  // 点击添加商品进购物车中
  handleAddProd(e) {
    // 先将本地中的购物车商品数据取出并改造数据,添加num属性
    let cartList = wx.getStorageSync("cartList") || [];
    // 判断购物车中是否有此商品
    const index = cartList.findIndex(v => v.goods_id === this.data.prodData.goods_id);
    if(index === -1) {
      // 购物车中无此商品,将商品添加进购物车
      cartList.push(this.data.prodData);
    } else {
      // 购物车中有此商品,将商品数量加1
      cartList[index].num+=1;
    };
    // 向用户给出提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: 'true'
    })
    // 更新本地数据
    wx.setStorageSync("cartList", cartList);
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