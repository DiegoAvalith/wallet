import { Request, Response } from "express";
import { createSoapClient, WalletService } from "../config/soap-client";
import {
  customerSchema,
  paymentSchema,
  validatePaymentSchema,
  walletInfoSchema,
  walletSchema,
} from "../schemas/customer-schema";

export const create = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { success, error, data } = customerSchema.safeParse(body);
    if (!success) {
      res.json({
        message: "create customer",
        status: 404,
        errors: error.errors,
      });
      return;
    }
    const customer = await createSoapClient(
      data,
      WalletService.CUSTOMER_REGISTRATION
    );
    res.status(201).json(customer);
  } catch (error) {}
};

export const loadWallet = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { success, error, data } = walletSchema.safeParse(body);
    if (!success) {
      res.json({ message: "Load wallet", status: 404, errors: error.errors });
      return;
    }
    const wallet = await createSoapClient(data, WalletService.LOAD_WALLET);
    res.status(201).json(wallet);
  } catch (error) {}
};

export const makePayment = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { success, error, data } = paymentSchema.safeParse(body);
    if (!success) {
      res.json({ message: "make payment", status: 404, errors: error.errors });
      return;
    }
    const payment = await createSoapClient(data, WalletService.MAKE_PAYMENT);
    res.status(201).json(payment);
  } catch (error) {}
};

export const validatePayment = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { success, error, data } = validatePaymentSchema.safeParse(body);
    if (!success) {
      res.json({
        message: "validate payment",
        status: 404,
        errors: error.errors,
      });
      return;
    }
    const validatePayment = await createSoapClient(
      data,
      WalletService.VALIDATE_PAYMENT
    );
    res.status(201).json(validatePayment);
  } catch (error) {}
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { success, error, data } = walletInfoSchema.safeParse(params);
    if (!success) {
      res.json({
        message: "get Wallet",
        status: 404,
        errors: error.errors,
      });
      return;
    }
    const wallet = await createSoapClient(data, WalletService.GET_WALLET);
    res.status(200).json(wallet);
  } catch (error) {}
};
