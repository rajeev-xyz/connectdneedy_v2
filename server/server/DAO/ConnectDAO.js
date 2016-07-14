var GenericDAO = require('./GenericDAO');
var mongoose    = require('mongoose');
var connectSchema = require('../Models/Connect');
var ObjectId = require('mongodb').ObjectID;
ConnectDAO.prototype = Object.create(GenericDAO.prototype);

function ConnectDAO(){
    this.model = connectSchema;
}

module.exports = ConnectDAO;