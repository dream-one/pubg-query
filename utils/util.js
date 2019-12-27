const header = {
  'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjIwYTA4MC0wNzhkLTAxMzgtNzExMy0yZGY4YzdjNjQ2ZmYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTc3MDkwMzA1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InpqY29kZXIxOTk5LWdtIn0.VX9MNBaYwKCTMT-x6oz8pHOL66BBvLhmqMvg5KX0QDU',
  'Accept': 'application/vnd.api+json'
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const rquest = (url, data, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.pubg.com/shards' + url,
      data,
      header,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: resolve,
      fail: function() {
        reject() // fail
      },
      complete: function() {
        // complete
      }
    })
  })
}
module.exports = {
  formatTime: formatTime,
  rquest
}

wx.request({
  url: "https://api.pubg.com/shards/pc-as/players?filter[playerNames]=ZHANG_JUNNB",
  header ,
  success(res) {
  }
})