const express=require('express')
const router=express.Router()

const AdressesController=require("../controllers/addresses")

router.get('/', AdressesController.adresses_get_all)
router.get('/:addressId',AdressesController.adresses_get_adress )
router.post('/', AdressesController.adresses_create_adress)
router.patch('/:addressId',AdressesController.adresses_update_adress)
router.delete('/:addressId',AdressesController.adresses_delete_adress)


module.exports=router