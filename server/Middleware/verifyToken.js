const jwt = require("jsonwebtoken");

async function verifyToken(req,res,next){
    try{
        
        let token = req.body.token;
        const verify = jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        console.log(verify)
        next();
    }
    catch(error){
        console.log("Token Expired");
        res.status(200).send({message:'Token Expired'})
    }

}

module.exports = verifyToken;

