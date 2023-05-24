const Joi = require("joi");

const UserDTO = Joi.object({
  name: Joi.string(),
  lastname: Joi.string(),
  age: Joi.number(),
  role: Joi.string(),
  career: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
});

module.exports = UserDTO;
