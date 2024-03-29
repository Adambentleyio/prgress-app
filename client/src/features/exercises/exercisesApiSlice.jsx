import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../api/apiSlice"

const exercisesAdapter = createEntityAdapter({})

const initialState = exercisesAdapter.getInitialState()

export const exercisesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExercises: builder.query({
            query: () => ({
                url: '/exercises',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedExercises = responseData.map(exercise => {
                    exercise.id = exercise._id
                    // exercise title and description sentence case
                    // exercise.title = exercise.title.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
                    return exercise
                });
                return exercisesAdapter.setAll(initialState, loadedExercises)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Exercise', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Exercise', id}))
                    ]
                } else return [{type: 'Exercise', id: 'LIST'}]
            }
        }),
        getUsersExercises: builder.query({
            query: (id) => ({
                url: `/exercises/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedExercises = responseData.map(exercise => {
                    exercise.id = exercise._id
                    // exercise title and description sentence case
                    // exercise.title = exercise.title.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
                    return exercise
                });
                return exercisesAdapter.setAll(initialState, loadedExercises)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Exercise', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Exercise', id}))
                    ]
                } else return [{type: 'Exercise', id: 'LIST'}]
            }
        }),
        addNewExercise: builder.mutation({
            query: initialExerciseData => ({
                url: '/exercises',
                method: 'POST',
                body: {...initialExerciseData}
            }),
            invalidatesTags: [
                {type: 'Exercise', id: 'LIST'}
            ]
        }),
        addExerciseLoad: builder.mutation({
            query: initialExerciseData => ({
                url: '/exercises/load',
                method: 'PATCH',
                body: {...initialExerciseData}
            }),
            invalidatesTags: [
                {type: 'Exercise', id: 'LIST'}
            ]
        }),
        updateExercise: builder.mutation({
            query: initialExerciseData => ({
                url: '/exercises',
                method: 'PATCH',
                body: {...initialExerciseData}
            }),
            invalidateTags: [
                {type: 'Exercise', id: 'LIST'}
            ]
        }),
        deleteExercise: builder.mutation({
            query: ({id}) => ({
                url: '/exercises',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Exercise', id: arg.id}
            ]
        }),
        deleteExerciseLoad: builder.mutation({
            query: ({exerciseId, loadId}) => ({
                url: '/exercises/load',
                method: 'DELETE',
                body: {exerciseId, loadId}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Exercise', id: arg.id}
            ]
        })
    })
})

export const {
    useGetExercisesQuery,
    useGetUsersExercisesQuery,
    useAddNewExerciseMutation,
    useAddExerciseLoadMutation,
    useUpdateExerciseMutation,
    useDeleteExerciseMutation,
} = exercisesApiSlice

export const selectExecisesResponse = exercisesApiSlice.endpoints.getExercises.select()

const selectExercisesData = createSelector(
    selectExecisesResponse,
    exercisesResult => exercisesResult.data
)

export const {
    selectAll: selectAllExercises,
    selectById: selectExerciseById,
    selectIds: selectExercisesIds
    // Pass in a selector that returns the exercises slice of state
} = exercisesAdapter.getSelectors(state => selectExercisesData(state) ?? initialState)