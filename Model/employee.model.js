const mongoose=require("mongoose")
const empSchema=new mongoose.Schema({
    empname:{type:String,required:true},
    empemail:{type:String,required:true},
    empage:{type:String,required:true},
    empId :{type:String,required:true},
})
const empModel=mongoose.model("employee",empSchema)
module.exports=empModel