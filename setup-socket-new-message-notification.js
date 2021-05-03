module.exports = setupSocketNewMessageNotification = () => {
    const io = require("socket.io")(3001);
    io.on("connection", socket => {        
        //socket.send("Hello!");        
    });
}