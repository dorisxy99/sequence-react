const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const socketIo = require('socket.io');
const matchCtrl = require('./controllers/api/match');

// Always require and configure near the top 
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// socket.io needs to connect to http server
// const http = require('http').Server(app);
// require('./io').init(http);

app.use(logger('dev'));
app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify the token and assign
// a user object to the req object
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/match', require('./routes/api/match'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on("connection", (socket) => {
    console.log("New player connected");

    socket.on('join', (room) => {
        console.log(`Player ${socket.id} joining ${room}`);
        socket.join(room);
    });

    socket.on('playCard', async (req, callback) => {
        console.log(req);
        let match = await matchCtrl.playCard(req);
        socket.to(req.matchId).emit('matchUpdated', match);
        callback(match);
    });

    socket.on("disconnect", (data) => {
        console.log("Client disconnected");
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

server.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});