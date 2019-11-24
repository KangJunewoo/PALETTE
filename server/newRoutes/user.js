var express = require('express');
var router = express.Router();
var User = require('../newModels/User_new');
var passport = require('passport');

//이걸로 나중에 리팩토링 할때 코딩스타일 통일하자.
router.get('/', (req,res)=>{
  User.find(req.query).exec((err,users)=>{
    if(err) throw err;
    else res.status(200).json(users);
  });
});

router.get('/my', (req,res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({'message': 'not logged in'})
  } else {
    res.status(200).json(req.user)
  }
});

router.post('/update', (req,res)=>{
  console.log(req.body);
  console.log(req.user);
  User.findOneAndUpdate({email:req.user.email},{
    dob:req.body.dob,
    address:req.body.address,
    introduce:req.body.introduce,
    grade:req.body.grade,
    class:req.body.class,
    work_exp:req.body.work_exp,
    fun_facts:req.body.fun_facts,
  }, (err, updatedUser)=>{
    if(err) res.status(500).json(err);
    else{
      updatedUser.saveUser();
      res.status(200).json({status:'user update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  User.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'user delete complete'});
  });
});

router.get('/:id', (req,res)=>{
  User.findById(req.params.id).exec((err,user)=>{
    if(err) throw err;
    else res.status(200).json(user);
  });
});

module.exports = router;