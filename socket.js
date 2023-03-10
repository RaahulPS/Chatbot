const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('A user connected');

  // Handle incoming messages from the frontend
  socket.on('message', message => {
    console.log('Received message:', message);

    // Add custom logic to generate a response based on the message
    let response;

    if (message === 'hi') {
      response = 'Hello!';
    } else if (message === 'bye') {
      response = 'Goodbye!';
    } else {
      response = 'I did not understand your message.';
    }

    // Send the response back to the frontend
    socket.emit('message', response);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server started on port 5000');
});
