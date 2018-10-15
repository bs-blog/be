const Base = require('../../lib/daoBase.js')

module.exports = class Categorys extends Base {
  constructor(database, ref) {
    super(database)

    if (ref) this.ref = ref
    else this.ref = this.database.ref('System/')
  }

  fetchDataFunction(cb) {
    this.ref.on('value', snap => {
      this.data = snap.val()
      super.fetchDataFunction(cb)
    })
  }

  update(payload) {
    if (!payload.createdAt) {
      const updatedAt = new Date().getTime()
      payload = { ...payload, updatedAt }
    }

    if (this.validateUpdatePayload(payload)) return super.update(payload)

    return Promise.reject('invalidate Data')
  }
}
