const Joi = require("joi");

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,32}$/
    )
    .required(),
  email: Joi.string().email(),
  role: Joi.string().valid("standard", "admin"),
});

module.exports = userSchema;
