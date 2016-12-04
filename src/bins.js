'use strict'

var moment = require('moment')

// routine started in Feb 2016:  http://www.glasgow.gov.uk/CHttpHandler.ashx?id=30696&p=0
function binsGettingCollectedOn(date) {
    const startingFrom = moment(new Date(2016, 1, 10))
    const collectionPattern = ["blue", "green and brown", "purple and blue", "green and brown"]

    var weeksSinceStartOfThisSchedule = moment(date).diff(startingFrom, 'weeks')
    return collectionPattern[weeksSinceStartOfThisSchedule % 4]
}

function nextWednesday(date) {
    var nearestWednesday = moment(date).day("Wednesday")
    if (nearestWednesday < date) nearestWednesday.add(1, 'week')
    return nearestWednesday
}

function nextPickUpMessage(date) {
    var nextPickupDay = nextWednesday(date)
    var binsToBeCollected = binsGettingCollectedOn(nextPickupDay)
    return `It'll be the ${binsToBeCollected} bins on the ${moment(nextPickupDay).format('Do MMMM')}`
}

module.exports = nextPickUpMessage

for (var x = 0; x < 31; x++) {
    var date = new Date(2016, 11, x)
    console.log(moment(date).format('Do MMMM') + " --> " + nextPickUpMessage(date))
}
