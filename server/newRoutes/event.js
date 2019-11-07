var express = require('express');
var router = express.Router();
var Event = require('../newModels/Event');

router.get('/', (req,res)=>{
  if(req.query.id){
    Event.findOne({_id:req.query.id}).exec((err,event)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(event);
    })
  } else{
    Event.find({}).exec((err,events)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(events);
    });
  }
});

router.post('/create', (req,res)=>{
  var newEvent = new Event();
  newEvent.name = req.body.name;
  //다중이미지처리?
  newEvent.photos = req.body.photos;
  newEvent.description = req.body.description;
  newEvent.start_date = req.body.start_date;
  newEvent.end_date = req.body.end_date;
  newEvent.location = req.body.location;
  newEvent.created = req.body.created;
  newEvent.organize = req.body.organizer;


  newEvent.saveEvent((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'event create complete'});
  });
});

router.post('/update', (req,res)=>{
  Event.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedEvent)=>{
    if(err) res.status(500).json(err);
    else{
      updatedEvent.saveEvent();
      res.status(200).json({status:'event update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Event.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'event delete complete'});
  });
});

module.exports = router;