const express=require('express')
const router=express.Router()
const checkAuth=require('../middleware/check-auth')
const checkAuthUser=require('../middleware/check-auth-user')

const BrandsController=require("../controllers/brands")


       

router.get('/', BrandsController.brands_get_all)
router.get('/:brandId', BrandsController.brands_get_brand)
router.post('/', BrandsController.brands_create_brand)
router.patch('/:brandId', BrandsController.brands_update_brand)
router.delete('/:brandId', BrandsController.brands_delete_brand)


module.exports=router