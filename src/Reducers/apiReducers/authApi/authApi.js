import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react"
import {
    setUser
} from "../../userReducer/userReducer";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        }),

        registration: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        })
    })
})


export const {
    useLoginMutation,
    useRegistrationMutation,
} = authApi;