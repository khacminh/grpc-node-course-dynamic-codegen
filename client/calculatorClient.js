/* eslint-disable no-await-in-loop */
const grpc = require('grpc');
const faker = require('faker');


const calculator = require('../server/protos/calculator_pb');
const service = require('../server/protos/calculator_grpc_pb');
const sleep = require('../utils/sleep');


const client = new service.CalculatorServiceClient('localhost:30000', grpc.credentials.createInsecure());

function callSum() {
  const request = new calculator.SumRequest();

  request.setFirstNumber(10);
  request.setSecondNumber(5);

  client.sum(request, (error, response) => {
    if (!error) {
      console.log('Sum Response: ', response.getResult());
    } else {
      console.error(error);
    }
  });
}

function callDecompositionPrimeNumber(input) {
  const request = new calculator.DecomposePrimeNumberRequest();

  request.setInput(input);
  const call = client.decomposePrimeNumber(request);

  call.on('data', (data) => {
    console.log('callDecompositionPrimeNumber Response: ', data.getResult());
  });

  call.on('error', (error) => {
    console.error('callDecompositionPrimeNumber Error: ', error);
  });

  call.on('end', () => {
    console.log('callDecompositionPrimeNumber Streaming end');
  });
}

function callComputeAverage() {
  const inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const streamingRequest = new calculator.ComputeAverageRequest();
  const call = client.computeAverage(streamingRequest, (error, response) => {
    if (error) {
      console.error('callComputeAverage Error', error);
    } else {
      console.log('callComputeAverage Response', response.getResult());
    }
  });

  let i = 0;
  const intervalId = setInterval(() => {
    const request = new calculator.ComputeAverageRequest();
    request.setInput(inputs[i]);
    call.write(request);

    i += 1;
    if (i >= inputs.length) {
      call.end();
      clearInterval(intervalId);
    }
  }, 100);
}

async function getMax() {
  const streamingRequest = new calculator.GetMaxRequest();
  const call = client.getMax(streamingRequest, (error, response) => {
    if (error) {
      console.error('create stream error', error);
    } else {
      console.log('create stream response', response);
    }
  });


  call.on('data', (response) => {
    console.log('Current Max is: ', response.getResult());
  });

  call.on('error', (error) => {
    console.error('On stream error', error);
  });

  call.on('end', () => {
    console.log('stream closed');
  });

  for (let i = 0; i < 100; i += 1) {
    const input = faker.random.number({ min: -1000000, max: 1000000, precision: 1 });
    const request = new calculator.GetMaxRequest();
    request.setInput(input);

    call.write(request);
    await sleep(10);
  }
  call.end();
}

function main() {
  // callSum();
  // callDecompositionPrimeNumber(120);
  // callComputeAverage();
  getMax();
}
main();
