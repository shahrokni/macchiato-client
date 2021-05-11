module.exports = setupSocketNewMessageNotification = () => {
    const io = require("socket.io")(3001);
    io.on("connection", socket => {     

        function insertionHandler(userId) {                   
           return new Promise((resolve)=>{
               const UserMessageController = 
               require('./controller/v1/user-message-controller');
               const UserMessageModel = require('./model/user-message/user-message')
               const userMessageController = 
               new UserMessageController(new UserMessageModel());
               userMessageController
               .countUnreadMessages(userId)
               .then((response)=>{    
                   /*TODO*/              
                   socket.send(response.outputJson);
                   resolve();
               })
           })
        }

        socket.on("disconnect", () => {
            global.userMessageEventEmiiter.off('insert', insertionHandler);
        })
        global.userMessageEventEmiiter.on('insert', insertionHandler);
    });
}