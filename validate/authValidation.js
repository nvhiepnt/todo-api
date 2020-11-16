const Joi = require("@hapi/joi");

const register = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) next();
  else res.status(422).send(error.details);
};

const login = (req, res, next) => {
  console.log("hiep");
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) next();
  else res.status(422).send(error.details);
};

const loginSocial = (req, res, next) => {
  const schema = Joi.object({
    social_id: Joi.string().required(),
    social_type: Joi.string().required(),
    name: Joi.string()
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) next();
  else res.status(422).send(error.details);
};

module.exports.register = register;
module.exports.login = login;
module.exports.loginSocial = loginSocial;
