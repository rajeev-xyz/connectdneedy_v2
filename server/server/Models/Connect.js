var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var providerModel = require('./providerSchema');
var seekerModel = require('./seekerSchema');
var volunteerModel = require('./volunteerSchema');

var connectSchema = {

     providerRequestObj: {
        type:Schema.ObjectId, ref:'providerModel'
     },

        seekerRequestObj: {
            type:Schema.ObjectId, ref:'seekerModel'
         },

     volunteerRequestObj: {
              type:Schema.ObjectId, ref:'volunteerModel'

     },

     availDate: {
        type: String

     },

     slot: {
        type: String
     },

     quantity: {
        type:Number //Provider Quantity
     },

     itemType : {
        type:String

     },

     active : {
        type: Boolean
     },

     deleteRecord: {
        type: Boolean
     }

};


var Connect = new mongoose.Schema(connectSchema);
module.exports = mongoose.model('connect',Connect,'Connect');