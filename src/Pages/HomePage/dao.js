const Base = require('../../lib/daoBase.js')

module.exports = class Categorys extends Base{
    fetchDataFunction(cb){
        this.ref = this.database.ref('Categorys')
        this.ref.on('value', (snap) => {
            this.data = snap.val()
            super.fetchDataFunction(cb)
        })
    }

    normalize(result) {
        return this.fbListToArray(result)
    }
}