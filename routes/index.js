
// Configuration
var USER_ACCESS_TOKEN = 't4Y6i7zImanykG7BGBEF6vSH54A1BVLoyt6YfwFNUbU';  // https://a.ninja.is/hacking
var RGBLEDGUID        = '1012BB013266_0_0_1007';        // https://a.ninja.is/home


// Instantiate a new ninja app
var ninja = require('ninja-blocks').app({user_access_token:USER_ACCESS_TOKEN});
// Create a container for these devices
var DEVICES = {};


// When we start up we fetch all of a users' devices.
// This is so we don't have to fetch them on every Ninja callback.
// Unfortunately it requires the app to be restarted to pull new devices.
// You can put this into a setInterval to avoid this.
ninja.devices(function(err,devices) {

  DEVICES = devices;
});


/*
 * Handle the callback from the Ninja platform
 */
exports.handleNinjaCallback = function(req, res){

  console.log('Received %s from %s',req.body.DA,req.body.GUID);

  // This little bit of code will turn your LED light off
  // if it changes to anything but off.
  if (req.body.GUID === RGBLEDGUID && req.body.DA !== "FF0000") {
    ninja.device(RGBLEDGUID).actuate('FF0000');
  }

  // Very important to end the response.
  res.end();
};
