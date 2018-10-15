
const express = require('express');
const router = express.Router()
const request = require('request');

router.get('/ajax/system/reset', (req, res) => {
  request(process.env.REMOTE_WEB_URL, (err, response, body) => {
    res.json({})
  });
})

module.exports = router