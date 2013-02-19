
var spots = [];
var spotters = {};

exports.index = function (req, res) {
  console.log (req);
  res.send (spots);
};

exports.create = function (req, res) {
  console.log (req);
  var date = new Date ();
  if (spotters[req.body.userid]) {
    res.send ("HOURLY LIMIT MAXED. SPOT REJECTED.");
  } else {
    spotters[req.body.userid] = date.getTime ();
    var indx = spots.length + 1;
    spots.push ({
      id : indx,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      userid : req.body.userid,
      time : (new Date ()).getTime ()
    });
    res.send ("spot with id: " + indx + " created.");
  }
};

/* Spots last for one hour, and we clean up old ones every 60 seconds. */
var sleepInterval = 1000*60;
var spotDuration = 1000*60*60;

var cleanSpots = function () {
  for (var i = 0; i < spots.length; i ++) {
    if ((new Date()).getTime () - spots[i].time > spotDuration) 
      spots.splice (i--, 1);
  }
  setTimeout (cleanSpots, sleepInterval);
};

var cleanSpotters = function () {
  var date = new Date ();
  for (var spotter in spotters) {
    if (date.getTime () - spotters[spotter] > spotDuration)
      delete spotters[spotter];
  }
  setTimeout (cleanSpotters, sleepInterval);
};

cleanSpots ();
cleanSpotters ();
