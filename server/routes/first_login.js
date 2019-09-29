//router for first logged-in user
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Pfolio = require('../models/Pfolio');
var School = require('../models/School');
var Club = require('../models/Club');

router.post('/', (req,res,next)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  User.findOneAndUpdate({email:req.user.email}, {
    dob:req.body.dob,
    address:req.body.address,
    bio:req.body.bio,
    grade:req.body.grade,
    class:req.body.class,
    work_exp:req.body.work_exp,
    fun_facts:req.body.fun_facts,
    s_i:req.body.s_i,
  }, (err,updateUser)=>{
    if(err) throw err;
    updateUser.saveUser();
  });
  //return res.redirect('/first_login/pfolio');
});

//saves questions of portfolio
router.post('/pfolio', (req,res,next)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  
  var l=[], a=[],p=[],i=[];

  l.push(req.body.pos0,req.body.pos1,req.body.pos2,req.body.pos3,req.body.pos4,req.body.pos5,req.body.pos6,req.body.pos7,req.body.pos8,req.body.pos9);
  a.push(req.body.awards0,req.body.awards1,req.body.awards2,req.body.awards3,req.body.awards4,req.body.awards5,req.body.awards6,req.body.awards7,req.body.awards8,req.body.awards9);
  p.push(req.body.projs0,req.body.projs1,req.body.projs2,req.body.projs3,req.body.projs4,req.body.projs5,req.body.projs6,req.body.projs7,req.body.projs8,req.body.projs9);
  i.push(req.body.interns0,req.body.interns1,req.body.interns2,req.body.interns3,req.body.interns4,req.body.interns5,req.body.interns6,req.body.interns7,req.body.interns8,req.body.interns9);  
  
  Pfolio.findOne({user:req.user._id}).exec((err,pfolio)=>{
    if(err) throw err;
  
    var k=0;
    for(k=0;k<10;k++){
      pfolio.pos.push(l[k]);
      pfolio.awards.push(a[k]);
      pfolio.projs.push(p[k]);
      pfolio.interns.push(i[k]);
    }
    
    pfolio.savePfolio((err)=>{
      if(err) throw err;

    });
  });
  //return res.redirect('/first_login/smc');
});

//saves questions of school, (major,) and club
router.post('/smc', (req,res,next)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  console.log(req.body);
  //console.log(req.body.club);
  User.findOneAndUpdate({email:req.user.email},{
    school:req.body.school,
    clubs:req.body.club,
    is_new:false,
  },(err,updateUser)=>{
    if(err) throw err;
    updateUser.saveUser();
    
  });
  //return res.redirect('/main');
});

module.exports = router;