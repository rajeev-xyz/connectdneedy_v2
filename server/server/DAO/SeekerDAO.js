var GenericDAO = require('./GenericDAO');
var mongoose    = require('mongoose');
var seekerSchema = require('../Models/seekerSchema');
var ObjectId = require('mongodb').ObjectID;
SeekerDAO.prototype = Object.create(GenericDAO.prototype);

function SeekerDAO(){
    this.model = seekerSchema;
}

module.exports = SeekerDAO;