'use strict'

var APP_ID =  undefined;

var AlexaSkill = require('./src/AlexaSkill')
var nextPickUpMessage = require('./src/bins')

var GlasgowBins = function () {
    AlexaSkill.call(this, APP_ID)
}

GlasgowBins.prototype = Object.create(AlexaSkill.prototype);

GlasgowBins.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    response.tellWithCard(nextPickUpMessage(), nextPickUpMessage(), nextPickUpMessage())
}

GlasgowBins.prototype.intentHandlers = {
    "GlasgowBinsIntent": function (intent, session, response) {
        response.tellWithCard(nextPickUpMessage(), nextPickUpMessage(), nextPickUpMessage())
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say bins to me!", "You can say bins to me!")
    }
}

GlasgowBins.prototype.constructor = GlasgowBins
GlasgowBins.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {}
GlasgowBins.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {}

exports.handler = function (event, context) {
    var glasgowBins = new GlasgowBins()
    glasgowBins.execute(event, context)
}
