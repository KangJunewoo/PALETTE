var mongoose = require('mongoose');

var clubSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  school:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School',
  },
  pic:{
    type:String,
  },
  info:{
    type:String,
  },
}, {collection:"club"});

clubSchema.methods={
  saveClub:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.saveClub(callback);
    });
  }
}

module.exports=mongoose.model('Club', clubSchema);