const Joi = require("joi");

const aiMessagesSchema = Joi.object({
  message: Joi.string().required(),
  response: Joi.string(),
});

module.exports = aiMessagesSchema;
