const calculator = require('../protos/calculator_pb');

function decomposePrimeNumber(call) {
  const input = call.request.getInput();

  let k = 2;
  let N = input;

  while (N > 1) {
    if (N % k === 0) {
      // response k
      const response = new calculator.DecomposePrimeNumberResponse();
      response.setResult(k);
      call.write(response);

      N = Math.floor(N / k);
    }
    k += 1;
  }
  call.end();
}


module.exports = decomposePrimeNumber;
