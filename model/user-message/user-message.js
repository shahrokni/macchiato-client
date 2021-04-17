class UserMessageModel {

    countAll(userId) {
        return new Promise((resolve, reject) => {
            const userMessage = require('./user-message-schema');
            const countQuery = userMessage.countDocuments({ 'receiverId': `${userId}` });
            countQuery.exec()
                .then((count) => {
                    resolve(count);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    listMessages(userId, filter, columns) {
        let projection = {};
        if (columns)
            projection = columns;
        const pageSize = 10;
        const skip = filter.pageNumber * pageSize;
        const userMessage = require('./user-message-schema');
        return new Promise((resolve, reject) => {
            const findQuery = userMessage
                .find({ 'receiverId': `${userId}` }, projection, {
                    skip: skip,
                    limit: pageSize
                })
                .sort({ 'sentDate': -1 });
            findQuery.exec()
                .then((userMessages) => {
                    resolve(userMessages);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    save(userMessage) {
        return new Promise((resolve, reject) => {
            if (!userMessage)
                reject(global.errorResource.Err0005());
            const userMessageModel = require('./user-message-schema');
            const model = new userMessageModel();
            model.senderId = userMessage.senderId;
            model.receiverId = userMessage.receiverId;
            model.sentDate = Date.now();;
            model.isAdvertisement = userMessage.isAdvertisement;
            model.title = userMessage.title;
            model.text = userMessage.text;
            model.save().then((savedUserMessage) => {
                resolve(savedUserMessage);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    saveBySessionId(userMessage, sessionOption) {
        return new Promise((resolve, reject) => {
            if (!userMessage || !sessionOption)
                reject(global.errorResource.Err0005());
            const userMessageModel = require('./user-message-schema');
            const model = new userMessageModel();
            model.senderId = userMessage.senderId;
            model.receiverId = userMessage.receiverId;
            model.sentDate = Date.now();
            model.isAdvertisement = userMessage.isAdvertisement;
            model.title = userMessage.title;
            model.text = userMessage.text;
            model.save(sessionOption).then((savedUserMessage) => {
                resolve(savedUserMessage);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}
module.exports = UserMessageModel;
