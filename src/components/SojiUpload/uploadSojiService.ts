// I should move this to another file maybe use some sort of state management 

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFPSSingleton } from "../../services/IFPSSingleton";
import { RootState } from "../../services/store";
import { toBase64, toBuffer } from "../../services/utils";

import sojiNftAddress from "../../contracts/SojiNFTAddress.json";
import sojiNFTJSON from "../../artifacts/contracts/SojiNFT.sol/SojiNft.json";
import { SojiNft } from "../../types";
import {ethers} from "ethers";
// import { Moralis } from "moralis"
import { Soji } from "../Soji/soji";

// TODO: find a better home for this


export interface SojiFileToUpload extends Soji {
    // the image file
    imageFile?: File;
    // the image base64 to be used in previews
    imageBase64?: string;
    // the image buffer
    imageBuffer?: ArrayBuffer;

    // audioFile => animation_url
    audioFile?: File;
    // the audio buffer
    audioBuffer?: ArrayBuffer;
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
export const setFileData = createAsyncThunk<{ key: "imageFile" | "audioFile", file: File, base64: string, buffer: ArrayBuffer }, { key: "imageFile" | "audioFile", file: File }>(

    "uploadSoji/setFileData",
    async ({ key, file }: { key: "imageFile" | "audioFile", file: File }) => {
        const base64 = await toBase64(file);
        const buffer = await toBuffer(file);
        return { key, file, base64, buffer };
    }
);


async function addSojiToIPFS(uploadSojiState: UploadSojiState) {
    const { validation } = uploadSojiState;
    if (!validation.name || !validation.description || !validation.image || !validation.animation_url || !validation.tags || !validation.imageFile || !validation.audioFile) {
        throw new Error("Soji is not valid");
    }
    const { name, description, imageBuffer, audioBuffer, tags } = uploadSojiState.sojiFileToUpload;

    if (!imageBuffer) {
        throw "Image file is not set";
    }
    if (!audioBuffer) {
        throw "Audio file is not set";
    }


    // TODO: find a pinning service for ipfs
    // TODO: handle errors
    const ipfs = await IFPSSingleton.getInstance();

    const imageHash = await ipfs.add(imageBuffer);
    console.info("image pinned at", await ipfs.pin.add(imageHash.cid))

    console.info("imageHash:", imageHash);
    const audioHash = await ipfs.add(audioBuffer!);

    console.info("audioHash:", audioHash);
    console.info("audio pinned at", await ipfs.pin.add(audioHash.cid))

    const soji: Soji = {
        name,
        description,
        image: "ipfs://" + imageHash.cid.toString(),
        animation_url: "ipfs://" + audioHash.cid.toString(),
        tags
    };
    const sojiHash = await ipfs.add(JSON.stringify(soji));
    console.info(await ipfs.pin.add(sojiHash.cid))
    console.info("soji pinned at", await ipfs.pin.add(audioHash.cid))

    console.info("soji submitted to ipfs", sojiHash, soji);
    const sojiHashString = sojiHash.cid.toString();
    return { sojiHashString, soji };
}


// create async redux thunk to submit soji to contract
export const submitSoji = createAsyncThunk<{ sojiHashString: string, soji: Soji }, UploadSojiState>(
    "uploadSoji/submitSoji",
    async (uploadSojiState: UploadSojiState) => {
        // check validation on sojiFileToUpload
        // this validation pattern needs to be redone...
        const { sojiHashString, soji } = await addSojiToIPFS(uploadSojiState)
        // const ethers = Moralis.web3Library;
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const provider = await Moralis.enableWeb3();
        const signer = provider.getSigner()

        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(sojiNftAddress.address, sojiNFTJSON.abi, provider) as any as SojiNft
            const contractWithSigner = await contract.connect(signer)
            console.info("contractWithSigner:", contractWithSigner)

            try {
                console.info("uploading soji to chain", soji)
                const transaction = await contractWithSigner.mintSoji(
                    "ipfs://" + sojiHashString
                )
                // TODO: make this a special soji
                // const transaction = await contractWithSigner.mintSpecialSOJI(
                //     soji.name,
                //     soji.description,
                //     soji.image!,
                //     soji.animation_url!,
                //     JSON.stringify(soji.tags),
                // )
                await transaction.wait()
                console.info("setGreeting transaction", await transaction)

            } catch (err) {
                console.warn("Error: ", err)
            }
        }
        return { sojiHashString, soji }
    }
);

// create special soji
export const createSoji = createAsyncThunk<void, UploadSojiState>(
    "uploadSoji/createSoji",
    async () => {
        // run contract
        // then confirm contract
    }
)

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
        },
    },
    extraReducers: (builder) => {
        // this throws a non-serializable error but is okay because the design of the slice is to not serialize file into the state 
        builder.addCase(setFileData.fulfilled, (state, action) => {
            console.info("setFileData.fulfilled", action.payload)
            // TODO: make this look nice
            if (action.payload.key === "imageFile") {
                state.sojiFileToUpload.imageFile = action.payload.file;
                state.sojiFileToUpload.imageBase64 = action.payload.base64;
                state.sojiFileToUpload.imageBuffer = action.payload.buffer;
                state.validation.image = true
                state.validation.imageFile = true
            }

            if (action.payload.key === "audioFile") {
                state.sojiFileToUpload.audioFile = action.payload.file;
                state.sojiFileToUpload.audioBase64 = action.payload.base64;
                state.sojiFileToUpload.audioBuffer = action.payload.buffer;
                state.validation.animation_url = true
                state.validation.audioFile = true
            }
        })

        // uploading the soji to IPFS and the contract
        // states:
        // pending -> log
        // fulfilled -> log maybe modal
        // error -> log maybe modal
        builder.addCase(submitSoji.pending, (state) => {
            console.info("submitSoji.pending")
        })
        builder.addCase(submitSoji.fulfilled, (state, action) => {
            console.info("submitSoji.fulfilled", action.payload)
            state.sojiFileToUpload.image = action.payload.soji.image
            state.sojiFileToUpload.animation_url = action.payload.soji.animation_url
        })
        builder.addCase(submitSoji.rejected, (state, action) => {
            console.info("submitSoji.rejected", action.error)
        })
    }
})

// export the upload soji slice 
export const { setSojiFileToUpload } = uploadSojiSlice.actions
// export the getter of the upload soji state
export const getSojiFileToUpload = (state: RootState) => state.uploadSojiReducer.sojiFileToUpload
// export the reducer of the upload soji state
export const uploadSojiReducer = uploadSojiSlice.reducer

