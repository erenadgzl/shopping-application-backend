const express=require('express')
const router=express.Router()
const checkAuth=require('../middleware/check-auth')

const UserTypesController=require("../controllers/userTypes")



router.get('/', UserTypesController.userTypes_get_all)
router.get('/:userTypeId',UserTypesController.userTypes_get_userType )
router.post('/', UserTypesController.userTypes_create_userType )
router.patch('/:userTypeId', UserTypesController.userTypes_update_userType)
router.delete('/:userTypeId',UserTypesController.userTypes_delete_userType)



module.exports=router