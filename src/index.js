'use strict'

var APP_ID =  undefined;

var AlexaSkill = require('./AlexaSkill');


// APP

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
function nth(d) {
  if(d>3 && d<21) return 'th'
  switch (d % 10) {
        case 1:  return "st"
        case 2:  return "nd"
        case 3:  return "rd"
        default: return "th"
    }
}

class Schedule {
  constructor(when, bins) {
    this.when = when
    this.bins = bins
  }
}

const B_P = "blue and purple"
const G_B = "green and brown"
const B = "blue"

// http://www.glasgow.gov.uk/CHttpHandler.ashx?id=30696&p=0
var pickups = [
  new Schedule(new Date(2016, 10, 30), B_P),
  new Schedule(new Date(2016, 11, 7), G_B),
  new Schedule(new Date(2016, 11, 14), B),
  new Schedule(new Date(2016, 11, 21), G_B),
  new Schedule(new Date(2016, 11, 28), B_P),
  new Schedule(new Date(2017, 0, 4), G_B),
  new Schedule(new Date(2017, 0, 11), B),
  new Schedule(new Date(2017, 0, 18), G_B),
  new Schedule(new Date(2017, 0, 25), B_P),
  new Schedule(new Date(2017, 1, 1), G_B),
  new Schedule(new Date(2017, 1, 8), B),
  new Schedule(new Date(2017, 1, 15), G_B),
  new Schedule(new Date(2017, 1, 22), B_P),
  new Schedule(new Date(2017, 2, 1), G_B),
  new Schedule(new Date(2017, 2, 8), B),
  new Schedule(new Date(2017, 2, 15), G_B),
  new Schedule(new Date(2017, 2, 22), B_P),
  new Schedule(new Date(2017, 2, 29), G_B),
  new Schedule(new Date(2017, 3, 5), B),
  new Schedule(new Date(2017, 3, 12), G_B),
  new Schedule(new Date(2017, 3, 19), B_P),
  new Schedule(new Date(2017, 3, 26), G_B),
  new Schedule(new Date(2017, 4, 3), B),
  new Schedule(new Date(2017, 4, 10), G_B),
  new Schedule(new Date(2017, 4, 17), B_P),
  new Schedule(new Date(2017, 4, 24), G_B),
  new Schedule(new Date(2017, 4, 31), B),
]

function nextPickUpMessage() {
  var nextPickup = pickups.find(function (schedule) {
    var d = new Date();
    d.setHours(0,0,0,0);
    return schedule.when > d;
  })

  var day = days[ nextPickup.when.getDay() ]
  var month = months[ nextPickup.when.getMonth() ]

  return "It's the " + nextPickup.bins + " bins this " + day + " the " + nextPickup.when.getDate() + nth(nextPickup.when.getDate()) + " of " + month
}

// APP

var GlasgowBins = function () {
    AlexaSkill.call(this, APP_ID);
};

GlasgowBins.prototype = Object.create(AlexaSkill.prototype);

GlasgowBins.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    response.tellWithCard(nextPickUpMessage(), nextPickUpMessage(), nextPickUpMessage())
};

GlasgowBins.prototype.intentHandlers = {
    // register custom intent handlers
    "GlasgowBinsIntent": function (intent, session, response) {
        response.tellWithCard(nextPickUpMessage(), nextPickUpMessage(), nextPickUpMessage())
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say bins to me!", "You can say bins to me!")
    }
};

GlasgowBins.prototype.constructor = GlasgowBins;
GlasgowBins.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {};
GlasgowBins.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {};

exports.handler = function (event, context) {
    var glasgowBins = new GlasgowBins()
    glasgowBins.execute(event, context)
};
