// const path = require('path');
// const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// grpc service definition for greet

const greetService = require('./protos/greet_grpc_pb');
const calculatorService = require('./protos/calculator_grpc_pb');


const { greet, greetManyTimes, longGreet, greetEveryone } = require('./greets');
const { sum, decomposePrimeNumber, computeAverage, getMax } = require('./calculator');

function main() {
  const server = new grpc.Server();

  server.addService(greetService.GreetServiceService, { greet, greetManyTimes, longGreet, greetEveryone });
  server.addService(calculatorService.CalculatorServiceService, { sum, decomposePrimeNumber, computeAverage, getMax });

  const port = server.bind('127.0.0.1:30000', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(`Server running at ${port}`);
}
main();
