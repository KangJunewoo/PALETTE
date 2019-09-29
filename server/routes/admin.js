//이미지처리
//나동빈 강의 참고해서 서버 public에 저장하는 식으로 바꿀것.

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Exc = require('../models/Exc');
var School = require('../models/School');
var Club = require('../models/Club');

var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
require('../models/Upload');
var Grid = require('gridfs-stream');

var mongoose = require('mongoose');
var mongoURI = 'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url:'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test?retryWrites=true&w=majority',
  file:(req,file)=>{
    return new Promise((resolve, reject)=>{
      crypto.randomBytes(16, (err,buf)=>{
        if(err) return reject(err);
        const filename = buf.toString('hex')+path.extname(file.originalname);
        const fileInfo = {
          filename:filename,
          bucketName:'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({storage});

router.get('/', (req,res)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    res.send(user.admin);
    /*
    if(user.admin==false){
      return res.redirect('/main');
    }
    */
  });
  //return res.render('admin');
});


router.post('/exc/create', upload.single('file'), (req,res,next)=>{
  var newExc = new Exc();
  //console.log(res.req); 여기서 file이 없음.
  //왜 이게 안되는가.
  //다른거는 mypage는 file만 보내는거고 여기는 다 보내는건데.
  //mypage처럼 하나만 딱 해보자.
  newExc.pic = res.req.file.id;
  
  newExc.name = req.body.name;
  newExc.info = req.body.info;
  newExc.sch.event = req.body.sche;
  newExc.sch.date = req.body.schd;
  newExc.contact = req.body.contact;
  newExc.due = req.body.due;
  newExc.price = req.body.price;
  newExc.palette = req.body.palette;
  newExc.gu = req.body.gu;
  newExc.location = req.body.location;

  if(req.body.apcnq0!=null){
    newExc.apcnqs.push(req.body.apcnq0);
  }
  if(req.body.apcnq1!=null){
    newExc.apcnqs.push(req.body.apcnq1);
  }
  if(req.body.apcnq2!=null){
    newExc.apcnqs.push(req.body.apcnq2);
  }
  if(req.body.apcnq3!=null){
    newExc.apcnqs.push(req.body.apcnq3);
  }
  if(req.body.apcnq4!=null){
    newExc.apcnqs.push(req.body.apcnq4);
  }

  
  newExc.saveExc((err)=>{
    if(err) throw err;
  });

  //return res.redirect('/admin/exc');

});


router.get('/exc/delete/:id', (req,res)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    res.send(user.admin);
    /*
    if(user.admin==false){
      return res.redirect('/main');
    }
    */
  });
  Exc.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
  //return res.redirect('/admin/exc');
});


router.post('/school/create', upload.single('file'), (req,res,next)=>{
  var newSchool = new School();
  newSchool.pic = res.req.file.id;
  newSchool.name = req.body.name;
  newSchool.address = req.body.address;
  newSchool.info = req.body.info;
  console.log(newSchool);
  newSchool.saveSchool((err)=>{
    if(err) throw err;
  });
  School.find({}).exec((err,schools)=>{
    if(err) throw err;
    console.log(schools);
  });
  //return res.redirect('/admin/school');

});


router.get('/school/delete/:id', (req,res)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    res.send(user.admin);
    /*
    if(user.admin==false){
      return res.redirect('/main');
    }
    */
  });
  School.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
  //return res.redirect('/admin/school');
});


router.post('/club/create', upload.single('file'), (req,res,next)=>{
  var newClub = new Club();
  newClub.pic = res.req.file.id;

  newClub.name = req.body.name;
  newClub.info = req.body.info;
  newClub.school = req.body.school;
  
  console.log(req.body.school);
  console.log(newClub.school);
  
  newClub.saveClub((err)=>{
    if(err) throw err;
  });
  
  School.findOne({_id:newClub.school}).exec((err,school)=>{
    if(err) throw err;
    school.clubs.push(newClub._id);
    school.saveSchool((err)=>{
      if(err) throw err;
    });
  });
  
  //return res.redirect('/admin/club');

});


router.get('/club/delete/:id', (req,res)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    res.send(user.admin);
    /*
    if(user.admin==false){
      return res.redirect('/main');
    }
    */
  });
  //Club.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
  Club.findOne({_id:req.params.id}).exec((err,club)=>{
    if(err) throw err;

    School.findOne({_id:club.school}).exec((err,school)=>{
      if(err) throw err;

      console.log(school.clubs);
      console.log(club._id);
      school.clubs.splice(school.clubs.indexOf(club._id),1);
      console.log(school.clubs);
      school.saveSchool();
    });
    club.remove();
    
  });
  
  //return res.redirect('/admin/club');
});

module.exports = router;