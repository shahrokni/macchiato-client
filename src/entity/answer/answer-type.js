export {AnswerType};

const AnswerType = Object.freeze({
    NotSet:   Symbol("NotSet"),
    MultipleChoice:  Symbol("MultipleChoice"),
    Text: Symbol("Text"),
    LongText:Symbol("LongText"),
    Voice:Symbol("Voice")
});