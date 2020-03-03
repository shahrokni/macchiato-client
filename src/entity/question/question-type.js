export {QuestionType};

const QuestionType = Object.freeze({
    NotSet : Symbol('NotSet'),
    Reading: Symbol('Reading'),
    Speaking : Symbol('Speaking'),
    Listening :Symbol('Listening'),
    Writing : Symbol('Writing'),
    Slang: Symbol('Slang'),
    Vocab : Symbol('Vocab')
})