import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";

type CounterState = {
    count: number,
    loading: boolean,
    failed: string | null
}

const initialState: CounterState = {
    count: 0,
    loading: false,
    failed: null
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload
            state.loading = false
        },
        decrement: (state, action) => {
            state.count -= action.payload
            state.loading = false
        },

        incrementAsync: (state) => {
            state.loading = true
            state.failed = null
        },
        decrementAsync: (state) => {
            state.loading = true
            state.failed = null
        },
        failedAsync: (state, action) => {
            state.loading = false
            state.failed = action.payload
        }
    }
})

export const {increment, decrement, incrementAsync, decrementAsync, failedAsync} = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.count;
export const selectLoading = (state: RootState) => state.counter.loading;
export const selectFailed = (state: RootState) => state.counter.failed;
export default counterSlice.reducer;