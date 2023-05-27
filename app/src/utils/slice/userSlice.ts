import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userName: "", 
    email: "", 
    passCode: "",
    online: false
}

export const userSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers:{
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassCode: (state, action) => {
            state.passCode = action.payload;
        },
        setOnline: (state, action) => {
            state.online = action.payload;
        }
    }
})

export const {setEmail, setPassCode, setUserName, setOnline} = userSlice.actions; 

export default userSlice.reducer;
