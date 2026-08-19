import app from "./src/app.js";
import 'dotenv/config'
import dbConnector from "./src/config/dbConnector.js";

dbConnector()


if (process.env.NODE_ENV !== "production") {
    app.listen(process.env.PORT || 3000, () => {
        console.log("The server is running at port 3000");
    });
}

export default app;