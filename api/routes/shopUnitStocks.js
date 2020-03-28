const express=require('express')
const router=express.Router()

const ShopUnitStocksController=require("../controllers/shopUnitStocks")

router.get('/', ShopUnitStocksController.shopUnitStocks_get_all)
router.get('/:shopUnitStockId',ShopUnitStocksController.shopUnitStocks_get_shopUnitStock )
router.post('/', ShopUnitStocksController.shopUnitStocks_create_shopUnitStock)
router.patch('/:shopUnitStockId',ShopUnitStocksController.shopUnitStocks_update_shopUnitStock)
router.delete('/:shopUnitStockId',ShopUnitStocksController.shopUnitStocks_delete_shopUnitStock)


module.exports=router