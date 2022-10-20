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
            console.log(users);
        });

        socket.on('send', message => {
            socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('user-left', users[socket.id]);
            delete users[socket.id];
        });
    });

})