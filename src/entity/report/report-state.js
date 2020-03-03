export {ReportState};

const ReportState = Object.freeze({
    NotSet: Symbol('NotSet'),
    PartiallyDone : Symbol('PartiallyDone'),
    Done : Symbol('Done')
})