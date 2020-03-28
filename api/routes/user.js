const express=require('express')
const router=express.Router()

const userController = require("../controllers/user")


const checkAuth=require('../middleware/check-auth')

router.get('/',userController.users_get_all )
router.get('/:userId',userController.users_get_user )
router.post("/signup",userController.user_signup );
router.post("/login",userController.user_login);
router.delete("/:userId",userController.user_delete );
router.patch("/usertype/:userId",userController.user_update_userType ); //usertype update only for admin
router.patch("/:userId",userController.users_update_user );
module.exports = router;
