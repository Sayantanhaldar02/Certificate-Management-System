import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react"
import {
    getAllCertificates
} from "../../certificateReducers/certificateReducer";
export const certificateApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/certificate",
        prepareHeaders: (headers, {
            getState
        }) => {

            const token = getState().user.token || null;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["certificates"],
    endpoints: (builder) => ({
        allCertificates: builder.query({
            query: () => ({
                url: "/all-certificates",
                method: "GET",
            }),
            async onQueryStarted(args, {
                dispatch,
                queryFulfilled
            }) {
                try {
                    const {
                        data
                    } = await queryFulfilled;
                    dispatch(getAllCertificates(data));
                } catch (error) {
                    console.log("Failed to fetch certifiocates");
                    console.log(error);
                }
            },
            providesTags: ["certificates"]
        }),
        getCertificateById:builder.query({
            query:(id)=>({
                url:`/${id}`,
                method:"GET",
            })
        }),
        createCertificates: builder.mutation({
            query: (data) => ({
                url: "/create-certificate",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["certificates"]
        }),
        updateCertificate: builder.mutation({
            query: (data) => ({
                url: `/${data._id}`,
                body: data,
                method: "PATCH",
            }),
            invalidatesTags: ["certificates"]
        }),
        deleteCertificate: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["certificates"]
        })
    })
})


export const {
    useAllCertificatesQuery,
    useCreateCertificatesMutation,
    useUpdateCertificateMutation,
    useDeleteCertificateMutation,
    useLazyGetCertificateByIdQuery
} = certificateApi;