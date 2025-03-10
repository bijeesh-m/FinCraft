const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const token = req.cookies.adminAuthToken;
    if (token) {
        jwt.verify(token, process.env.SEC_KEY, (err, admin) => {
            if (err) {
                res.status(400).json({ message: "Access Denied" });
            } else {
                req.admin = admin;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "Login Required" });
    }
};
module.exports = adminAuth;
