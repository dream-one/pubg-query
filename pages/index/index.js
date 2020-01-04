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
    kda: 0,
    player: null,
    playLife: null, //玩家寿命状态
    gameMode: [{
      name: '单人-第三人称',
      enname: 'solo'
    }, {
      name: '单人-第一人称',
      enname: 'solo - fpp'
    }, {
      name: '双人-第三人称',
      enname: 'duo',
    }, {
      name: '双人-第一人称',
      enname: 'duo-fpp'
    }, {
      name: '四人-第三人称',
      enname: 'squad'
    }, {
      name: '四人-第一人称',
      enname: 'squad-fpp'
    }],
    index: 0
  },
  //更换游戏模式
  changMode(e) {
    let mode = this.data.gameMode[e.detail.value].enname
    let playLife = this.data.playLife
    let kda = this.countKD(playLife[mode].kills, playLife[mode].roundsPlayed - playLife[mode].wins)
    this.setData({
      index: e.detail.value,
      kda
    })
  },
  //计算KD
  //kills 击杀数
  //plays 死亡数
  countKD(kills, plays) {
    let num = kills / plays
    if (num) {
      return num.toFixed(2)
    } else {
      return 0
    }
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
    //请求玩家
    rquest(`/pc-as/players?filter[playerNames]=${value}`).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.statusCode !== 200) {
        return wx.showToast({
          title: '用户名错误',
          icon: 'none'
        })
      }
      //请求数据
      rquest(`/pc-as/players/${res.data.data[0].id}/seasons/lifetime`).then(res => {
        let playLife = res.data.data.attributes.gameModeStats
        //处理数据，小数点保留1位
        for (let i in playLife) {
          //单场存活时间
          playLife[i].mostSurvivalTime = (playLife[i].mostSurvivalTime / 60).toFixed(1)
          //总存活时间
          playLife[i].timeSurvived = (playLife[i].timeSurvived / 60).toFixed(1)
          //开车里程
          playLife[i].rideDistance = (playLife[i].rideDistance / 1000).toFixed(1)
          //游泳里程
          playLife[i].swimDistance = (playLife[i].swimDistance / 1000).toFixed(1)
        }
        let kda = this.countKD(playLife['solo'].kills, playLife['solo'].roundsPlayed - playLife['solo'].wins)
        that.setData({
          playLife,
          kda
        })
      })
      that.setData({
        player: res.data.data[0]
      })
      app.globalData.player = res.data.data[0]
    }).catch(err => {
      console.log(err)
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