const { Server } = require('socket.io');
const { authenticateParamToken } = require('./src/middleware/authenticateToken')
const { backupMsg, loadMsg, getAllConversations, createConversation, updateOnlineStatus, getChatHistory } = require('./src/controllers/chatController');

module.exports = (httpServer, api) => {
    const io = new Server(httpServer, {
        cors: {
            origin: api,
            credentials: true,
        },

        connectionStateRecovery: {
            maxDisconnectionDuration: 2 * 60 * 1000,
            skipMiddlewares: true,
        }
    });

    global.onlineUsers = [];
    global.activeConversations = [];
    global.rooms = new Map();


    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        authenticateParamToken(token, (err, user) => {
            if (err) {
                return next(new Error('Authentication error'));
            }
            socket.user = user;

            next();
        });
    });

    io.on('connection', async (socket) => {
        console.log('a user connected');
        //socket.broadcast.emit("user-connected", socket.user);
        await updateOnlineStatus({ ...socket.user, online: true });

        console.log('user', socket.user);

        let previousChats = await getChatHistory(socket.user);

        previousChats.forEach(chat => {
            let chatroom = `${chat.userId}${chat.providerId}-chat_${chat.id}`
            socket.join(chatroom);
        })

        for (const room of socket.rooms) {
            if (room !== socket.id) { // Skip the socket's own ID room
                socket.to(room).emit("user-connected", socket.user);
            }
        }


        socket.emit('chat-peers', previousChats);

        socket.on('send-msg', (data) => {
            console.log('Message sent');
            console.log('data', data);
            const roomKey = `${data.role === 'user' ? data.from : data.to}${data.role === 'user' ? data.to : data.from}`

            console.log('room key', roomKey);
            const chatrooms = io.of("/").adapter.rooms;
            let keys = [...chatrooms.keys()];
            let room = keys.find(key => key.split("-")[0] === roomKey);

            io.to(room).emit("msg-recieve", data);

            backupMsg(data).then((res) => {
                console.log(res);
            })
        })

        socket.on('fetch-peers', async (data) => {
            let previousChats = await getChatHistory(socket.user);

            socket.emit('chat-peers', previousChats);
        })

        socket.on('private-msg', async (data) => {
            console.log('data', data);
            const chats = await loadMsg(data);

            let chatroom;

            if (!chats) {
                let conversation = await createConversation(data);

                chatroom = `${conversation.userId}${conversation.providerId}-chat_${conversation.id}`

                socket.join(chatroom);

                return;
            }

            socket.emit('msg-loaded', chats?.messages);
        })

        socket.on('disconnect', async () => {
            await updateOnlineStatus({ ...socket.user, online: false });
            for (const room of socket.rooms) {
                if (room !== socket.id) { // Skip the socket's own ID room
                    socket.to(room).emit("user-disconnected", socket.user);
                }
            }

            console.log('A user disconnected');
        })
    });

    return io;
};

