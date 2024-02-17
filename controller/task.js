const jwt = require("jsonwebtoken");

const Task = require("../models/task");
const User = require("../models/user")

async function getTask(req,res){

    console.log("loggedin");
    const tasks = await Task.find({user:req.user._id});
    console.log(tasks);
    res.render('home',{tasks:tasks,user:req.user});
}

async function newtask(req,res){

    const data = req.body;
    console.log(req.user);
    const task = await Task.create({user:req.user,name:data.name});

    res.redirect('/task');
}
async function completetask(req,res){

    
    const taskId = req.params.id;
    
    await Task.findByIdAndUpdate(taskId, { $set: { completed: true } });
    
    res.redirect('/task');
}
async function deletetask(req,res){

   
    const taskId = req.params.id;
    
    await Task.findByIdAndDelete(taskId);
    
    res.redirect('/task');
}

module.exports={getTask,newtask,completetask,deletetask}