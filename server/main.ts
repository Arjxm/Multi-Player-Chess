import express from "express";
import cors from "cors";
import {Server} from "socket.io"; 
import {createServer} from "http";
import dbCon from "./utils/dbCon.js";
import userModel from "./models/userModel.js";
import {generateToken} from "./utils/generateToken.js";
import {addUser, getUserInRoom} from "./helper/createRoom.js";
import {Socket} from "dgram";

const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors()
);
const httpServer = createServer(app);
app.use(express.json())



//Socket.io
const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:3000" || "https://multiplayer-chessgame.netlify.app"
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

io.on('connection', (socket) => {
    socket.on('join', (room: string) => {
        socket.join(room);
    }); 

    socket.on('message', (room: string, meassage: string) => {
        io.to(room).emit('message', meassage);
    })
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
        const token = generateToken(JSON.stringify(response?._id)); 
        res.cookie("user", token, { expires:new Date(Date.now() + 25892000000), httpOnly:true})
        res.status(200).json({message: "Logged in", userName: response?.userName});
    }
    else{
        res.status(401).json({message:"either passCode wrong or try to sign up first"});
    }
})

// start the Express server
httpServer.listen(port , () => {
  console.log(`server started at http://localhost:${port}`);
});
