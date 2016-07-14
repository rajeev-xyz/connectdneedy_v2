var GenericDAO = require('./GenericDAO');
var mongoose    = require('mongoose');
var volunteerSchema = require('../Models/volunteerSchema');
var ObjectId = require('mongodb').ObjectID;
VolunteerDAO.prototype = Object.create(GenericDAO.prototype);

function VolunteerDAO(){
    this.model = volunteerSchema;
}

module.exports = VolunteerDAO;