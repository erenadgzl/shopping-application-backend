const express=require('express')
const router=express.Router()

const NeighborhoodsController=require("../controllers/neighborhoods")

router.get('/', NeighborhoodsController.neighborhoods_get_all)
router.get('/:neighborhoodId',NeighborhoodsController.neighborhoods_get_neighborhood )
router.post('/', NeighborhoodsController.neighborhoods_create_neighborhood)
router.patch('/:neighborhoodId',NeighborhoodsController.neighborhoods_update_neighborhood)
router.delete('/:neighborhoodId',NeighborhoodsController.neighborhoods_delete_neighborhood)


module.exports=router