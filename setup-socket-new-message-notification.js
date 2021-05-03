module.exports = setupSocketNewMessageNotification = () => {
    let counter = 2;
    const io = require("socket.io")(3001);
    io.on("connection", socket => {        
        setInterval(()=>{
            socket.send(counter);
            counter+=1;        
        },10000)        
    });
}