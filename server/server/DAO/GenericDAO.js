function GenericDAO(){
    this.model = null;
}

GenericDAO.prototype.getById = function(id, callback){
    this.model.findById(id, callback);
};

GenericDAO.prototype.getAll = function(callback){
    this.model.find({}, callback);
};

GenericDAO.prototype.save = function(newObject, callback){
    this.model.findOneAndUpdate({_id: newObject._id}, newObject, { upsert : true, "new":true }, callback );
};
GenericDAO.prototype.remove = function(id, callback){
    this.model.findByIdAndRemove( id, {}, callback);
};

GenericDAO.prototype.insertIfMatchFound = function(data,ops,request) {
    console.log('Data in insertIfMatchFound '+ JSON.stringify(data));
    console.log('Operation is '+    ops);
    console.log('Request for '+ request);


};

module.exports = GenericDAO;