// I should move this to another file maybe use some sort of state management 

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { IFPSSingleton } from "../../services/IFPSSingleton";
import { RootState } from "../../services/store";
import { ToBase64 } from "../../services/utils";
import sojiNFTJSON from "../../artifacts/contracts/SojiNFT.sol/SojiNft.json";
import { SojiNft } from "../../types";


const sojiNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

// redux or something like that
export interface Soji {
    name: string;
    description: string;
    // the image IPFS URL
    image: string;
    // the audio IPFS URL
    animation_url: string;
    tags: string[];
}
export interface SojiFileToUpload extends Soji {
    // the image file
    imageFile?: File;
    // the image base64 to be used in previews
    imageBase64?: string;
    // the animation file
    audioFile?: File;
    // the audio base64 to be used in previews
    audioBase64?: string;
}

// define a upload soji state
export interface UploadSojiState {
    sojiFileToUpload: SojiFileToUpload
    validation: {
        name: boolean;
        description: boolean;
        image: boolean;
        animation_url: boolean;
        tags: boolean;
        imageFile: boolean;
        audioFile: boolean;
    }
}

// define the initial state of the upload soji state
const initialState: UploadSojiState = {
    sojiFileToUpload: {
        name: "",
        description: "",
        image: "",
        animation_url: "",
        tags: [],
    },
    validation: {
        name: false,
        description: false,
        image: false,
        animation_url: false,
        tags: false,
        imageFile: false,
        audioFile: false
    }
}


// create async redux thunk to set image from file using ToBase64
export const fileToBase64 = createAsyncThunk<{ key: "imageFile" | "audioFile", file: File, base64: string }, { key: "imageFile" | "audioFile", file: File }>(
    "uploadSoji/setFileFromBase64",
    async ({ key, file }: { key: "imageFile" | "audioFile", file: File }) => {
        const base64 = await ToBase64(file);
        return { key, file, base64 };
    }
);

// create async redux thunk to submit soji to contract
export const submitSoji = createAsyncThunk<{ sojiHash: string, soji: Soji }, UploadSojiState>(
    "uploadSoji/submitSoji",
    async (uploadSojiState: UploadSojiState) => {
        // check validation on sojiFileToUpload
        // this validation pattern needs to be redone...
        const { validation } = uploadSojiState;
        if (!validation.name || !validation.description || !validation.image || !validation.animation_url || !validation.tags || !validation.imageFile || !validation.audioFile) {
            throw new Error("Soji is not valid");
        }
        const { name, description, imageBase64, audioBase64, tags } = uploadSojiState.sojiFileToUpload;
        const ipfs = await IFPSSingleton.getInstance()
        const imageHash = await ipfs.add(imageBase64!);
        console.info("imageHash:", imageHash);
        const audioHash = await ipfs.add(audioBase64!);
        console.info("audioHash:", audioHash);

        const soji: Soji = {
            name,
            description,
            // image: "https://ipfs.io/ipfs/" + imageHash.cid.toString(),
            // animation_url: "https://ipfs.io/ipfs/" + audioHash.cid.toString(),
            image: "ipfs://" + imageHash.cid.toString(),
            animation_url: "ipfs://" + audioHash.cid.toString(),
            tags
        }
        const sojiHash = await ipfs.add(JSON.stringify(soji));

        console.info(sojiHash, soji)

        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner()

        console.info("signer", signer);

        // todo: Make this look nice!

        if (typeof window.ethereum !== 'undefined') {
            
            const contract = new ethers.Contract(sojiNFTAddress, sojiNFTJSON.abi, provider) as SojiNft
            const contractWithSigner = await contract.connect(signer)


            try {
                console.info("uploading soji to chain", uploadSojiState.sojiFileToUpload)

                const transaction = await contractWithSigner.mintSpecialSOJI(
                    uploadSojiState.sojiFileToUpload.name,
                    uploadSojiState.sojiFileToUpload.description,
                    uploadSojiState.sojiFileToUpload.image!,
                    uploadSojiState.sojiFileToUpload.animation_url!,
                    JSON.stringify(uploadSojiState.sojiFileToUpload.tags),
                )
                console.info("setGreeting transaction",  transaction)

            } catch (err) {
                console.warn("Error: ", err)
            }
        }

        return { sojiHash: sojiHash.cid.toString(), soji }
    }
);

// create special soji
export const createSoji = createAsyncThunk<void, UploadSojiState>(
    "uploadSoji/createSoji",
    async (uploadSojiState: UploadSojiState) => {
        // run contract
        // then confirm contract


    })



// create the upload soji slice
const uploadSojiSlice = createSlice({
    name: 'uploadSoji',
    initialState,
    reducers: {
        setSojiFileToUpload: (state, action: PayloadAction<SojiFileToUpload>) => {
            action.payload.name.length > 2 ? state.validation.name = true : state.validation.name = false;
            action.payload.description.length > 2 ? state.validation.description = true : state.validation.description = false;
            action.payload.image.length > 2 ? state.validation.image = true : state.validation.image = false;
            action.payload.tags.length > 0 ? state.validation.tags = true : state.validation.tags = false;
            state.sojiFileToUpload = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        // this throws a non-serializable error but is okay because the design of the slice is to not serialize file into the state 
        builder.addCase(fileToBase64.fulfilled, (state, action) => {
            console.info("FileToBase64.fulfilled", action.payload)
            
            if (action.payload.key === "imageFile") {
                state.sojiFileToUpload.imageFile = action.payload.file;
                state.sojiFileToUpload.imageBase64 = action.payload.base64;
                state.validation.image = true
                state.validation.imageFile = true
            }

            if (action.payload.key === "audioFile") {
                state.sojiFileToUpload.audioFile = action.payload.file;
                state.sojiFileToUpload.audioBase64 = action.payload.base64;
                state.validation.animation_url = true
                state.validation.audioFile = true
            }
            return state
        })

        // uploading the soji to IPFS and the contract
        // states:
        // pending -> log
        // fulfilled -> log maybe modal
        // error -> log maybe modal
        builder.addCase(submitSoji.pending, (state) => {
            console.info("submitSoji.pending")
            return state
        })
        builder.addCase(submitSoji.fulfilled, (state, action) => {
            console.info("submitSoji.fulfilled", action.payload)
            state.sojiFileToUpload.image = action.payload.soji.image
            state.sojiFileToUpload.animation_url = action.payload.soji.animation_url
            return state
        })
        builder.addCase(submitSoji.rejected, (state, action) => {
            console.info("submitSoji.rejected", action.error)
            return state
        })
    }
})

// export the upload soji slice 
export const { setSojiFileToUpload } = uploadSojiSlice.actions
// export the getter of the upload soji state
export const getSojiFileToUpload = (state: RootState) => state.uploadSojiReducer.sojiFileToUpload
// export the reducer of the upload soji state
export const uploadSojiReducer = uploadSojiSlice.reducer