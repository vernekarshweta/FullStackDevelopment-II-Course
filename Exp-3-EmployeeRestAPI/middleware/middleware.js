const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

function verifyToken(req, res, next) {

     console.log("Middleware hit");

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).send("Token required");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if (err) {
            return res.status(403).send("Invalid token");
        }

        req.user = decoded;

        next();
    });
}

module.exports = {
    verifyToken
};