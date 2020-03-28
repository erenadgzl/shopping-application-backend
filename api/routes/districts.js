const express=require('express')
const router=express.Router()

const DistrictsController=require("../controllers/districts")

router.get('/', DistrictsController.districts_get_all)
router.get('/:districtId',DistrictsController.districts_get_district )
router.post('/', DistrictsController.districts_create_district)
router.patch('/:districtId',DistrictsController.districts_update_district)
router.delete('/:districtId',DistrictsController.districts_delete_district)


module.exports=router