const isEmptyObject = myObject => {
  for (var key in myObject) {
    if (myObject.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
const parseQueryString = function() {
  const str = window.location.search
  const objURL = {}

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function($0, $1, $2, $3) {
    objURL[$1] = $3
  })
  return objURL
}

if (window) {
  window.isEmptyObject = isEmptyObject
  window.parseQueryString = parseQueryString
  window.urlQuery = parseQueryString()
}

if (global) {
  global.isEmptyObject = isEmptyObject
  global.parseQueryString = parseQueryString
  global.urlQuery = parseQueryString()
}
