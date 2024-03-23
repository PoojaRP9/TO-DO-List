const jwt = require("jsonwebtoken");

const Task = require("../models/task");
const User = require("../models/user")



async function newtask(req,res){

    const data = req.body;
    console.log(req.user);
    const task = await Task.create({user:req.user,name:data.name});

    res.redirect('/');
}
async function completetask(req,res){

    
    const taskId = req.params.id;
    
    await Task.findByIdAndUpdate(taskId, { $set: { completed: true } });
    
    res.redirect('/');
}
async function deletetask(req,res){

   
    const taskId = req.params.id;
    
    await Task.findByIdAndDelete(taskId);
    
    res.redirect('/');
}

module.exports={newtask,completetask,deletetask}