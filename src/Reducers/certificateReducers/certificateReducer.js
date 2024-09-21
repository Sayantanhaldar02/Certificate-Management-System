import {createSlice} from "@reduxjs/toolkit"


export const certificateReducer = createSlice({
    name:"certificate",
    initialState:{
        allCertificates:[]
    },

    reducers:{
        getAllCertificates:(state,action)=>{
            state.allCertificates = action.payload &&  [...action.payload.data];
        }
    }
})

export const {
    getAllCertificates
} = certificateReducer.actions;