const express=require('express')
const router=express.Router()

const CitiesController=require("../controllers/cities")

router.get('/', CitiesController.cities_get_all)
router.get('/:cityId',CitiesController.cities_get_city )
router.post('/', CitiesController.cities_create_city)
router.patch('/:cityId',CitiesController.cities_update_city)
router.delete('/:cityId',CitiesController.cities_delete_city)


module.exports=router