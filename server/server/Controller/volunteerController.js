var mongoose            = require('mongoose');
var Schema = mongoose.Schema;
var VolunteerDAO             = require('../DAO/VolunteerDAO');
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var volunteerDAO = new VolunteerDAO();

function resultCallback(err,data,res){
    if(!err){
        console.log('Data returned from Server is ' + JSON.stringify(data));
        volunteerDAO.insertIfMatchFound(data);
        res.send( { success: data } );
    }else{
        res.send( { error: "Not found!!!"} );
    }
}

module.exports = {
getVolunteerRequestById: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        volunteerDAO.getById(id, function (err, data) {
            resultCallback(err, data, res)
        });
    },

saveVolunteerRequest : function (req, res) {
                     //var data = new Object();
                     //data = req.body;
                     var data = JSON.parse(JSON.stringify(req.body));

                     data._id = mongoose.Types.ObjectId();
                     //data._id = ObjectIdSchema;
                     console.log('Data from req.body ' + JSON.stringify(data));
                     volunteerDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res);
                     });
                 },
updateVolunteerRequest : function (req, res) {
                     //var data = new Object();
                     //data = req.body;
                     var data = {
                     _id: req.params.id,
                     name :req.body.name
                     }
                     //data._id = ObjectIdSchema;
                     console.log('Data from req.body ' + JSON.stringify(data));
                     volunteerDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res);
                     });
                 },
removeVolunteerRequest : function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        volunteerDAO.remove(id, function (err, data) {
            resultCallback(err, data, res)
        });
    }



};
