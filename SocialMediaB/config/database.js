const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error("DB_URL environment variable is not set.");
        }

        const data = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Connected Successfully: ${data.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = connectDb;
