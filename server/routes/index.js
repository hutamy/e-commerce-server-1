const router = require('express').Router()
const admin = require('./admin')
const product = require('./product')

router.use('/admin', admin)
router.use('/product', product)

module.exports = router