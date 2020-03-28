const express=require('express')
const router=express.Router()
const multer = require('multer');
const ShopsController=require("../controllers/shops")


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/shops_logo');
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

router.get('/',ShopsController.shops_get_all)
router.post('/',upload.single('logo'),ShopsController.shops_create_shop)
router.get('/:shopId',ShopsController.shops_get_shop)
router.patch('/:shopId',ShopsController.shops_update_shop)
router.delete('/:shopId',ShopsController.shops_delete_shop)
router.patch('/image/:shopId',upload.single('logo'),ShopsController.shops_update_logo)
module.exports=router