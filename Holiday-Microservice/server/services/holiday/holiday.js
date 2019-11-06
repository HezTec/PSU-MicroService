const dayjs = require('dayjs');

function Holiday(getDate) {
    this.getDate = getDate;
}

Holiday.prototype.isHoliday = function(date) {
    date = dayjs(date);
    if (!date.isValid()) {
        return false;
    }
    const holidayDate = this.getDate(date.year());
    return holidayDate.month() == date.month() &&
           holidayDate.date() == date.date();
}


module.exports = Holiday;