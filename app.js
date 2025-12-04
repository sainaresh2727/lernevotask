require("dotenv").config()

let Express=require("express")
let App=Express()
App.use(Express.json())



//DB CONNECT
let DbConnect=require('./dbconnect/db')
DbConnect()

//MODEL
let Model=require("./model/model")

let Jwt=require("jsonwebtoken")
let Bcrypt=require("bcrypt")


//REGISTER
App.post('/register',async (req,res)=>{
    let {name,email,password,role}=req.body
    try{
        let ExistUser=await Model.findOne({email})
        if(ExistUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }
     let Saltround=10
     let GenSalt=await Bcrypt.genSalt(Saltround)

     let HashPassWord=await Bcrypt.hash(password,GenSalt)

     let NewUser=new Model({name,email, password_hash:HashPassWord,role})
     await NewUser.save()
     res.status(201).json({
        success:true,
        message:"User Registered"
     })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
})



const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, unauthorized" });

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


//LOGIN
App.post('/login',async (req,res)=>{
    let { email, password } = req.body;
    try{
        let ExistUser=await Model.findOne({email})
        if(!ExistUser){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }
        let ComparePass=await Bcrypt.compare(password,ExistUser.password_hash)
        if(!ComparePass){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }

    let token=Jwt.sign({id:ExistUser._id,role:ExistUser.role},process.env.JWT_SECRET, { expiresIn: "1d" }) 
    res.status(200).json({
        success:true,
        message:"Login Successfully",
        Token:token
    })
    }
    catch(err){
    res.status(500).json({ message: "Server Error", error: err });
    }
})


function allowRole(...roles){
    return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: No Access" });
    }
    next();
  };
}

App.get("/super-admin/users", auth, allowRole("super_admin"), async (req, res) => {
  const users = await Model.find().select("name email role");
  res.json(users);
});



App.get("/me", auth, async (req, res) => {
  const user = await Model.findById(req.user.id).select("-password_hash");
  res.json(user);
});



App.listen(process.env.PORT,()=>{
    console.log("Server Running Successfully");
    
})