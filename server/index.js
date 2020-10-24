const express = require('express');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { Player } = require('./src/Player') 

const port = process.env.PORT || 4516;

// on connection
io.on("connection", (socket) => {
    console.log("User connected");
    const player = new Player('asd', 15000)
    setTimeout(() => {
        socket.emit("test", { level: player.level, damage: player.damage, health: player.health })
        console.log("data sent to test");
    }, 5000);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

})

server.listen(port, () => console.log(`started server on port ${port}`));

