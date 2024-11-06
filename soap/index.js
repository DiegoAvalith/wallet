const http = require("http");
const soap = require("soap");
const myService = {
  StockQuoteService: {
    StockQuotePort: {
      GetLastTradePrice: function (args) {
        if (args.tickerSymbol === "trigger error") {
          throw new Error("triggered server error");
        } else {
          return { price: 12.5 };
        }
      },
      CustomerRegistration: (args) => {
        console.log(args);
        return true;
      },
      LoadWallet: (args) => {
        console.log(args);
        return true;
      },
      MakePayment: (args) => {
        console.log(args);
        return {
          transactionId: "123",
          status: true,
          token: "123456",
        };
      },
      ValidatePayment: (args) => {
        console.log(args);
        return true;
      },
      GetWallet: (args) => {
        console.log(args);
        return { status: true, balance: 12.4 };
      },
    },
  },
};

const xml = require("fs").readFileSync("service.wsdl", "utf8");

const server = http.createServer(function (request, response) {
  response.end("404: Not Found: " + request.url);
});

server.listen(8000);
soap.listen(server, "/soap", myService, xml);
