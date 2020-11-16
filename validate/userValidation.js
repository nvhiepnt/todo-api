const Joi = require("@hapi/joi");

const update = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    avatar: Joi.string()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) next();
  else res.status(422).send(error.details);
};

module.exports.update = update;
