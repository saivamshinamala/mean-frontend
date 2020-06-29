const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "!@#$%^&*()OIUYTrfghjHTYUIJHGFD$%^&**UYTRH78984er5ssdd4dsf5f66eg212@#$%^TGsdcftyh");
        req.userData = { email: decodedToken.email, userId: decodedToken.id }
        next();
    }
    catch(error) {
        res.status(401).json({
            message: "User authentication failed"
        });
    }
};