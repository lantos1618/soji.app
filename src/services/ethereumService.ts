import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

import { ethers, providers } from 'ethers';
// import { Moralis } from "moralis"


interface EthereumState {
    provider?: any;
    accounts: string[]
}

// define the initial state of the search state
const initialState: EthereumState = {
    provider: undefined,
    accounts: []
}


// create the search slice
const EthereumSlice = createSlice({
    name: 'ethereum',
    initialState,
    reducers: {
        setProvider: (state, action: PayloadAction<any>) => {
            return state
        }
    },
    extraReducers: (builder) => {
       
    }
})

// export the search slice
export const { setProvider } = EthereumSlice.actions

export const getProvider= (state: RootState) => state.ethereumReducer.provider;
// export the reducer of the search state
export const ethereumReducer = EthereumSlice.reducer

