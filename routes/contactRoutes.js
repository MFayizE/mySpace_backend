const express = require('express')

const router = express.Router()
const {getContact,createContact,updateContact,deleteContact,getContactById} = require('../controllers/contactController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getContact).post(protect,createContact)
router.get('/:id',protect,getContactById)
router.put('/:id',protect,updateContact)
router.delete('/:id',protect,deleteContact)

module.exports = router