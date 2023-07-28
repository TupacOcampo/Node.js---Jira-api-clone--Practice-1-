const express = require ("express");
const dotEnv = require("dotenv").config();
const dbConnection = require("./config/dbConfig");

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(express.json());
app.use("/api/v1/groups", require("./routes/groupRoutes"));
app.use(require("./middleware/errorHandling"));

app.listen(PORT, (req, res) => {
    console.log(`Server listening in port ${PORT}`);
});