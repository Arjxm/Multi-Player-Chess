import mongoose from "mongoose";

const uri = "mongodb+srv://chess:v01GmZrFt4ycVrrD@chessclu.fuct7p8.mongodb.net/user?retryWrites=true&w=majority";
const dbCon = async () => {
  try {
      await mongoose.connect(uri);
  }catch(err){
      console.log(err);
  }
}

export default dbCon;
