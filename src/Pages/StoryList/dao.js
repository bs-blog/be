const Base = require('../../lib/daoBase.js')
const { reader: storyParser } = require('../../lib/dataParser/story')

module.exports = class Categorys extends Base {
  constructor(database, ref) {
    super(database)

    if (ref) this.ref = ref
    else this.ref = this.database.ref('Storys/')
  }

  fetchDataFunction(cb) {
    this.ref.on('value', snap => {
      this.data = snap.val()
      super.fetchDataFunction(cb)
    })
  }

  normalize(result) {
    const list = this.fbListToArray(result)
    return list.map(item => storyParser(item))
  }

  create(payload) {
    return super.create({
      ...payload,
      status: 'DRAFT'
    })
  }
}
