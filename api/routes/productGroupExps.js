const express=require('express')
const router=express.Router()

const ProductGroupExpController=require("../controllers/productGroupExps")

router.get('/',ProductGroupExpController.productGroupExps_get_all)
router.get('/:groupExpId',ProductGroupExpController.productGroupExps_get_groupExp)
router.post('/',ProductGroupExpController.productGroupExps_create_groupExp)
router.patch('/:groupExpId',ProductGroupExpController.productGroupExps_update_groupExp)
router.delete('/:groupExpId',ProductGroupExpController.productGroupExps_delete_groupExp)

module.exports=router