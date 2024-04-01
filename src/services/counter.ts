import { createSlice } from '@reduxjs/toolkit'
import { chairType } from '../model/movie'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: [],
        total: 0
    },
    reducers: {
        increment: (state: any, item) => {
            console.log(item)
            state.value = [...state.value, item.payload]
            
            if (item.payload.preferential){
                state.total += 10
            }else if (item.payload.especial){
                state.total += 30
            }else{
                state.total += 20
            }
        },
        decrement: (state: any, item) => {
            state.value = state.value.filter((value: chairType) => value.id != item.payload.id )
            
            if (item.payload.preferential){
                state.total -= 10
            }else if (item.payload.especial){
                state.total -= 30
            }else{
                state.total -= 20
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer