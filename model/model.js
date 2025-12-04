let Mongoose=require("mongoose")

let Schema=new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     password_hash:{
        type:String,
        required:true
    },
    role: {
    type: String,
    enum: ["user", "trainer", "admin", "super_admin"],
    default: "user",
  },
  created_at: { 
    type: Date, 
    default: Date.now 
},
})

let Model=Mongoose.model("UserData",Schema)

module.exports=Model