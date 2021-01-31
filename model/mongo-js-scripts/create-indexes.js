db.userdetails.createIndex({cellphone:1},{partialFilterExpression:{cellphone:{$type:"string"}}});
db.userdetails.createIndex({email:1},{partialFilterExpression:{email:{$type:"string"}}});