const express=require('express')
const router=express.Router()

const ShopUnitStockMovementsController=require("../controllers/shopUnitStockMovements")

router.get('/', ShopUnitStockMovementsController.shopUnitStockMovements_get_all)
router.get('/:shopUnitStockMovementId', ShopUnitStockMovementsController.shopUnitStockMovements_get_shopUnitStockMovement)
router.post('/',ShopUnitStockMovementsController.shopUnitStockMovements_create_shopUnitStockMovement )
router.patch('/:shopUnitStockMovementId',ShopUnitStockMovementsController.shopUnitStockMovements_update_shopUnitStockMovement)
router.delete('/:shopUnitStockMovementId',ShopUnitStockMovementsController.shopUnitStockMovements_delete_shopUnitStockMovement)


module.exports=router