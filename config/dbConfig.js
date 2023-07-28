const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Connectioh to database was established`);
        console.log(`${conn.connection.host}`);
        console.log(`${conn.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbConnection;
