//router for signup
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for signup page
router.get('/', (req,res,next)=>{
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  return res.render('authentication/signup',{
    ct:{
      feedback:feedback,
    }
  });
});

//for signup procedure
router.post('/', passport.authenticate('local-signup',{
  failureRedirect:'/signup',
  failureFlash:true,
}), function(req,res){
  console.log("회원가입성공");
  return res.redirect('/..');
});

module.exports = router;