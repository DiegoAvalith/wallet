import z from "zod";

export const customerSchema = z.object({
  name: z.string(),
  email: z.string().trim().email(),
  document: z.string(),
  password: z.string(),
  phone: z.string(),
});

export const walletSchema = z.object({
  amount: z.string(),
  document: z.string(),
  email: z.string().trim().email(),
});

export const paymentSchema = z.object({
  senderWallet: z.string(),
  document: z.string(),
  amount: z.string(),
});

export const validatePaymentSchema = z.object({
  token: z.string(),
  transactionId: z.string(),
});

export const walletInfoSchema = z.object({
  document: z.string(),
});
