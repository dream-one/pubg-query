// pages/index/index.js
const {
  rquest
} = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [], //历史记录
    searchValue: '',
    player: null,
    playLife: null, //玩家寿命状态
    gameMode: [{
      name: '单人-TPP',
      enname: 'solo'
    }, {
      name: '单人-FPP',
      enname: 'solo - fpp'
    }, {
      name: '双人-TPP',
      enname: 'duo',
    }, {
      name: '双人-FPP',
      enname: 'duo-fpp'
    }, {
      name: '四人-TPP',
      enname: 'squad'
    }, {
      name: '四人-FPP',
      enname: 'squad-fpp'
    }],
    index: 0
  },
  changMode(e) {
    console.log(e)
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.gameMode[e.detail.value])
  },
  search(e) {
    //点击查询按钮
    if (e.detail.value.id.length == 0) {
      return wx.showToast({
        title: '输入字段不能为空',
        icon: 'none'
      })
    }
    let temp = this.data.history.find(item => {
      return e.detail.value.id == item
    })
    if (!temp) {
      this.data.history.unshift(e.detail.value.id)
      wx.setStorage({
        key: "history",
        data: this.data.history
      })
      this.setData({
        history: this.data.history
      })
    }
    this.rq(e.detail.value.id)
  },
  rq(value) {
    //搜索方法
    let that = this
    wx.showLoading({
      title: '查找中',
    })
    rquest(`/pc-as/players?filter[playerNames]=${value}`).then(res => {
      wx.hideLoading()
      if (res.statusCode !== 200) {
        return wx.showToast({
          title: '用户名错误',
          icon: 'none'
        })
      }
      console.log(res)
      rquest(`/pc-as/players/${res.data.data[0].id}/seasons/lifetime`).then(res => {
        console.log(res)
        that.setData({
          playLife: res.data.data.attributes.gameModeStats
        })
      })
      that.setData({
        player: res.data.data[0]
      })
      app.globalData.player = res.data.data[0]
    }).catch(err => {
      wx.showToast({
        title: '网速太慢，再试试吧o(╥﹏╥)o',
        icon: 'none'
      })
    })
  },
  historySearch(e) { //历史记录搜索

    this.setData({
      searchValue: e.currentTarget.dataset.historyvalue
    })
    this.rq(e.currentTarget.dataset.historyvalue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const history = wx.getStorageSync('history')
    if (history) {
      this.setData({
        history: history
      })
    }
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