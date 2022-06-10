import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '../../services/store'
import { sojiData, SojiProps } from '../Soji/sojiData';


// define a interface of the search state
export interface SearchState {
    searchTerm: string
    // TODO: replace this with contract search results
    sojis: Array<SojiProps>;
    sojisResults: Array<SojiProps>;
}

// define the initial state of the search state
const initialState: SearchState = {
    searchTerm: '',
    sojis: sojiData,
    sojisResults: sojiData
}

// create the search slice
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase()
            state.sojisResults = state.sojis.filter(soji => {
                return (
                    // yes I should search the terms before getting all the data!
                    // requires some sort of cache, but yolo
                    // lets get all sojis and then filter them!
                    
                    soji.name.toLowerCase().includes(state.searchTerm) ||
                    (soji.description || "").toLowerCase().includes(state.searchTerm) ||
                    (soji.tags || []).some(tag => tag.toLowerCase().includes(state.searchTerm))
                )
            })
            return state
        }
    }
})

// export the search slice
export const { setSearchTerm } = searchSlice.actions

// export the getter of the search state
export const getSearchTerm = (state: RootState) => state.searchReducer.searchTerm
// export the reducer of the search state
export const searchReducer = searchSlice.reducer

