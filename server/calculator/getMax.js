/* eslint-disable no-await-in-loop */
const _ = require('lodash');
const calculator = require('../protos/calculator_pb');
const sleep = require('../../utils/sleep');

async function getMax1(call) {
  let currentMax;
  call.on('data', (request) => {
    const input = request.getInput();
    currentMax = _.max([currentMax, input]);

    const result = new calculator.GetMaxResponse();
    result.setResult(currentMax);
    call.write(result);
  });

  call.on('error', (error) => {
    console.error('GetMax Error', error);
  });

  call.on('end', () => {
    console.log('On stream end');
    call.end();
  });
}

async function getMax2(call) {
  let currentMax;
  let buffer = [];
  let shouldEnd = false;
  call.on('data', (request) => {
    const input = request.getInput();

    buffer.push(input);
  });

  call.on('error', (error) => {
    console.error('GetMax Error', error);
  });

  call.on('end', () => {
    console.log('On stream end');
    shouldEnd = true;
  });

  const respondMax = () => {
    const clone = _.cloneDeep(buffer);
    buffer = [];

    clone.push(currentMax);
    currentMax = _.max(clone);
    const result = new calculator.GetMaxResponse();
    result.setResult(currentMax);
    call.write(result);
  };

  while (!shouldEnd) {
    respondMax();
    await sleep(100);
  }
  if (buffer.length) {
    respondMax();
  }
  call.end();
}

module.exports = getMax2;
