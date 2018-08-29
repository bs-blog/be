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

  updateById(id, payload) {
    if (!payload.createdAt) {
      const updatedAt = new Date().getTime()
      payload = { ...payload, updatedAt }
    }

    if (this.validateUpdatePayload(payload)) return this.ref.child(id).update(payload)

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

    return this.ref
      .push()
      .set(payload)
      .then(() => {
        return this.ref.once('value')
      })
      .then(snap => {
        return snap
      })
  }

  // delete -=-=--=-=-=-=-=-=-=--=-=-=-=-=
  deleteById(id) {
    return this.ref.child(id).remove()
  }
}
