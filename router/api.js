const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');
const bcrypt =require('bcryptjs');
const auth_Controller = require('../controller/authController');
let Policy = require('../model/policy');
let Department = require('../model/department');
let Item =  require('../model/items');


const getItems = async(req,res)=>{console.log('get items');try {const item =await Item.find();res.status(200).json(item);} catch (error) {res.status(404).json({ message: error.message });}}
const createItem = async(req,res)=>{const item = new Item(req.body);try {await item.save();res.status(201).json(item);} catch (error) {}}


router.get('/image',getItems);
router.post('/image',createItem);


router.post('/login', auth_Controller.login);

router.post('/register', auth_Controller.register );

router.get('/posts',passport.authenticate('jwt', {session: false}), auth_Controller.allposts);

router.get('/policies', async (req,res,next)=>{

    try{
        let p = await Policy.find({});
        if(!p){
            return res.status(404).json({message:"none found "});
        }
        return res.status(200).json(p);
    }catch(err){
        return next(err);
    }
});

router.post('/addpolicy',function(req, res) {
    let todo = new Policy(req.body);
    console.log("here");
    console.log(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'policy added successfully'});
            console.log("added todo sucessfully");
        })
        .catch(err => {
            res.status(400).send('adding new policy failed');
        });
});

router.post('/deletepolicy', function(req,res){
    // let id = req.body;
    console.log(req.body);
    Policy.findByIdAndRemove(req.body.id)
    .then(() => {
        res.status(200).json({ message: 'Category deleted successfully!' 
   });
    }).catch(err => res.status(400).json(err));
  }); 
    // res.status(200).json({'todo': 'policy added successfully'});


router.get('/xg', async function(req,res){
    try{
        let p = await Department.find({});
        if(!p){
            return res.status(404).json({message:"none found "});
        }
        return res.status(200).json(p);
    }catch(err){
        return next(err);
    }
})

router.post('/x', async function(req,res){
    let doc;
   // console.log(req.body);
   // res.send("sucess");
    
    await Department.findOneAndUpdate({title : req.body.department}, {description : req.body.description}, {upsert:true});

   // console.log(doc);
    return res.status(200).json({'dep': 'dep updated successfully'});

});


// router.post()


module.exports= router;

