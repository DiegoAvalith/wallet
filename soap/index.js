const http = require("http");
const soap = require("soap");
const { Db } = require("./src/config/db");
const { BasicQueries } = require("./src/config/queries");
const {
  customerSchema,
  walletSchema,
  paymentSchema,
  validatePaymentSchema,
  walletInfoSchema,
} = require("./src/schemas/customer");
const { error } = require("console");
const myService = {
  WalletService: {
    WalletPort: {
      CustomerRegistration: (args) => {
        const collectionName = "customer";
        const customerValidation = customerSchema.validate(args);
        if (customerValidation.error) {
          return {
            success: false,
            code_err: "001",
            message_err: `customer validation ${JSON.stringify(
              customerValidation.error.details
            )}`,
          };
        }
        BasicQueries.saveData(collectionName, args);
        BasicQueries.saveData("wallet", {
          amount: 0,
          document: args.document,
          email: args.email,
        });
        return {
          success: true,
          code_err: "00",
          message_err: "",
        };
      },
      LoadWallet: async (args) => {
        const collectionName = "wallet";
        const walletValidation = walletSchema.validate(args);
        if (walletValidation.error) {
          return {
            success: false,
            code_err: "001",
            message_err: `wallet validation ${JSON.stringify(
              walletValidation.error.details
            )}`,
          };
        }
        const data = await BasicQueries.getDataByQuery(collectionName, {
          document: args.document,
        });
        const amount = parseFloat(data[0].amount) + parseFloat(args.amount);
        await BasicQueries.updateOneByQuery(
          collectionName,
          { document: args.document },
          { amount: amount.toString() }
        );
        return {
          success: true,
          code_err: "00",
          message_err: "",
        };
      },
      MakePayment: async (args) => {
        const collectionName = "transaction";
        const paymentValidation = paymentSchema.validate(args);
        if (paymentValidation.error) {
          return {
            success: false,
            code_err: "001",
            message_err: `payment validation ${JSON.stringify(
              customerValidation.error.details
            )}`,
          };
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        args.token = code.toString();
        args.state = "start";
        const result = await BasicQueries.saveData(collectionName, args);
        return {
          token: args.token,
          sessionId: result.insertedId.toString(),
          success: true,
          code_err: "00",
          message_err: "",
        };
      },
      ValidatePayment: async (args) => {
        const collectionName = "transaction";
        const validatePayment = validatePaymentSchema.validate(args);
        if (validatePayment.error) {
          return {
            success: false,
            code_err: "001",
            message_err: `payment validation ${JSON.stringify(
              customerValidation.error.details
            )}`,
          };
        }
        const transaction = await BasicQueries.getDataByQuery(collectionName, {
          token: args.token,
          _id: BasicQueries.convertStringToMongoObjectId(args.transactionId),
        });
        if (transaction.length === 0) {
          return {
            success: false,
            code_err: "02",
            message_err: "code or session no match",
          };
        }
        const wallet = await BasicQueries.getDataByQuery("wallet", {
          document: transaction[0].document,
        });
        const amountTransaction = parseFloat(transaction[0].amount);
        const amountWallet = parseFloat(wallet[0].amount);
        console.log(amountTransaction, amountWallet, "check price");
        if (amountTransaction > amountWallet) {
          return {
            success: false,
            code_err: "03",
            message_err: "Transaction declined due to insufficient funds.",
          };
        }
        const myAmount = amountWallet - amountTransaction;
        await BasicQueries.updateOneByQuery(
          "wallet",
          { document: wallet[0].document },
          { amount: myAmount.toString() }
        );
        await BasicQueries.updateOneByQuery(
          collectionName,
          {
            _id: transaction[0]._id,
          },
          {
            state: "finished",
          }
        );
        return {
          success: true,
          code_err: "00",
          message_err: "",
        };
      },
      GetWallet: async (args) => {
        const collectionName = "wallet";
        const walletInfoValidation = walletInfoSchema.validate(args);
        if (walletInfoValidation.error) {
          return {
            success: false,
            code_err: "001",
            message_err: `wallet Info validation ${JSON.stringify(
              walletInfoValidation.error.details
            )}`,
          };
        }
        const data = await BasicQueries.getDataByQuery(collectionName, {
          document: args.document,
        });
        if (data.length === 0) {
          return {
            success: false,
            code_err: "04",
            message_err: "Document not found",
          };
        }
        const amount = data[0].amount;
        return {
          amount,
          success: true,
          code_err: "00",
          message_err: "",
        };
      },
    },
  },
};

const xml = require("fs").readFileSync("wallet.wsdl", "utf8");
const server = http.createServer(function (request, response) {
  response.end("404: Not Found: " + request.url);
});

server.listen(8000);
Db.connect().then(() => {
  soap.listen(server, "/soap", myService, xml);
});
