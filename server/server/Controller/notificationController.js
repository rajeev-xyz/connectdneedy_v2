var mongoose            = require('mongoose');
var ConnectDAO             = require('../DAO/ConnectDAO');
var notificationModel = require('../Models/Notification');
module.exports = {

    insertToConnect: function(req,res){

    var notifID = req.body.notifID;
    var seekerObjID = req.body.seekerObjID;
    var volunteerObjID = req.body.volunteerObjID;
    notificationModel.findOne({"_id":notifID},function(err,notifID){

        var data = {};
        console.log("Notif ID is " + JSON.stringify(notifID));
            data.providerRequestObj = notifID._id;
            data.seekerRequestObj = seekerObjID;
            data.volunteerRequestObj = volunteerObjID;
            data.availDate = notifID.availDate;
            data.slot = notifID.slot;
            data.quantity = notifID.quantity;
            data.itemType = notifID.itemType;
            data.active = "true";
            data._id = mongoose.Types.ObjectId();

               var connect = new ConnectDAO();
                            connect.save(data,function(err,doc){
                                if(err){
                                    console.log('Error in saving Connect ' + err);
                                }
                                else
                                {
                                    console.log('Data returned after save from Connect is '+ JSON.stringify(doc));
                                    res.send(JSON.stringify(doc));

                                }

                            });




    });
    }

    }




