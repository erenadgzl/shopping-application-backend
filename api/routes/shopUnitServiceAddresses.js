const express=require('express')
const router=express.Router()

const ShopUnitServiceAdressesController=require("../controllers/shopUnitServiceAddresses")

router.get('/', ShopUnitServiceAdressesController.ShopUnitServiceAddresses_get_all)
router.get('/:shopUnitServiceAddressId',ShopUnitServiceAdressesController.ShopUnitServiceAddresses_get_adress )
router.post('/', ShopUnitServiceAdressesController.ShopUnitServiceAddresses_create_ShopUnitServiceAddress)
router.patch('/:shopUnitServiceAddressId',ShopUnitServiceAdressesController.ShopUnitServiceAddresses_update_ShopUnitServiceAddress)
router.delete('/:shopUnitServiceAddressId',ShopUnitServiceAdressesController.ShopUnitServiceAddresses_delete_ShopUnitServiceAddress)


module.exports=router