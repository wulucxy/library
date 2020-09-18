module.exports = class {
  constructor(ctx) {
    this.ctx = ctx
  }
  getInstanceInfo(params) {
    const url = ('/api/books/instances')
    return this.ctx.axios
      .get(url, params)
      .then(result => result)
  }
}
