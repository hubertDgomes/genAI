import app from "./src/app.js";
import 'dotenv/config'
import dbConnector from "./src/config/dbConnector.js";

dbConnector()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`The server is running at the ${PORT}`);
})