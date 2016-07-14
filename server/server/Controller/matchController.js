var mongoose            = require('mongoose');
var providerModel = require('../Models/providerSchema');
var seekerModel = require('../Models/seekerSchema');
var volunteerModel = require('../Models/volunteerSchema');
var notificationModel = require('../Models/Notification');
var NotificationDAO             = require('../DAO/NotificationDAO');
var http = require('https');
var request = require('request');


function calcDistance(a, b, res) {
    var sourceX = a.location.lat;
    var sourceY = a.location.lng;

    var str = '';
    b.forEach(function(ele) {
        console.log('Location of the seeker is ' + JSON.stringify(ele.location));
        str += '|' + ele.location.lat + ',';
        str += ele.location.lng;
        console.log('str inside the loop is ' + str);
    });

    console.log('String is ' + str);
    var URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + sourceX + ',' + sourceY + '&destinations=' + str.substring(1) + '&key=AIzaSyAr9mUTDM3TlMHp1QNMFmIy4ro29ezV4kk';
    console.log('final URL is ' + URL);

    request(URL, function(error, response, body) {
        //resp.setEncoding('utf8');
        var finalSeek = [];
        if (!error && response.statusCode == 200) {
            console.log('Response is ' + body);
            body = JSON.parse(body);
            body.rows[0].elements.forEach(function(ele, index) {
                if (ele.distance.value / 1000 <= a.radius) {
                    finalSeek.push(b[index]);
                }

                console.log('Final Seek is ' + finalSeek);

            });
          //  if(a.mode!=="self")
            //{
                var data = {};
                data.availDate = a.availDate;
                data.slot = a.slot;
                data._id = mongoose.Types.ObjectId();
                data._providerObj= a._id;
                //data._providerObj= a.location;

                data.quantity = a.quantity;
                data.itemType = a.itemType;
                data.state = "requested";
                data.recipients = [];
                finalSeek.forEach(function(ele){
                    var obj = {};
                    obj.id = ele._id.$oid;
                    obj.type = ele.constructor.modelName?"seeker":"volunteer";
                    data.recipients.push(obj);
                });

                var ndao = new NotificationDAO();
                ndao.save(data,function(err,doc){
                    if(err){
                        console.log('Error in saving Seeker + volunteer ' + err);
                    }
                    else
                        console.log('Data returned after save is '+ JSON.stringify(doc));

                })
            //}
            res.send(finalSeek);
            // Print the google web page.
        }

    });


}

function calcDistance2(a, b, res) {
    var sourceX = a.location.lat;
    var sourceY = a.location.lng;

    var str = '';
    b.forEach(function(ele) {
        console.log('Location of the seeker is ' + JSON.stringify(ele.location));
        str += '|' + ele.location.lat + ',';
        str += ele.location.lng;
        console.log('str inside the loop is ' + str);
    });

    console.log('String is ' + str);
    var URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + sourceX + ',' + sourceY + '&destinations=' + str.substring(1) + '&key=AIzaSyAr9mUTDM3TlMHp1QNMFmIy4ro29ezV4kk';
    console.log('final URL is ' + URL);

    request(URL, function(error, response, body) {
        //resp.setEncoding('utf8');
        var finalProvider = [];
        if (!error && response.statusCode == 200) {
            console.log('Response is ' + body);
            body = JSON.parse(body);
            body.rows[0].elements.forEach(function(ele, index) {
                if (ele.distance.value / 1000 <= a.radius) {
                    finalProvider.push(b[index]);
                }

                console.log('Final Provider is ' + finalProvider);

            });

            res.send(finalProvider);
            // Print the google web page.
        }

    });
}



function handleProviderRequest(data, ops, res) {
    if (ops === "insert")
        handleProviderInsert(data, res);
    else if (ops === "update")
        handleProviderUpdate(data, res);
    else if (ops === "delete")
        handleProviderDelete(data, res);
    else
        console.log("Error in Provider Operation");
}

function handleSeekerRequest(data, ops, res) {
    if (ops === "insert")
        handleSeekerInsert(data, res);
    else if (ops === "update")
        handleSeekerUpdate(data, res);
    else if (ops === "delete")
        handleSeekerDelete(data, res);
    else
        console.log("Error in Seeker Operation");

}

function handleVolunteerRequest(data, ops, res) {
    if (ops === "insert")
        handleSeekerInsert(data, res);
    else if (ops === "update")
        handleSeekerUpdate(data, res);
    else if (ops === "delete")
        handleSeekerDelete(data, res);
    else
        console.log("Error in Seeker Operation");

}

function handleProviderInsert(data, res) {

        console.log("In Match Handle Provider");
        if (data.mode === "self") {
            //calcDistance(data.location, data.location);
            seekerModel.find({
                "availDate": data.availDate,
                "slot": data.slot,
                 "requiredQuantity": 15

            }, function(err, seekers) {
                if (err) {
                    console.log("error in matching seekers " + err);
                } else {
                    var seek = [];
                    seekers.forEach(function(element, index, array) {

                        seek.push(element);


                    }); //check for radius
                    console.log('Seek is ' + seek.length);
                    calcDistance(data, seek, res);
                    //seek.push(array[index]);
                }

            });

        } else {
            volunteerModel.find({
                "availDate": data.availDate,
                "slot": data.slot
            }, function(err, volunteers) {
                if (err) {
                    console.log("error in matching volunteers with providers");
                } else {


                    var volunteerAndSeeker = [];
                    volunteers.forEach(function(element, index, array) {
                        volunteerAndSeeker.push(element); //insert in Notification table

                    });

                    seekerModel.find({
                        "availDate": data.availDate,
                        "slot": data.slot
                    }, function(err, seekers) {
                        if (err) {
                            console.log("error in matching volunteers with providers");
                        } else {
                            seekers.forEach(function(element, index, array) {
                                volunteerAndSeeker.push(element);

                            });
                            calcDistance(data, volunteerAndSeeker, res);
                        }
                    });


                }

            });



        }




}

function handleSeekerInsert(data, res) {
/*
    volunteerModel.find({
                "availDate": data.availDate,
                "slot": data.slot
            }, function(err, volunteers) {
                if (err) {
                    console.log("error in matching volunteers with seekers");
                } else {


                    var volunteerAndSeeker = [];
                    volunteers.forEach(function(element, index, array) {
                        volunteerAndSeeker.push(element); //insert in Notification table

                    });


                    notificationModel.find({
                        "availDate": data.availDate,
                        "slot": data.slot,
                        "state":"requested"

                    }, function(err, notifications) {
                        if (err) {
                            console.log("error in matching volunteers with providers");
                        } else {
                            notifications.forEach(function(element, index, array) {
                                providerAndSeeker.push(element);

                            });
                            calcDistance2(data, providerAndSeeker, res);
                        }
                    });


                }

            });

*/
}

function handleProviderUpdate(data, res) {



}

/*function handleProviderDelete(data, res){
    notificationModel.find({

    },function(err,))

}*/

function match(data, request, res) {

}


module.exports = {

    processRequest: function(data, ops, request, response) {
        switch (request) {
            case "provider":
                handleProviderRequest(data, ops, response);
                break;

            case "seeker":
                handleSeekerRequest(data, ops, response);
                break;

            case "volunteer":
                handleVolunteerRequest(data, ops, response);
                break;

        }
    }


}