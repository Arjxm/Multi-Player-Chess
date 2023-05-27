import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    panel: 0
}

export const appSlice = createSlice({
    name: 'app', 
    initialState, 
    reducers:{
        setPanel: (state, action) => {
            state.panel = action.payload;
        }
          }
})

export const {setPanel} = appSlice.actions; 

export default appSlice.reducer;
