const express = require('express');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 4516;

// on connection
io.on("connection", (socket) => {
    console.log("User connected");
    setTimeout(() => {
        socket.emit("test", { success: true })
        console.log("data sent to test");
    }, 5000);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

} )   

server.listen(port, () => console.log(`started server on port ${port}`));

