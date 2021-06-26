const mongoose = require('mongoose');

const dbConnect = async () =>{
const conn = await mongoose.connect(process.env.atlasUri , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

console.log(`db connected ${conn.connection.host}`);
};

module.exports = dbConnect;