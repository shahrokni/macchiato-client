module.exports = setupSocketNewMessageNotification = () => {
    const io = require("socket.io")(3001);
    io.on("connection", socket => {
        function insertionHandler(dbUserId) {
            return new Promise((resolve) => {
                if (!socket.handshake.query || !socket.handshake.query.userId)
                    resolve();
                const clientUserId = socket.handshake.query.userId;
                if (clientUserId.toString() !== dbUserId.toString()) {                  
                    resolve();
                }
                else {                   
                    const UserMessageController =
                        require('./controller/v1/user-message-controller');
                    const UserMessageModel = require('./model/user-message/user-message')
                    const userMessageController =
                        new UserMessageController(new UserMessageModel());
                    userMessageController
                        .countUnreadMessages(dbUserId)
                        .then((response) => {
                            socket.send(response.outputJson);
                            resolve();
                        })
                }

            })
        }
        socket.on("disconnect", () => {
            /*REMOVE THE LISTENER!*/
            global.userMessageEventEmiiter.off('insert', insertionHandler);
        })
        global.userMessageEventEmiiter.on('insert', insertionHandler);
    });
}