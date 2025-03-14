const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('call-user', (data) => {
        io.to(data.userToCall).emit('receive-call', { signal: data.signal, from: data.from });
    });
    
    socket.on('answer-call', (data) => {
        io.to(data.to).emit('call-answered', data.signal);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
