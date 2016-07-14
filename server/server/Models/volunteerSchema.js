var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var userModel = require('./userSchema');

var volunteerSchema = {

     _userObj: {
                  //type:Schema.ObjectId, ref:'userModel'
                  type:Object
               },


     location: {
        type:{lat:String,lng:String}

     },

     radius: {
        type:Number

     },
     availDate: {
        type: String

     },

     slot: {
        type: String
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


var Volunteer = new mongoose.Schema(volunteerSchema);
//console.log('User in schema ' + User);
module.exports = mongoose.model('volunteer',Volunteer,'VolunteerRequest');