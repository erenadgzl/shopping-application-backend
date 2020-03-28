const express=require('express')
const router=express.Router()

const UserAdressesController=require("../controllers/userAddresses")

router.get('/', UserAdressesController.userAddresses_get_all)
router.get('/:userAddressId',UserAdressesController.userAddresses_get_userAddress )
router.post('/', UserAdressesController.userAddresses_create_userAddress)
router.patch('/:userAddressId',UserAdressesController.userAddresses_update_userAddress)
router.delete('/:userAddressId',UserAdressesController.userAddresses_delete_userAddress)


module.exports=router