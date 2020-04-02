const greets = require('../protos/greet_pb');

function longGreet(call, callback) {
  call.on('data', (request) => {
    const firstName = request.getGreeting().getFirstName();
    const lastName = request.getGreeting().getLastName();

    console.log(`Hello ${firstName} ${lastName}`);
  });

  call.on('error', (error) => {
    console.error('longGreet Error', error);
  });

  call.on('end', () => {
    console.log('longGreet End');

    const response = new greets.LongGreetResponse();
    response.setResult('Long Greet Client Streaming...');
    callback(null, response);
  });
}

module.exports = longGreet;
