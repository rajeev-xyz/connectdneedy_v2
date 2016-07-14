var GenericDAO = require('./GenericDAO');
var mongoose    = require('mongoose');
var providerSchema = require('../Models/providerSchema');
var ObjectId = require('mongodb').ObjectID;
ProviderDAO.prototype = Object.create(GenericDAO.prototype);

function ProviderDAO(){
    this.model = providerSchema;
}


module.exports = ProviderDAO;