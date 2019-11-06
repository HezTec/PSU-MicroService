const express = require('express'),
    holidays = require('../../controllers/holidays');

const router = express.Router();

router.get('/', holidays.getAll);

router.get('/offset', holidays.offsetInBusinessDays);

router.get('/:date', holidays.getHolidaysOnDate)

module.exports = router;
