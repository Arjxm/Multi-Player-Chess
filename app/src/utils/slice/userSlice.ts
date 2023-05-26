import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userName: "", 
    email: "", 
    passCode: ""
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
        }
    }
})

export const {setEmail, setPassCode, setUserName} = userSlice.actions; 

export default userSlice.reducer;
