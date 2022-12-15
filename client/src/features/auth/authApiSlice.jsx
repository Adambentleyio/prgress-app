import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { buildCreateApi } from "@reduxjs/toolkit/dist/query";

import { apiSlice } from "../../api/apiSlice"
import { logOut, setCredentials } from "./authSlice";

const authAdapter = createEntityAdapter({})

const initialState = authAdapter.getInitialState()

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({ // we call what we pass in CREDENTIALS, in this case username/password
                url: '/auth',
                method: 'POST',
                body: {...credentials}
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                    await dispatch(logOut())
                    await dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: 'auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    console.log({accessToken});
                    const { accessToken } = data
                    dispatch(setCredentials({accessToken}))

                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice

