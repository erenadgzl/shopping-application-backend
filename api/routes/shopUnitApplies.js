const express=require('express')
const router=express.Router()
const ShopUnitAppliesController=require("../controllers/shopUnitApplies")


router.get('/',ShopUnitAppliesController.shopUnitApplies_get_all)
router.post('/',ShopUnitAppliesController.shopUnitApplies_create_shop)
router.get('/:shopUnitApplyId',ShopUnitAppliesController.shopUnitApplies_get_shopUnitApply)
router.patch('/:shopUnitApplyId',ShopUnitAppliesController.shopUnitApplies_update_shopUnitApply)
router.delete('/:shopUnitApplyId',ShopUnitAppliesController.shopUnitApplies_delete_shopUnitApply)

module.exports=router