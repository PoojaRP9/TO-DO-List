const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const Task = require("../models/task");

const User = require("../models/user");


async function userProfile(req,res){
    res.render('profile')
}

async function homePage(req, res) {
    let tasks;
    if(req?.user) {
        tasks = await Task.find({ user: req.user._id });
    }
    res.render('home', { user: req?.user, tasks: tasks })

}

async function userSignup(req, res) {
    if (req.method === "POST") {
        // we will add user here
        const data = req.body;
        const user = await User.create({
            name: data.name,
            email: data.email,
            contact: data.contact,
            password: data.password
        });
        if (user) {
            res.redirect('/login');
        } else {

            res.redirect('/signup');
        }
    } else {
        res.render('signup');
    }
}

async function userLogin(req, res) {
    if (req.method === "POST") {
        // we will get user
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (user) {
            

            if (user.password === data.password) {
               
                const token = jwt.sign({ _id: user._id }, "Nodejs_secret_key");
                console.log('token')
                res.cookie('token', token);

                // now user is loggin we redirect to home page
                res.redirect('/');

            } else {
                
                res.redirect('/login');
            }
        } else {
            
            res.redirect('/signup')
        }
    } else {
        res.render('login');
    }
}



async function userLogout(req,res) {
    console.log("clear")
    res.clearCookie('token');
    res.redirect('/');
}



module.exports = { homePage, userSignup,userLogin,userProfile,userLogout}
