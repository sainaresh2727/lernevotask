require("dotenv").config()

let Mongoose=require("mongoose")

function DbConnect(){
    Mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("DB CONNECTED");
        
    }).catch(()=>{
        console.log("DB NOT CONNECTED");
        
    })
}
module.exports=DbConnect