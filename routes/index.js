// Configuration
var USER_ACCESS_TOKEN = 'USER_ACCESS_CODE_FROM_DEVICE';  // https://a.ninja.is/hacking
var RGBLEDGUID        = 'FROM_JSON_DOC_LED';        // https://a.ninja.is/home
var RF433             = 'FROM_JSON_DOC_RF433';  //https://a.ninja.is/rest/v0/device/1012BB013266_0_0_11

var http = require('http');
var request = require('request');
var fs = require('fs');
var redis = require('redis'),
    client = redis.createClient();

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

  //console.log('Received %s from %s',req.body.DA,req.body.GUID);

  // This little bit of code will turn your LED light off
  // if it changes to anything but off.
  if (req.body.GUID === RGBLEDGUID && req.body.DA !== "FF0000") {
    ninja.device(RGBLEDGUID).actuate('FF0000');
      http.get('http://addressofipcam/', function(res) {
        res.pipe(fs.createWriteStream('public/img/detectedImage.jpg'));
      console.log("saving image, data is "+req.body.GUID+" and "+req.body.DA);
      });
      http.post

  }
  //if (req.body.GUID === RF433) {
  //  //ninja.device(RF433).actuate('010101010101010101010101');
  //  ninja.device(RF433).actuate('110110101101101011010100');
  //}
  //if (req.body.GUID === RF433) {

  // Very important to end the response.
  res.end();
};
