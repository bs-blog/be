// rlr : real time reader
module.exports = class Base {
  constructor(database) {
    this.database = database
    this.data = null
    this.ref = null
  }

  static fbListToArray(fbList) {
    if (!fbList) return []
    return Object.entries(fbList).map(([id, item]) => ({
      ...item,
      id
    }))
  }

  // fetchData -=-=--=-=-=-=-=-=-=--=-=-=-=-=
  normalize(result) {
    return result
  }

  fetchDataFunction(cb) {
    this.data = this.normalize(this.data)
    cb(this.data)
  }

  fbListToArray(fbList) {
    return Base.fbListToArray(fbList)
  }

  on(cb) {
    this.fetchDataFunction(cb)
  }

  // update -=-=--=-=-=-=-=-=-=--=-=-=-=-=
  validateUpdatePayload(payload) {
    return true
  }
  update(payload) {
    return fetch('/ajax/system/reset').then(() => this.ref.update(payload))
  }

  updateById(id, payload) {
    if (!payload.createdAt) {
      const updatedAt = new Date().getTime()
      payload = { ...payload, updatedAt }
    }

    if (this.validateUpdatePayload(payload)) {
      return fetch('/ajax/system/reset').then(() => this.ref.child(id).update(payload))
    }

    return Promise.reject('invalidate Data')
  }

  // create -=-=--=-=-=-=-=-=-=--=-=-=-=-=
  validateCreatePayload(payload) {
    return true
  }

  create(payload) {
    if (!this.validateCreatePayload(payload)) return Promise.reject('invalidate Data')

    if (!payload.createdAt) {
      const createdAt = new Date().getTime()
      const updatedAt = createdAt
      payload = { ...payload, createdAt, updatedAt }
    }

    return fetch('/ajax/system/reset')
      .then(() => this.ref.push().set(payload))
      .then(() => this.ref.once('value'))
  }

  // delete -=-=--=-=-=-=-=-=-=--=-=-=-=-=
  deleteById(id) {
    return fetch('/ajax/system/reset').then(() => this.ref.child(id).remove())
  }
}
