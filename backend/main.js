var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});

http.listen(8000, function() {
    console.log("Server started on 8000");
    const users = {};
    io.on('connection', socket => {
        socket.on('new-user-joined', name => {
            users[socket.id] = name;
            socket.broadcast.emit('user-joined', name);
            console.log("new user joined", name);
        });

        socket.on('send', message => {
            socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
        });
    })
})