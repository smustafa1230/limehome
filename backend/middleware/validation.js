'use strict';
const minLength = 2;
const maxLength = 100;
const responseHelper = require('../helpers/handle-response.helper');
const { body, check, validationResult } = require('express-validator');

const validateSaveReservation = () => {
  // we can add validation when required

  return [
    body('firstName', 'Institute Name field is required.').notEmpty(),
    body('lastName', 'Full Name field is required.').notEmpty(),
    body('city', 'City field is required.').notEmpty(),
    body('billingAddress', 'Billing Address field is required.').notEmpty(),
    body('country', 'Country field is required.').notEmpty(),
    body('postalCode', 'Postal Code field is required.').notEmpty(),
    body('phoneNumber', 'PhoneNumber field is required.').notEmpty(),
    body('noOfGuests', 'No of Guests field is required.').notEmpty(),
    body('email', 'Email field is required.').notEmpty().isEmail().withMessage('Email is invalid.')
  

  ]

}
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}
module.exports = {
  validateSaveReservation,
  validate
}
