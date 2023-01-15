const express = require('express')
const router = express.Router()
const path = require('path')

// set up a get api for the root tta matches '/' or index?.html

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router