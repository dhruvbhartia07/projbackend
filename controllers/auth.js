
//Siging up user
exports.signup = (req, res) => {
    console.log("REQ BODY", req.body);
    res.json({
        message: "User Signup successful"
    });
};

//Signout Auth logic
exports.signout = (req, res) => {
    res.json({
        message: "User Signout successful"
    });
};