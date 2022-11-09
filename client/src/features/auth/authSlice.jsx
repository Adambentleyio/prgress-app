import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from "../../api/apiSlice"

// inject endpoints

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = AuthSlice.actions

export default AuthSlice.reducer

export const selectCurrentToken = (state) => state.auth.token