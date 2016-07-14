var user        = require('../server/Controller/userController');
var provider        = require('../server/Controller/providerController');
var seeker        = require('../server/Controller/seekerController');
var volunteer        = require('../server/Controller/volunteerController');
var notification        = require('../server/Controller/notificationController');

module.exports.setup = function (app) {
    app.get('/users/:id', user.getUserById);
    app.post('/users/', user.saveUser);
    app.put('/users/:id', user.updateUser);
    app.delete('/users/:id', user.removeUser);

    app.get('/providers/:id', provider.getProviderRequestById);
    app.post('/providers/', provider.saveProviderRequest);
    app.put('/providers/:id', provider.updateProviderRequest);
    app.delete('/providers/:id', provider.removeProviderRequest);

    app.get('/seekers/:id', seeker.getSeekerRequestById);
    app.post('/seekers/', seeker.saveSeekerRequest);
    app.put('/seekers/:id', seeker.updateSeekerRequest);
    app.delete('/seekers/:id', seeker.removeSeekerRequest);

    app.get('/volunteers/:id', volunteer.getVolunteerRequestById);
    app.post('/volunteers/', volunteer.saveVolunteerRequest);
    app.put('/volunteers/:id', volunteer.updateVolunteerRequest);
    app.delete('/volunteers/:id', volunteer.removeVolunteerRequest);

    //app.put('/notifications/', notification.insertToConnect);
    app.post('/notifications/', notification.insertToConnect);


};

