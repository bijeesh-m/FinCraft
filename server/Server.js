const express = require("express");
const cors = require("cors");
const user = require("./Routes/userRoute");
const admin = require("./Routes/adminRoute");
const staff = require("./Routes/staffRoute");
const manager = require("./Routes/managerRoute");
const dbConnect = require("./Config/dbConnect");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


require("dotenv").config();
app.use(cookieParser());
app.use("/uploads",express.static('uploads'))

dbConnect();
app.use("/User", user);
app.use("/Staff", staff);
app.use("/Manager", manager);
app.use("/Admin", admin);

app.listen(4000, () => {
  console.log("Server Up");
});
