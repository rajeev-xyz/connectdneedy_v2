var mongoose            = require('mongoose');
var Schema = mongoose.Schema;
var ProviderDAO             = require('../DAO/ProviderDAO');
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var matchController = require('./matchController');

var providerDAO = new ProviderDAO();

function resultCallback(err,data,res,ops,request){
    if(!err){
        console.log('Data returned from Server is ' + JSON.stringify(data));
        matchController.processRequest(data,ops,request,res);


        //res.send( { success: data } );
    }else{
    console.log('Error is ' + JSON.stringify(err));
        res.send( { error: "Not found!!!"} );
    }
}

module.exports = {

getProviderRequestById: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        providerDAO.getById(id, function (err, data) {
            resultCallback(err, data, res,"get","provider");
        });
    },

saveProviderRequest : function (req, res) {

                     
                     var data = JSON.parse(JSON.stringify(req.body));
                     
                     //console.log("data to be inserted is :" + JSON.stringify(data));
                     data._id = mongoose.Types.ObjectId();
                     console.log('Request is ' + JSON.stringify(data));
                     providerDAO.save(data, function (err, doc) {

                         resultCallback(err, doc, res,"insert","provider");
                     });
                 },
updateProviderRequest : function (req, res) {
                     var data = {
                     _id: req.params.id,
                     name :req.body.name
                     }
                     console.log('Data from req.body ' + JSON.stringify(data));
                     providerDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res,"update","provider");
                     });
                 },
removeProviderRequest: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        providerDAO.remove(id, function (err, data) {
            resultCallback(err, data, res,"delete","provider");
        });
    }

};
