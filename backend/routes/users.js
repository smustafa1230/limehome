var express = require('express');
var router = express.Router();
const userController = require("../controllers/user")
const {validateSaveReservation, validate} = require("./../middleware/validation")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* save reservation */
router.post('/reservation', validateSaveReservation(), validate, userController.saveReservation);
router.get('/reservation', userController.getReservation);

module.exports = router;
