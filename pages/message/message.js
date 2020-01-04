const {
  rquest
} = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.request({
      url: 'https://api.pubg.com/tournaments',
      header: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjIwYTA4MC0wNzhkLTAxMzgtNzExMy0yZGY4YzdjNjQ2ZmYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTc3MDkwMzA1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InpqY29kZXIxOTk5LWdtIn0.VX9MNBaYwKCTMT-x6oz8pHOL66BBvLhmqMvg5KX0QDU',
        'Accept': 'application/vnd.api+json'
      },
      success(res) {
        console.log(res)
        that.setData({
          dataList:res.data.data
        })
      }
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