import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers';
import type { RootState } from '../../services/store'
// import { sojiData, SojiProps } from '../Soji/sojiData';

import sojiNftAddress from "../../contracts/SojiNFTAddress.json";
import sojiNFTJSON from "../../artifacts/contracts/SojiNFT.sol/SojiNft.json";
import { SojiNft } from "../../types";
import { Soji } from '../Soji/UploadSojiService';

// define a interface of the search state
export interface SearchState {
    searchTerm: string
    sojis: Array<Soji>;
    sojisResults: Array<Soji>;
}

// define the initial state of the search state
const initialState: SearchState = {
    searchTerm: '',
    sojis: [],
    sojisResults: []
}


export const getSojis = createAsyncThunk('search/getSojis', async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    const sojis: Soji[] = []
    if (typeof window.ethereum !== 'undefined') {
        const contract = new ethers.Contract(sojiNftAddress.address, sojiNFTJSON.abi, provider) as SojiNft
        try {
            const sojiCount = await contract.getSOJICount()
            const sojisStringPromise: Promise<string>[] = []
            for (let i = 0; i < sojiCount.toNumber(); i++) {
                sojisStringPromise.push(contract.tokenURI(ethers.BigNumber.from(i)))
            }
            const sojisStrings = await Promise.all(sojisStringPromise)

            for (let i = 0; i < sojisStrings.length; i++) {
                console.info(sojisStrings[i].replace("ipfs://", "https://ipfs.io/ipfs/"))
                // const soji: Soji = await fetch(
                //     sojisStrings[i].replace("ipfs://", "ipfs.io/ipfs/")).then(res => res.json())
                const res = await fetch(sojisStrings[i].replace("ipfs://", "https://ipfs.io/ipfs/"))
                const soji: Soji = await res.json()
                soji.image = await (await fetch(soji.image.replace("ipfs://", "https://ipfs.io/ipfs/"))).text()
                soji.animation_url = await (await fetch(soji.animation_url.replace("ipfs://", "https://ipfs.io/ipfs/"))).text()

                console.info("soji:", soji)
                sojis.push(soji)
            }
        } catch (err) {
            console.warn("Error: ", err)
        }
    }
    return sojis
})


// filter sojis based on search term
function filterSojis(sojis: Soji[], searchTerm: string) {
    return sojis.filter(soji => {
        return (
            soji.name.toLowerCase().includes(searchTerm) ||
            (soji.description || "").toLowerCase().includes(searchTerm) ||
            (soji.tags || []).some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
}



// create the search slice
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase()
            state.sojisResults = filterSojis(state.sojis, state.searchTerm)
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSojis.pending, (state, action) => {
            console.info("getSojis pending")
        })
        builder.addCase(getSojis.fulfilled, (state, action) => {
            console.info("getSojis fulfilled")
            state.sojis = action.payload
            state.sojisResults = filterSojis(state.sojis, state.searchTerm)
            return state
        })
    }
})

// export the search slice
export const { setSearchTerm } = searchSlice.actions

// export the getter of the search state
export const getSearchTerm = (state: RootState) => state.searchReducer.searchTerm
// export the reducer of the search state
export const searchReducer = searchSlice.reducer

