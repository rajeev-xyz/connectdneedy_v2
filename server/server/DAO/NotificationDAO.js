var GenericDAO = require('./GenericDAO');
var mongoose    = require('mongoose');
var notificationSchema = require('../Models/Notification');
var ObjectId = require('mongodb').ObjectID;
NotificationDAO.prototype = Object.create(GenericDAO.prototype);

function NotificationDAO(){
    this.model = notificationSchema;
}

module.exports = NotificationDAO;