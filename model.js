

const mongoose=require("mongoose")
const userschema=new mongoose.Schema({

   username : String,
   email : String, 
   passowrd:  String,
   confirm_password : String,
   mobile_no : String    
});

module.exports=mongoose.model("User", userschema)