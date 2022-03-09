const express = require("express");

const app = express();

const port = 8000

app.get("/", (req, res) => {
    return res.send("This is Home Page");
});

app.get("/signup", (req, res) => {
    return res.send("This is signup routes");
});

const admin = (req, res) => {
    return res.send("This is admin page");
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running");
    next();
};

const isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn is running");
    next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);

app.listen(port, () => {
    console.log("Server is up and running..");
});

// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })