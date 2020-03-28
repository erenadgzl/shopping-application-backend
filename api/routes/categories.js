const express=require('express')
const router=express.Router()

const CategoriesController=require("../controllers/categories")

router.get('/', CategoriesController.categories_get_all)
router.get('/:categoryId', CategoriesController.categories_get_category)
router.post('/', CategoriesController.categories_create_category)
router.patch('/:categoryId',CategoriesController.categories_update_category)
router.delete('/:categoryId',CategoriesController.categories_delete_category)


module.exports=router