const userModel = require("../Models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { addToCart } = require('../scripts/cartFunction');


//handle User Login Operation
const userLogin = async (req, res) => {
    //Get data
    let userCred = req.body;
    console.log(userCred);
    const user = await userModel.findOne({ username: userCred.username });
    //If user Exists
    if (user) {
        //Compare the password
        if (bcryptjs.compareSync(userCred.password, user.password)) {
            //Create a jwt Token
            const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2d" })

            //Check if user Added items to cart
            if (userCred.cart.length !== 0) {
                user.cart = addToCart(userCred.cart, user.cart);
                const dbRes = await userModel.updateOne({ username: user.username }, user);
                console.log(dbRes);
            }

            res.status(200).send({ message: "Login Successful", user: user, token: token })
        }
        else {
            res.status(200).send({ message: "Wrong Password" });
        }
    }
    else {
        res.status(200).send({ message: "Wrong UserName" });
    }

};


//Handle User registration
const userRegistration = async (req, res) => {
    try {
        let userData = req.body;

        //Hash the password and update it with userData
        let hashedPassword = bcryptjs.hashSync(userData.password, 5);
        userData.password = hashedPassword;

        userData.cart = [];
        //Create user in Database
        const dbRes = await userModel.create(userData);
        res.status(200).send({ message: "User Created", user: dbRes });
    }
    catch (error) {
        console.log("|Error", error)
    }
}

//Handle User Cart Updation.
const updateUserCart = async (req, res) => {
    try {
        let user = req.body;
        let dbRes = await userModel.updateOne({ _id: user._id }
            , { $set: { cart: user.cart } });
        res.status(200).send({message : "Cart Updated"});
    } catch (error) {
        console.log("Error");
        res.status(500).send({message : "internal server error"});
    }
}


module.exports = { userLogin, userRegistration, updateUserCart };
