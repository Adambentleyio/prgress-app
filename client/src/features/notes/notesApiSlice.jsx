import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../../api/apiSlice"

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => ({
                url: '/notes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        addNewNote: builder.mutation({
            query: initialNoteData => ({
                url: '/notes',
                method: 'POST',
                body: {...initialNoteData}
            }),
            invalidatesTags: [
                {type: 'Note', id: 'LIST'}
            ]
        }),
        updateNote: builder.mutation({
            query: initialNoteData => ({
                url: '/notes',
                method: 'PATCH',
                body: {...initialNoteData}
            }),
            invalidatesTags: [
                {type: 'Note', id: "LIST"}
            ]
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: '/notes',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Note', id: arg.id}
            ]
        })
    }),
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation

} = notesApiSlice

// return the query object from the notes slice
export const selectNotesResponse = notesApiSlice.endpoints.getNotes.select()

//now create memoized version of the query object

const selectNotesData = createSelector(
    selectNotesResponse,
    notesResult => notesResult.data // normalized state object with ids and entities  e.g. {{ids}, {entities}}
)

// getSelectors creates these selectors 👇 and we rename them with aliases using destructing

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)