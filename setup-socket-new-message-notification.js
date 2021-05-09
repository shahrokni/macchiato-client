module.exports = setupSocketNewMessageNotification = () => {    
    const io = require("socket.io")(3001);
    io.on("connection", socket => {
        global.userMessageEventEmiiter.on('insert',function(documentKey){
            console.log('Soket',documentKey);
               //     socket.send(8);
        })                 
    });
}