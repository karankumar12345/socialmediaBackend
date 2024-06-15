const mongoose = require("mongoose");

const connectDb = () => {
    if (!process.env.DB_URL) {
        console.error("DB_URL environment variable is not set.");
        return;
    }

    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`Connected Successfully: ${data.connection.host}`);
    })
}

module.exports = connectDb;
