const express=require('express')
const router=express.Router()

const ProductGroupController=require("../controllers/productGroups")

router.get('/',ProductGroupController.productGroups_get_all)
router.post('/',ProductGroupController.productGroups_create_productGroup)
router.get('/:groupId',ProductGroupController.productGroups_get_productGroup)
router.patch('/:groupId',ProductGroupController.productGroups_update_productGroup)
router.delete('/:groupId',ProductGroupController.productGroups_delete_productGroup)

module.exports=router