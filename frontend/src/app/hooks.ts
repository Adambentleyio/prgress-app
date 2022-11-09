import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// useAppDispatch and useAppSelector are pretyped versions of
// useDispatch and useSelector hooks that know the types of the reducers and recognise thunks
// export the new hooks here instead of declaring them in each component useSelector(state : rootState => state.My_REDUCER_SLICE)
// or useDispatch<appDispatch>() that understands thuhnks

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
