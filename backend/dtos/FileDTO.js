const Joi = require("joi");

const FileDTO = Joi.object({
  title: Joi.string().required(),
});

module.exports = FileDTO;
