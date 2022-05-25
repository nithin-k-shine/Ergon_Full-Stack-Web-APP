const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });

//MongoDB database
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB Connection succesful');
});

//Server
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});