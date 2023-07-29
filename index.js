const express = require ("express");
const dotEnv = require("dotenv").config();
const dbConnection = require("./config/dbConfig");
const validation = require("./middleware/authorization");

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(express.json());

app.use("/api/v1/groups", validation, require("./routes/groupRoutes"));
app.use("/api/v1/tasks", validation, require("./routes/taskRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

app.use(require("./middleware/errorHandling"));

app.listen(PORT, (req, res) => {
    console.log(`Server listening in port ${PORT}`);
});