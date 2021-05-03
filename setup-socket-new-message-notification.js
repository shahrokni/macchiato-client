module.exports = setupSocketNewMessageNotification = () => {    
    const io = require("socket.io")(3001);
    io.on("connection", socket => {
        // setInterval(()=>{
        //     socket.send(8);
        // },1000)           
    });
}