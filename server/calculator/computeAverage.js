const _ = require('lodash');
const calculator = require('../protos/calculator_pb');

function computeAverage(call, callback) {
  const numbers = [];
  call.on('data', (request) => {
    numbers.push(request.getInput());
  });

  call.on('error', (error) => {
    console.error('computeAverage Error', error);
  });

  call.on('end', () => {
    const result = _.mean(numbers);
    const response = new calculator.ComputeAverageResponse();
    response.setResult(result);

    console.log('sending mean ', result);

    callback(null, response);
  });
}

module.exports = computeAverage;
