var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var userModel = require('./userSchema');
console.log('User Model is ' + userModel);

var seekerSchema = {

      _userObj: {
             //type:Schema.Types.ObjectId, ref:'User'
             type:Object
          },


     location: {
        type:{lat:String,lng:String}

     },

     radius: {
        type: Number

     },
     availDate: {
        type: String

     },

     slot: {
        type: String
     },

     quantity: {
        type:Number
     },

     requiredQuantity:{
        type:Number
     },

       mode: {
             type:String
          },


     itemType : {
        type:String

     },

     remarks: {
        type:String

     },
     deleteRecord:{

             type:Boolean
          },

          active: {
             type:Boolean
          }


};


var Seeker = new mongoose.Schema(seekerSchema);
module.exports = mongoose.model('seeker',Seeker,'SeekerRequest');