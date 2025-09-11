const CryptoJS = require('crypto-js')

const KEY = process.env.API_AUTH_KEY

function decryptToken(token) {
  const bytes = CryptoJS.AES.decrypt(token, KEY)
  const str = bytes.toString(CryptoJS.enc.Utf8)
  try {
    const info = JSON.parse(str)
    const gap = Date.now() - info.dt
    if (Math.abs(gap) > 1000 * 60 * 5) {
      console.error('token expired, gap: ', gap)
      return null
    }
    return info
  } catch (e) {
    return null
  }
}

module.exports = {
  decryptToken
}