const express=require('express')
const router=express.Router()
const multer = require('multer');
const ProductsController=require("../controllers/products")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/products');
  },
  filename: function(req, file, cb) {
      var time = new Date();
      var hour = time.getHours();
      var minute = time.getMinutes();
      var second = time.getSeconds();
      var day = time.getDate();
      var monthIndex = time.getMonth();
      var year = time.getFullYear();
      var date=year+'-'+monthIndex+'-'+day+'-'+hour+'-'+minute+'-'+second;

    cb(null, date + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};    
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
     


router.get('/',ProductsController.products_get_all)
router.get('/:productId', ProductsController.products_get_product)
router.post('/',upload.single('productImage') , ProductsController.products_create_product)
router.patch('/:productId', ProductsController.products_update_product)
router.delete('/:productId', ProductsController.products_delete_product)
router.patch('/image/:productId',upload.single('productImage') , ProductsController.products_update_productImage)

module.exports=router