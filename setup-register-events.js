module.exports = function RegisterEvents() {
    const EventEmitter = require('events');
    class UserMessageEventEmitter extends EventEmitter { };
    global.userMessageEventEmiiter = new UserMessageEventEmitter();
}
