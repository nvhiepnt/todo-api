const Joi = require("@hapi/joi");

const create = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .required()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) next();
  else res.status(422).send(error.details);
};

const update = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.boolean().required()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) next();
  else res.status(422).send(error.details);
};

module.exports.create = create;
module.exports.update = update;
