import app from "./src/app.js";
import 'dotenv/config'
import dbConnector from "./src/config/dbConnector.js";

dbConnector()

app.listen(3000, (req, res) => {
    console.log("The server is running at the 3000");
})