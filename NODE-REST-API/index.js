const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");


const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")
const path = require("path")
const cors = require('cors');


const multer = require("multer")
dotenv.config();
mongoose.connect("mongodb+srv://u2004051:u2004051@cluster0.z9ishmc.mongodb.net/alapcharita?retryWrites=true&w=majority&appName=Cluster0",
  
).then(()=>console.log('db connection is successful')).catch((err)=>{console.error(err);});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/api/users",userRoute);
app.use("/images",express.static(path.join(__dirname,"public/images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      const fileName = req.body.name || file.originalname;
      cb(null, fileName);
    },
  });
const upload=multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      if (!req.body.name) {
        return res.status(400).json({ message: "File name is required" });
      }
      return res.status(200).json("File uploaded successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred" });
    }
  });
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.get("/",(req,res)=>{
    res.send("welcome to homepage")
})
app.get("/users",(req,res)=>{
    res.send("welcome to page")
})

app.listen(8800,()=>{
    console.log("backend server is ready!");
})
