const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserType=require("../models/userType")

const APP_URL="http://localhost:3000"

exports.user_signup = (req, res, next) => {
  var typeuser
  UserType.findOne({type: 0}, function(err, document) {
    typeuser= document._id 
  })
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                phone: req.body.phone,
                userType:typeuser,
                password: hash
              });
              user
                .save()
                .then(result => {
                  res.status(201).json({
                    message: "User created",
                    id:result._id
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  }

  exports.user_login =  (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                phone: user[0].phone,
                email: user[0].email,
                userId: user[0]._id,
                userType: user[0].userType
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  exports.user_delete =  (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  exports.user_update_userType = (req, res, next) => {
    const id=req.params.userId
    const userType=req.query.userType
    var temp
    
    UserType.findOne({type: userType})
    .exec()
    .then(docs=>{
      temp= docs._id 

      User.update({_id:id},{userType:temp})
        .exec()
        .then(result=>{
            
          res.status(200).json({
            message:"User updated",
        })
        })
        
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
  }

  
exports.users_get_user = (req,res,next)=>{
  const id=req.params.userId
  User.findById(id)
  .select('-__v')
  .exec()
  .then(doc=>{
          
          if (doc) {
             res.status(200).json({
                 Id:doc._id,
                 email:doc.email,
                 phone:doc.phone,
                 request:'GET',
                 url:APP_URL+'/users/'+doc._id
             }) 
          } else {
             res.status(404).json({message:"No valid entry found for provided ID"}) 
          }    
      })
  .catch(
      err=>{
      console.log(err)
      res.status(500).json({error:err})
      })
}

exports.users_update_user = (req, res, next) => {
  const id=req.params.userId
  const updateOps={}

  for(const ops of req.body){
      updateOps[ops.propName]=ops.value
  }

  if(updateOps["password"]!=null){
    bcrypt.hash(updateOps["password"], 10, (err, hash) => {
      updateOps["password"]=hash
      update()
    });
  }
  else{
    if(updateOps["email"]!=null){
    User.find({ email: updateOps["email"] })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          update()
        }
      });
  }
  else{
    update()
  }   
  }
  

  function update(){
    User.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"User updated",
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
  
  }
  
  
}

exports.users_get_all = (req,res,next)=>{
  var email

    if(req.query.email){
      
        email={email:req.query.email}
        find(email)
    }else{
        find()
    }

    function find(email){
      User.find(email)
      .select('-__v')
      .exec()
      .then(docs=>{
         res.status(200).json({
             count: docs.length,
             Users: docs
         }) 
      })
      .catch(err=>{
          console.log(err)
          res.status(500).json({
              error:err
          })
      })
    }
  
  
}