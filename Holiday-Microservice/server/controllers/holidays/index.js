const dayjs = require('dayjs');
const holidayService = require('../../services/holiday') 


module.exports.getAll = function(req, res) {
  return res.status(200).json(holidayService.getAllHolidays());
};

module.exports.getHolidaysOnDate = function(req, res) {
  const date = dayjs(req.params.date);
  if (!date.isValid()) {
    return res.status(422).json({error: 'Invalid date format'})
  }

  return res.status(200).json(holidayService.getHolidaysOnDate(date));
};

module.exports.offsetInBusinessDays = function(req, res) {
  if (!req.query.date) return res.status(422).json({error: 'Date query param is required'});
  const date = dayjs(req.query.date);
  if (!date.isValid()) return res.status(422).json({error: 'Invalid date format'});

  let offset = req.query.offset;
  if (!offset) return res.status(422).json({error: 'Offset query param is required'});
  offset = Number(offset);
  if (Number.isNaN(offset)) return res.status(422).json({error: 'Offset must be an number'});

  return res.status(200).send(holidayService.offsetInBusinessDays(date, offset).toString())
}
