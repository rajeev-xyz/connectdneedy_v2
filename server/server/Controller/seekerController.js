var mongoose            = require('mongoose');
var Schema = mongoose.Schema;
var SeekerDAO             = require('../DAO/SeekerDAO');
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var seekerDAO = new SeekerDAO();

function resultCallback(err,data,res){
    if(!err){
        console.log('Data returned from Server is ' + JSON.stringify(data));
        seekerDAO.insertIfMatchFound(data);
        res.send( { success: data } );
    }else{
        res.send( { error: "Not found!!!"} );
    }
}

module.exports = {
getSeekerRequestById: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        seekerDAO.getById(id, function (err, data) {
            resultCallback(err, data, res)
        });
    },

saveSeekerRequest : function (req, res) {
                     //var data = new Object();
                     //data = req.body;
                     var data = JSON.parse(JSON.stringify(req.body));

                     data._id = mongoose.Types.ObjectId();
                     //data._id = ObjectIdSchema;
                     console.log('Data from req.body ' + JSON.stringify(data));
                     seekerDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res);
                     });
                 },
updateSeekerRequest : function (req, res) {
                     //var data = new Object();
                     //data = req.body;
                     var data = {
                     _id: req.params.id,
                     name :req.body.name
                     }
                     //data._id = ObjectIdSchema;
                     console.log('Data from req.body ' + JSON.stringify(data));
                     seekerDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res);
                     });
                 },
removeSeekerRequest: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        seekerDAO.remove(id, function (err, data) {
            resultCallback(err, data, res)
        });
    }



};
