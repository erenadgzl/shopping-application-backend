const jwt = require('jsonwebtoken');
const UserType=require("../models/userType")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;

        UserType.findById(req.userData.userType).exec().then(
         result=>{
            if(result.type===2){
                next();
            }
            else {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
        }
        ).catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
            
       
        
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};