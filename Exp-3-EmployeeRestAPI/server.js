const express = require("express")

const app = express()

app.use(express.json())

const employeeRoutes = require("./routes/employeeRoutes")

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    // dummy check
    if (username === "admin" && password === "123") {

        const user = {
            id: 1,
            username: "admin"
        };

        const token = jwt.sign(user, SECRET_KEY, {
            expiresIn: "1h"
        });

        res.json({
            message: "Login success",
            token: token
        });

    } else {
        res.status(401).send("Invalid user");
    }

});


// add routing
app.use("/employees",verifyToken, employeeRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000")
})