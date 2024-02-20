// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:{} ,
    },
    reducers: {
        setUser: (state,action)=>{
            state.user=action.payload
        }
    },
});

export const userReduser = userSlice.reducer;
export const {
setUser
} = userSlice.actions;