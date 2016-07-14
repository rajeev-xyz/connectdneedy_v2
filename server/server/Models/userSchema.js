var mongoose    = require('mongoose');

var userSchema = {
    id: {
           type: String,
           required: true
       },
     name: {
        type: String

     },

     locations: {
        type:[{lat:String,lng:String}]

     },

     email: {
        type: String
     },

     mobile: {
        type: String

     },
     deleteRecord:{

             type:Boolean
          },

          active: {
             type:Boolean
          }

};


var User = new mongoose.Schema(userSchema);
console.log('User in schema ' + User);
module.exports = mongoose.model('user',User,'User');