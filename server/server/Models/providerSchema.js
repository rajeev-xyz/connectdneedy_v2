var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var userModel = require('./userSchema');

var providerSchema = {

     _userObj: {
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

     quantity: {
        type:Number
     },

     itemType : {
        type:String

     },

     mode: {
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


var Provider = new mongoose.Schema(providerSchema);
module.exports = mongoose.model('provider',Provider,'ProviderRequest');