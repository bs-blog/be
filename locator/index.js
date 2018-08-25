const fs = require('fs')
const path = require('path')

const clientLocatorPath = './public/static/locator.js'

// content could be a for loop
const contentFirebase = require('./firebase')()
const contentEnv = require('./env')()

fs.writeFileSync(path.join(clientLocatorPath), `${contentFirebase}${contentEnv}`)

