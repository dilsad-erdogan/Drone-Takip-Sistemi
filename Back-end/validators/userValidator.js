const { check, validationResult } = require("express-validator");

exports.validateRegisterRequest = [
  check("name")
    .isLength({ max: 30 })
    .withMessage("İsim 30 karakterden fazla olamaz"),
  check("email").isEmail().withMessage("Geçerli bir email giriniz lütfen"),
];

exports.validateLoginRequest = [
  check("email").isEmail().withMessage("Geçerli bir email giriniz lütfen"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};