    const mongoose = require("mongoose");

    const dbConnect = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(() => {
        console.log("DataBase Connected");
        })
        .catch((err) => {
        console.log(err);
        });
    };
    module.exports = dbConnect;
