var mongoose = require('mongoose');
class UserMessageModel {

    getMessage(userId, messageId) {
        return new Promise((resolve, reject) => {
            const userMessageModel = require('./user-message-schema');
            const findQuery = userMessageModel.find({
                'receiverId': `${userId}`,
                '_id': `${messageId}`
            })
            findQuery.exec()
                .then((userMessageArray) => {
                    if (userMessageArray && userMessageArray.length != 0)
                        resolve(userMessageArray[0]);
                    else
                        resolve({});
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    setReadFlag(userId, messageId) {
        return new Promise((resolve, reject) => {
            const userMessageModel = require('./user-message-schema');
            const model = new userMessageModel();
            model.collection
                .updateOne({
                    receiverId: mongoose.Types.ObjectId(`${userId}`),
                    _id: mongoose.Types.ObjectId(`${messageId}`)
                }, { $set: { isRead: true } })
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        });

    }

    countAll(userId) {
        return new Promise((resolve, reject) => {
            const userMessageModel = require('./user-message-schema');
            const countQuery = userMessageModel
                .countDocuments({ 'receiverId': `${userId}` });
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
        const userMessageModel = require('./user-message-schema');
        return new Promise((resolve, reject) => {
            const findQuery = userMessageModel
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
            model.receiverId = mongoose.Types.ObjectId(userMessage.receiverId);
            model.sentDate = Date.now();;
            model.isAdvertisement = userMessage.isAdvertisement;            
            model.title = userMessage.title;
            model.text = userMessage.text;
            model.save()
            .then((savedUserMessage) => {               
                resolve(savedUserMessage);
            })
                .catch((err) => {
                    console.log(err);
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

    deleteMessage(userId, messageId) {
        return new Promise((resolve, reject) => {
            const userMessageModel = require('./user-message-schema');
            const model = new userMessageModel();
            model.collection.deleteOne({
                receiverId: mongoose.Types.ObjectId(`${userId}`),
                _id: mongoose.Types.ObjectId(`${messageId}`)
            })
                .then(() => {
                    resolve()
                })
                .catch(() => {
                    reject()
                })

        })
    }

    countUnreadMessages(userId) {
        return new Promise((resolve, reject) => {
            const userMessageModel = require('./user-message-schema');
            const model = new userMessageModel();
            model.collection.countDocuments({
                receiverId: mongoose.Types.ObjectId(`${userId}`),
                isRead: false
            })
            .then((countedUnreadMessages)=>{
                resolve(countedUnreadMessages);
            })
            .catch(()=>{
                reject();
            })
        });
    }
}
module.exports = UserMessageModel;
