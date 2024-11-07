const Joi = require("joi");

const customerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  document: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com"] },
  }),
  phone: Joi.string().max(10).min(10),
});

const walletSchema = Joi.object({
  amount: Joi.number().required(),
  document: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com"] },
  }),
});

const paymentSchema = Joi.object({
  senderWallet: Joi.string().required(),
  document: Joi.string().required(),
  amount: Joi.number().required(),
});

const validatePaymentSchema = Joi.object({
  token: Joi.string().required(),
  transactionId: Joi.string().required(),
});

const walletInfoSchema = Joi.object({
  document: Joi.string().required(),
});

module.exports = {
  customerSchema,
  walletSchema,
  paymentSchema,
  validatePaymentSchema,
  walletInfoSchema,
};
