const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const Task = require("../models/task");

const User = require("../models/user");


async function home(req,res){

   
    console.log("loggedin");
    // const tasks = await Task.find({user:req.user._id});
    // console.log(tasks);
    res.render('home',{user:req.user});

}

async function homePage(req, res) {

    // here we will check whether the user is logged in or not
    const token = req.cookies['token'];
    let user;
    const tasks = await Task.find({user:req.user._id});

    // verify the token
    if (token) {
        const tokenVerify = jwt.verify(token, "Nodejs_secret_key");

        if (tokenVerify) {
            user = await User.findById(tokenVerify._id);
        }
    }

    res.render('home', { user ,tasks:tasks})
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
                res.redirect('/task');

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

async function userProfile(req,res){
    res.render('profile')
}

async function userLogout(req,res) {
    console.log("clear")
    res.clearCookie('token');
    res.redirect('/');
}



module.exports = { home, homePage, userSignup,userLogin,userProfile,userLogout}
