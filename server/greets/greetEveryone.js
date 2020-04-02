/* eslint-disable no-await-in-loop */
const _ = require('lodash');
const greets = require('../protos/greet_pb');

const sleep = async timeMS => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, timeMS);
});

async function greetEveryone(call, callback) {
  call.on('data', (request) => {
    const firstName = request.getGreeting().getFirstName();
    const lastName = request.getGreeting().getLastName();

    const response = new greets.GreetEveryoneResponse();
    response.setResult(`Hello ${firstName} ${lastName}`);
    call.write(response);
  });

  call.on('error', (error) => {
    console.error('greetEveryone Error', error);
  });

  call.on('end', () => {
    console.log('greetEveryone end');
    call.end();
  });
}

async function greetEveryone2(call, callback) {
  let names = [];
  call.on('data', (request) => {
    const firstName = request.getGreeting().getFirstName();
    const lastName = request.getGreeting().getLastName();

    names.push({ firstName, lastName });

    // console.log('!!!!', `Hello ${firstName} ${lastName}`);

    // const response = new greets.GreetEveryoneResponse();
    // response.setResult(`Hello ${firstName} ${lastName}`);
    // call.write(response);
  });

  call.on('error', (error) => {
    console.error('greetEveryone Error', error);
  });

  call.on('end', () => {
    console.log('greetEveryone end');
  });

  for (let i = 0; i < 10; i += 1) {
    const clone = _.cloneDeep(names);
    names = [];
    if (clone.length) {
      const response = new greets.GreetEveryoneResponse();
      const fullNames = _.map(clone, x => `${x.firstName} ${x.lastName}`).join(', ');
      response.setResult(`Hello ${fullNames}`);
      call.write(response);
    }
    await sleep(500);
  }
  call.end();
}

module.exports = greetEveryone;
