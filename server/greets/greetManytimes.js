const greets = require('../protos/greet_pb');

function greetManyTimes(call, callback) {
  const firstName = call.request.getGreeting().getFirstName();
  const lastName = call.request.getGreeting().getLastName();


  // streaming
  let count = 0;
  const timerId = setInterval(() => {
    count += 1;

    const response = new greets.GreetManyTimeResponse();
    response.setResult(`Hello ${firstName} ${lastName} ${count}`);
    call.write(response);
    if (count === 10) {
      clearInterval(timerId);
      call.end(); // close connection
    }
  }, 1000);
}

module.exports = greetManyTimes;
