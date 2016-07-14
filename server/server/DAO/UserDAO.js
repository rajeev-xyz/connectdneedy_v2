var GenericDAO = require('./GenericDAO');
var mongoose    = require('mongoose');
var userSchema = require('../Models/userSchema');
var ObjectId = require('mongodb').ObjectID;
UserDAO.prototype = Object.create(GenericDAO.prototype);

function UserDAO(){
    this.model = userSchema;
}


module.exports = UserDAO;