module.exports = function(){
  return `
      window.ENV =  "${process.env.ENV}"
      window.ROUTER_BASENAME =  "${process.env.ROUTER_BASENAME || ''}"
  `
}
