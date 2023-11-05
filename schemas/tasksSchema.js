const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  isDone: Joi.boolean().required(),
  date: Joi.date().required(),
});

module.exports = taskSchema;
