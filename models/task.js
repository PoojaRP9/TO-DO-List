// const { name } = require("ejs");
// const {completed}=require("ejs");
// const {user} = require("../models/user")
const {Schema,model}=require("mongoose");

const taskSchema = new Schema({
    name:{
        type:String,
        default : 'task'
    },
    date:{
        type:Date,
        default : Date.now
    },
    completed: {
         type: Boolean,
        default : false 
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user' 
    }
   
});

const Task = model("task",taskSchema);

module.exports = Task;