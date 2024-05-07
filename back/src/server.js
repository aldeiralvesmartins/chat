const { WebSocketServer } = require("ws")

const dotenv = require("dotenv")
let onlineUsers = 0;

dotenv.config()
const wss = new WebSocketServer({ port: process.env.PORT || 8060 })
wss.on("connection", (ws) => {
    onlineUsers++;
    wss.clients.forEach((client) => client.send(JSON.stringify({ type: 'onlineUsers', count: onlineUsers })));

    ws.on("error", console.error);

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
    });

    ws.on('close', () => {
        onlineUsers--;
        wss.clients.forEach((client) => client.send(JSON.stringify({ type: 'onlineUsers', count: onlineUsers })));
    });
});
