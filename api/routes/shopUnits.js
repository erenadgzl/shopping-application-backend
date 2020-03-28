const express=require('express')
const router=express.Router()
const ShopUnitsController=require("../controllers/shopUnits")


router.get('/',ShopUnitsController.shopUnits_get_all)
router.post('/',ShopUnitsController.shopUnits_create_shop)
router.get('/:shopUnitId',ShopUnitsController.shopUnits_get_shopUnit)
router.patch('/:shopUnitId',ShopUnitsController.shopUnits_update_shopUnit)
router.delete('/:shopUnitId',ShopUnitsController.shopUnits_delete_shopUnit)

module.exports=router