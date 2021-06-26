const mongoose = require('mongoose');

const dbConnect = async () =>{
const conn = await mongoose.connect('mongodb+srv://ankitarima:ankit8532@AMC@api-learning-cluster-uhjnh.mongodb.net/apli-learning?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

console.log(`db connected ${conn.connection.host}`);
};

module.exports = dbConnect;