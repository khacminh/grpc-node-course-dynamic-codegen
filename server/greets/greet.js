const greets = require('../protos/greet_pb');

function greet(call, callback) {
  const greeting = new greets.GreetResponse();
  greeting.setResult(`Hello ${call.request.getGreeting().getFirstName()} ${call.request.getGreeting().getLastName()}`);

  callback(null, greeting);
}

module.exports = greet;
