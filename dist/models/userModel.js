import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    passCode: String,
    online: Boolean
});
export default mongoose.model('User', userSchema);
