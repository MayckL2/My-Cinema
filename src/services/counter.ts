import { createSlice } from '@reduxjs/toolkit'
import { chairType } from '../model/movie'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: [],
    },
    reducers: {
        increment: (state: any, item) => {
            console.log(item)
            state.value = [...state.value, item.payload]
        },
        decrement: (state: any, item) => {
            state.value = state.value.filter((value: chairType) => value.id != item.payload.id )
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer