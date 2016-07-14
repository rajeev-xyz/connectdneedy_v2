var mongoose            = require('mongoose');
var Schema = mongoose.Schema;
var UserDAO             = require('../DAO/UserDAO');
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var userDAO = new UserDAO();

function resultCallback(err,data,res,ops,request){
    if(!err){
        console.log('Data returned from Server is ' + JSON.stringify(data));
        userDAO.insertIfMatchFound(data,ops,request);
        res.send( { success: data } );
    }else{
        res.send( { error: "Not found!!!"} );
    }
}

module.exports = {
getUserById: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        userDAO.getById(id, function (err, data) {
            resultCallback(err, data, res,"get","user");
        });
    },

saveUser : function (req, res) {
                      var data = JSON.parse(JSON.stringify(req.body));
                                          //var data = req.body;
                                          data._id = mongoose.Types.ObjectId();
                     console.log('Data from req.body ' + JSON.stringify(data));
                     userDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res,"insert","user");
                     });
                 },
updateUser : function (req, res) {
                     //var data = new Object();
                     //data = req.body;
                     var data = {
                     _id: req.params.id,
                     name :req.body.name
                     }
                     //data._id = ObjectIdSchema;
                     console.log('Data from req.body ' + JSON.stringify(data));
                     userDAO.save(data, function (err, doc) {
                         resultCallback(err, doc, res,"update","user");
                     });
                 },
removeUser: function (req, res) {
        var id = req.params.id;
        console.log('ID is ' + id);
        userDAO.remove(id, function (err, data) {
            resultCallback(err, data, res,"delete","user")
        });
    }



};
