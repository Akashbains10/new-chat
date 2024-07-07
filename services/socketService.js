// import { Server } from 'socket.io';
const { Server } = require('socket.io')
async function socketService(nextServer) {
    const io = new Server(nextServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    console.log('IN SOCKET SERVER');
    io.on("connection", (socket) => {
        console.log(`Connected to socket: ${socket.id}`)
        socket.on("message", (message) => {
            socket.emit('recieved', 'Message recived successfuly')
        })
    })
}

module.exports = { socketService }