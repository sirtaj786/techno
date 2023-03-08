const express = require("express");
const dbConnect = require("./config/db");

const userrouter = require("./Route/user.route")
const empRouter=require("./Route/employee.route")
const Authentication=require("./Middleware/authentication")
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let PORT =process.env.PORT || 8080;
app.use("/user", userrouter);
app.use(Authentication)
app.use("/employee",empRouter)

app.listen(PORT||8080, async () => {
    try{

        await dbConnect();
        console.log("DB connected")
    }catch{
        console.log("err while connecting")
    }
  console.log(`Listening on http://localhost:${PORT}`);
});
