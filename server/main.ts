import express from "express";
import cors from "cors";

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.status(200).json({message: "Hello"});
});

// start the Express server
app.listen(port , () => {
  console.log(`server started at http://localhost:${port}`);
});
