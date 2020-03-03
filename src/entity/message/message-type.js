export {MessageType};

const MessageType = Object.freeze({
    NotSet: Symbol('NotSet'),
    Error: Symbol('Error'),
    Information: Symbol('Information'),
    Warning:Symbol('Warning')
})