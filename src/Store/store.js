import {configureStore} from "@reduxjs/toolkit"
import { authApi } from "../Reducers/apiReducers/authApi/authApi";
import { userReducer } from "../Reducers/userReducer/userReducer";
import { certificateApi } from "../Reducers/apiReducers/certificateApi/certificateApi";
import { certificateReducer } from "../Reducers/certificateReducers/certificateReducer";


const store = configureStore({
    reducer: {
        [authApi.reducerPath]:authApi.reducer,
        [userReducer.name]:userReducer.reducer,
        [certificateApi.reducerPath]:certificateApi.reducer,
        [certificateReducer.name]:certificateReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(), 
        authApi.middleware,
        certificateApi.middleware,
    ]
})


export default store;