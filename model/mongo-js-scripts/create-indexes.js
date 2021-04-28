db.userdetails.createIndex({ cellphone: 1 }, {
    unique: true, partialFilterExpression: { cellphone: { $type: "string" } }
});
db.userdetails.createIndex({ email: 1 },
    { unique: true, partialFilterExpression: { email: { $type: "string" } } });