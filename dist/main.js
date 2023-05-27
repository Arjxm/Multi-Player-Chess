var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import dbCon from "./utils/dbCon.js";
import userModel from "./models/userModel.js";
const port = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(express.json());
//Socket.io
const io = new Server(httpServer, {
    cors: {
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
    socket.on("move", (m) => { socket.emit("mo", m); });
});
app.post("/api/auth/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName, passCode } = req.body;
    const respose = yield new userModel({
        email: email,
        userName: userName,
        passCode: passCode,
        online: false
    }).save();
    if (respose) {
        res.status(201).json({ message: "Successfully created" });
    }
    else {
        res.status(401).json({ message: "Something missing" });
    }
}));
app.post("/api/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, passCode } = req.body;
    const response = yield userModel.findOne({ email });
    if ((response === null || response === void 0 ? void 0 : response.passCode) === passCode) {
        res.status(200).json({ message: "Logged in" });
    }
    else {
        res.status(401).json({ message: "either passCode wrong or try to sign up first" });
    }
}));
// start the Express server
httpServer.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
