


/*{module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, SECRET, (err, payload) => {
        if(err){
            res.status(401).json({verified: false});
        }else{
            next();
        }
    });
}
}*/


const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            // Check if the authenticated user is an admin
            if (payload.isAdmin) {
                // If user is an admin, proceed to next middleware
                next();
            } else {
                // If user is not an admin, return unauthorized status
                res.status(403).json({ verified: true, isAdmin: false, message: "You are not authorized to access this resource." });
            }
        }
    });
};
