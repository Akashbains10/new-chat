const { default: User } = require('@/models/user.model');
const { default: db } = require('@/utils/connectDB');
const { Server } = require('socket.io')
async function socketService(nextServer) {
    const io = new Server(nextServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    console.log('IN SOCKET SERVER');
    io.use(async (socket, next) => {
        const userId = socket.handshake.auth.userId;
        await db.connectDB();
        const user = await User.findById(userId);
        console.log(user, 'user')
    })
    io.on("connection", (socket) => {
        console.log(`Connected to socket: ${socket.id}`)
        socket.on("message", (message) => {
            socket.emit('recieved', 'Message recived successfuly')
        })
    })
}

module.exports = { socketService }