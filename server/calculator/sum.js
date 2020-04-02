const calculator = require('../protos/calculator_pb');

function sum(call, callback) {
  const response = new calculator.SumResponse();

  const firstNumber = call.request.getFirstNumber();
  const secondNumber = call.request.getSecondNumber();
  response.setResult(firstNumber + secondNumber);

  callback(null, response);
}


module.exports = sum;
