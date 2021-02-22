const name = 'blog_admin'
const maxAge = 1000 * 60 * 60 * 24 * 30

let authority = {
  get() {
    const data = JSON.parse(window.localStorage.getItem(name)) || { time: 0 }
    if (new Date().getTime() - data.time >= maxAge) {
      this.clear()
      return {}
    }
    return data || {}
  },
  set(obj) {
    obj = JSON.stringify({ ...this.get(), ...obj, time: new Date().getTime() })
    window.localStorage.setItem(name, obj)
  },
  clear() {
    window.localStorage.removeItem(name)
  },
}

export default authority
