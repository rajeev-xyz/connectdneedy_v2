var mongoose    = require('mongoose');
var Schema = mongoose.Schema;
var providerModel = require('./providerSchema');
var recipientSchema = new Schema({ id:String, type:String});
var notificationSchema = {

     _providerObj: {
             type:Schema.ObjectId, ref:'providerModel'
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

    //Volunteer IDs and Seeker IDs
     recipients: [recipientSchema],

     state: {
        type:String

     }


};

var Notification = new mongoose.Schema(notificationSchema);
module.exports = mongoose.model('notification',Notification,'Notification');