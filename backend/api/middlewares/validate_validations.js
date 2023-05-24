const { validationResult } = require("express-validator");

const validate_validations = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty())
    return res.json({ msg: "Error", body: errors.array() });

  next();
};

module.exports = {
  validate_validations,
};
