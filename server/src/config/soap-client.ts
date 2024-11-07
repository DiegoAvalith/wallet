import { CONNREFUSED } from "dns";
import * as soap from "soap";

const url = "http://127.0.0.1:8000/soap?wsdl";
const endpoint_url = "http://127.0.0.1:8000/soap";
export enum WalletService {
  CUSTOMER_REGISTRATION = "customer-registration",
  LOAD_WALLET = "load-wallet",
  MAKE_PAYMENT = "make-payment",
  VALIDATE_PAYMENT = "validate-payment",
  GET_WALLET = "get-wallet",
}

export const createSoapClient = (args: any, type: WalletService) => {
  return new Promise((resolve, reject) => {
    soap.createClient(
      url,
      function (err, client) {
        if (type === WalletService.CUSTOMER_REGISTRATION) {
          client.CustomerRegistration(args, function (err: any, result: any) {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        }
        if (type === WalletService.LOAD_WALLET) {
          client.LoadWallet(args, function (err: any, result: any) {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        }
        if (type === WalletService.MAKE_PAYMENT) {
          client.MakePayment(args, function (err: any, result: any) {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        }
        if (type === WalletService.VALIDATE_PAYMENT) {
          client.ValidatePayment(args, function (err: any, result: any) {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        }
        if (type === WalletService.GET_WALLET) {
          client.GetWallet(args, function (err: any, result: any) {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        }
      },
      endpoint_url
    );
  });
};
