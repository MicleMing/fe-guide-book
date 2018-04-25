/**
 * @file cookie
 */
class Cookie {
  set(value, config = {}) {
    const keys = Object.keys(config)
    const configStr = keys.map(k => `${k}=${config[key]}`).join(';')
    document.cookie = [escape(value), configStr].join(';')
  }
  get(key) {
    const cookie = document.cookie
    const cookieMap = cookie.split(';').reduce((acc, kv) => {
      const pairs = kv.split('=')
      acc[pairs[0]] = unescape(pairs[1])
      return acc
    }, {})
    return cookieMap[key]
  }
}
