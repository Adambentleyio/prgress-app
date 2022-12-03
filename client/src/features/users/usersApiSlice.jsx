import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../../api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
            url: '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            }}),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {...initialUserData}
            }),
            invalidatesTags: [{
                type: 'User', id: "LIST"
            }]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {...initialUserData}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id }
            ]
    }),
})
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

// return the query object from the users slice
export const selectUsersResponse = usersApiSlice.endpoints.getUsers.select()

//now create memoized version of the query object

const selectUsersData = createSelector(
    selectUsersResponse,
    usersResult => usersResult.data // normalized state object with ids and entities  e.g. {{ids}, {entities}}
)

// getSelectors creates these selectors 👇 and we rename them with aliases using destructing

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)