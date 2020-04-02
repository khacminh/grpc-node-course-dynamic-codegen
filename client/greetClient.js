/* eslint-disable no-await-in-loop */
const grpc = require('grpc');


const service = require('../server/protos/greet_grpc_pb');
const greets = require('../server/protos/greet_pb');

const client = new service.GreetServiceClient('localhost:30000', grpc.credentials.createInsecure());

const names = [
  { firstName: 'Don', lastName: 'Leffler' },
  { firstName: 'Hugh', lastName: 'Maggio' },
  { firstName: 'Lila', lastName: 'Blick' },
  { firstName: 'Alexandra', lastName: 'Nienow' },
  { firstName: 'Gennaro', lastName: 'Will' },
  { firstName: 'Eileen', lastName: 'MacGyver' },
  { firstName: 'Linwood', lastName: 'Pollich' },
  { firstName: 'Bernard', lastName: 'Blanda' },
  { firstName: 'Celia', lastName: 'Heathcote' },
  { firstName: 'Bartholome', lastName: 'Botsford' },
];

const sleep = async timeMS => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, timeMS);
});


function callGreetings() {
  const request = new greets.GreetRequest();
  const greeting = new greets.Greeting();

  greeting.setFirstName('Jerry');
  greeting.setLastName('Tom');
  request.setGreeting(greeting);

  client.greet(request, (error, response) => {
    if (!error) {
      console.log('Greeting Response: ', response.getResult());
    } else {
      console.error(error);
    }
  });
}

function callGreetManyTimes() {
  const request = new greets.GreetManyTimeRequest();
  const greeting = new greets.Greeting();

  greeting.setFirstName('Jerry');
  greeting.setLastName('Tom');
  request.setGreeting(greeting);

  const call = client.greetManyTimes(request);
  call.on('data', (response) => {
    console.log('GreetManyTimes streaming response: ', response.getResult());
  });

  call.on('status', (status) => {
    console.log('GreetManyTimes Streaming status', status);
  });

  call.on('error', (error) => {
    console.error('GreetManyTimes Streaming error', error);
  });

  call.on('end', () => {
    console.log('GreetManyTimes Streaming end');
  });
}

function callLongGreet() {
  let i = 0;
  const streamingRequest = new greets.LongGreetRequest();
  const call = client.longGreet(streamingRequest, (error, response) => {
    if (error) {
      console.error('Calling Long Greet Error', error);
    } else {
      console.log('Server response: ', response.getResult());
    }
  });
  const intervalId = setInterval(() => {
    const request = new greets.LongGreetRequest();
    const greeting = new greets.Greeting();
    greeting.setFirstName(names[i].firstName);
    greeting.setLastName(names[i].lastName);

    request.setGreeting(greeting);
    call.write(request);

    i += 1;
    if (i >= 10) {
      clearInterval(intervalId);
      call.end();
    }
  }, 1000);
}

async function callGreetEveryone() {
  const streamingRequest = new greets.GreetEveryoneRequest();
  const call = client.greetEveryone(streamingRequest, (error, response) => {
    if (error) {
      console.error('Create stream error', error);
    } else {
      console.log('Create stream response:', response);
    }
  });

  call.on('data', (response) => {
    console.log('callGreetEveryone Message from Server:', response.getResult());
  });

  call.on('error', (error) => {
    console.error('callGreetEveryone Error', error);
  });

  call.on('end', () => {
    console.error('callGreetEveryone end');
  });

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const request = new greets.GreetEveryoneRequest();
    const greeting = new greets.Greeting();
    greeting.setFirstName(name.firstName);
    greeting.setLastName(name.lastName);
    request.setGreeting(greeting);

    console.log('Sending request for: ', name.firstName, name.lastName);
    call.write(request);
    await sleep(100);
  }
  call.end();
}


function main() {
  // callGreetings();
  // callGreetManyTimes();
  // callLongGreet();
  callGreetEveryone();
}


main();
