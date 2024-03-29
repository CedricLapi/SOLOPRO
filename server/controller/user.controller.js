const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

module.exports = {
    register: async (req, res) => {
        try {
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser) {
                return res.status(400).json({message: "Email already exists"});
            } else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id: newUser.id, email: newUser.email}, secret, {expiresIn: "1d"});
                console.log(userToken);
                res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "success", user: newUser});
            }
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if (passwordMatch) {
                    const userToken = jwt.sign({_id: user.id, email: user.email}, secret, {expiresIn: "1d"});
                    console.log(userToken);
                    return res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "success", user: user});
                }
            }
            // Invalid login attempt
            return res.status(400).json({message: "Invalid login attempt"});
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("usertoken").json({message: "success"});
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            return res.json(users);
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.remove(); // Remove the user from the database
            return res.json({ message: "User deleted successfully" });
        } catch(err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    findOneUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.json(user);
        } catch(err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

};



