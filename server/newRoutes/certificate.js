var express = require('express');
var router = express.Router();
var Certificate = require('../newModels/Certificate');

router.get('/', (req,res)=>{
  if(req.query.id){
    Certificate.findOne({_id:req.query.id}).exec((err,certificate)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(certificate);
    })
  } else{
    Certificate.find({}).exec((err,certificates)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(certificates);
    });
  }
});

router.post('/create', (req,res)=>{
  var newCertificate = new Certificate();
  newCertificate.type = req.body.type;
  newCertificate.description = req.body.description;
  newCertificate.issue_date = req.body.issue_date;
  //사진업로드처리 잊지말자.
  newCertificate.photo = req.body.photo;
  newCertificate.portfolio = req.body.portfolio;
  newCertificate.issuer = req.body.issuer;

  newCertificate.saveCertificate((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'certificate create complete'});
  });
});

router.post('/update', (req,res)=>{
  Certificate.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedCertificate)=>{
    if(err) res.status(500).json(err);
    else{
      updatedCertificate.saveCertificate();
      res.status(200).json({status:'certificate update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Certificate.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'certificate delete complete'});
  });
});

module.exports = router;