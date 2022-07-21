const jwt = require('jsonwebtoken');
const passport = require('passport')
//const { body, validationResult } = require('express-validator')
const bcrypt= require('bcryptjs');
const User = require('../model/user');
const Post = require('../model/post');

exports.login = async function (req, res, next){
    try{
    passport.authenticate('local', {session: false}, (err, user, info) =>{
      if (err || !user){
        const error = new Error('User does not exist')
        return res.status(403).json({
          info
        })
      }
    req.login(user, {session: false}, (err) => {
      if (err){
        next(err);
      }
      // create token
      const body = {_id: user._id, username: user.username}
      const token = jwt.sign({user: body}, 'secret_key', {expiresIn: '1d'});
  
      return res.status(200).json({body, token});
  
    });
  }) (req, res, next);
  } catch (err){
    res.status(403).json({
      err
    })
  }
  };


exports.logout = (req, res, next) => {
// req.logout() usually used for sessions. localstorage cleared client side instead
console.log('logged out')

};

exports.register = async(req, res, next) => {
    console.log(req.body);
    console.log("im here");
    bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
    const user= new User({
        username:req.body.username,
        password: hashedPassword,
    })
    user.save( err => {
        if (err){
        return next(err)
        }
        res.status(200).json({
        message: 'User created successfully',
        })
        })
    })
};

exports.allposts = async(req,res,next) => {
  try{
    let users = await Post.find({});
    if(!users){
        return res.status(404).json({message:"none found "});
    }
    return res.status(200).json(users);
}catch(err){
    return next(err);
}
}

// exports.allusers = async(req,res,next) => {
//     try{
//         let users = await User.find({});
//         if(!users){
//             return res.status(404).json({message:"none found "});
//         }
//         return res.status(200).json(users);
//     }catch(err){
//         return next(err);
//     }
// }