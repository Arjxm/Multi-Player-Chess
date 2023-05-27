import express from "express";
import cors from "cors";
import {Server} from "socket.io"; 
import {createServer} from "http";
import dbCon from "./utils/dbCon.js";
import userModel from "./models/userModel.js";

const port = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(express.json())


//Socket.io
const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:3000"
    }
});

//DB connection 
dbCon();

// define a route handler for the default home page
//app.get("/", (req, res) => {
//  res.status(200).json({message: "Hello"});
// });

//io.on("connection", (socket) => {
//  socket.emit("hello", "world");
//});

io.on("connection", (socket) => {
  socket.on("move", (m) => {socket.emit("mo", m)})
});
app.post("/api/auth/signup", async (req, res) => {

    const {email, userName, passCode} = req.body; 

    const respose = await new userModel({
        email:email,
        userName:userName,
        passCode:passCode,
        online: false
    }).save();

    if(respose){
        res.status(201).json({message: "Successfully created"});
    }else{
        res.status(401).json({message: "Something missing"});
    }
})

app.post("/api/auth/login", async (req, res) => {
    const {email, passCode} = req.body; 

    const response = await userModel.findOne({email})

    if(response?.passCode === passCode){
        res.status(200).json({message: "Logged in"});
    }
    else{
        res.status(401).json({message:"either passCode wrong or try to sign up first"});
    }
})

// start the Express server
httpServer.listen(port , () => {
  console.log(`server started at http://localhost:${port}`);
});
