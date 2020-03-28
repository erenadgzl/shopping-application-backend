const express=require('express')
const router=express.Router()

const OrderDetailsController=require("../controllers/orderDetails")

router.get('/', OrderDetailsController.orderDetails_get_all)
router.get('/:orderDetailId',OrderDetailsController.orderDetails_get_orderDetail )
router.post('/',OrderDetailsController.orderDetails_create_orderDetail )
router.patch('/:orderDetailId',OrderDetailsController.orderDetails_update_orderDetail)
router.delete('/:orderDetailId',OrderDetailsController.orderDetails_delete_orderDetail)


module.exports=router