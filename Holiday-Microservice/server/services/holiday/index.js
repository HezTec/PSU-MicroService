const dayjs = require('dayjs');
const Holiday = require('./holiday');
const MONTH = {January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11};
const DAY = {Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6};

const holidays = {
    "new years": new Holiday(function(year) {
        return dayjs().year(year).month(MONTH.January).date(1);
    }),
    "christmas": new Holiday(function(year) {
        return dayjs().year(year).month(MONTH.December).date(25);
    }),
    "labor day": new Holiday(function(year) {
        return nthWeekdayofMonth(year, MONTH.September, DAY.Monday, 1);
    })
}

module.exports.getAllHolidays = function() {
    return Object.keys(holidays);
}

module.exports.getHolidaysOnDate = function(date) {
    let holidaysOnDate = [];

    for (const key in holidays) {
        let holiday = holidays[key];
        if (holiday.isHoliday(date)) {
            holidaysOnDate.push(key);
        }
    }
    
    return holidaysOnDate;
}

module.exports.offsetInBusinessDays = function(date, offset) {
    let count = 0;
    let amount = Math.sign(offset);
    while (count < Math.abs(offset)) {
        date = date.add(amount, 'day');
        if (isBusinessDay(date)) count++;
    }
    return date;
}

function nthWeekdayofMonth(year, month, weekday, nth) {
    let date = dayjs(new Date(year, month, 1));
    while (date.day() != weekday) {
        date = date.add(1, 'day');
    }
    return date.add(Math.max(0, nth - 1), 'week');
}

function isWeekend(date) {
    return date.day() == DAY.Saturday || date.day() == DAY.Sunday;
}

function isBusinessDay(date) {
    if (isWeekend(date)) return false;

    for (const key in holidays) {
        let holiday = holidays[key];
        if (holiday.isHoliday(date)) return false;
    }
    return true;
}
