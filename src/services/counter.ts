import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: [],
    },
    reducers: {
        increment: (state: any, id) => {
            state.value = [...state.value, id]
        },
        decrement: (state: any, item) => {
            state.value = state.value.filter((value: any) => value != item.payload )
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer