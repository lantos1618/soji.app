import { Box, Button, Container, Grid, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// import { useMoralis, useWeb3Contract } from "react-moralis"
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { setFileData, setSojiFileToUpload, submitSoji } from "./uploadSojiService";

function MediaPreview({ name, image, audio }: {
    name: string, image: string | File | undefined, audio: string | File | undefined
}) {

    return <Grid item xs={5}>
        <Stack
            spacing={1}
            padding={1}
            direction="column"
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
        >
            {image ?
                <img alt={name} style={{ width: "100px", height: "100px" }} src={image instanceof File ? URL.createObjectURL(image) : image} /> :
                <Box style={{ width: "100px", height: "100px", justifyContent: "center", alignItems: "center", display: "flex" }}><QuestionMarkIcon /></Box>}

            {audio ?
                <audio controls={true} src={audio instanceof File ? URL.createObjectURL(audio) : audio} /> :
                <audio controls={true} />}
        </Stack>
    </Grid>;
}

function TextFrom() {
    const { sojiFileToUpload, validation } = useAppSelector((state) => state.uploadSojiReducer);
    const dispatch = useAppDispatch();
    // handel text field change
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "tags") {
            dispatch(setSojiFileToUpload({ ...sojiFileToUpload,
                 tags: e.target.value.split(/\s|\,/).filter(str => str.trim()) }));
            return
        }
        dispatch(setSojiFileToUpload({ ...sojiFileToUpload, [e.target.name]: e.target.value }));
    }
    return <Grid item xs={6}>
        <Stack spacing={1}>
            <TextField error={!validation.name} label="name" name="name" onChange={handleChange} />
            <TextField error={!validation.description} label="description" name="description" onChange={handleChange} />
            <TextField error={!validation.tags} label="tags" name="tags" onChange={handleChange} />
        </Stack>
    </Grid>;
}


function SojiDropZone() {
    const { validation } = useAppSelector((state) => state.uploadSojiReducer);
    const dispatch = useAppDispatch();

    // handle the drop event of the drop zone
    function onDrop<T extends File>(acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent) {
        acceptedFiles.forEach(file => {
            if (file.type.includes("image")) {
                dispatch(setFileData({ key: "imageFile", file }));
            }
            if (file.type.includes("audio")) {
                dispatch(setFileData({ key: "audioFile", file }));
            }
        })
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    })

    return <Container {...getRootProps()}
        style={{
            border: isDragActive ? '1px solid green' : '1px solid grey',
            width: "100%",
            height: "120px",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <input {...getInputProps()} />
        <Stack>
            {isDragActive ?
                <Typography>Drop the files here ...</Typography> :
                <Typography>Drag 'n' drop an image and audio file here</Typography>}
            <Stack direction="row" spacing={1} justifyContent="space-between">
                <Stack direction="row">{validation.imageFile ? <CheckIcon color={"success"} /> : <CloseIcon color={"error"} />}<Typography> Image</Typography></Stack>
                <Stack direction="row">{validation.audioFile ? <CheckIcon color={"success"} /> : <CloseIcon color={"error"} />}<Typography> Audio </Typography></Stack>
            </Stack>
        </Stack>
    </Container>;
}

export default function UploadSoji() {

    // TODO: fix this from re-rendering the image and audio every time the user changes the text fields
    const { sojiFileToUpload, validation} = useAppSelector((state) => state.uploadSojiReducer);
    const dispatch = useAppDispatch();

    // const { isWeb3Enabled } = useMoralis();
    const isWeb3Enabled = true;

    function submitHandle() {
        dispatch(submitSoji({sojiFileToUpload,  validation}));
    }

    function submitRandomHandle() {
    }


    return isWeb3Enabled ? <Container>
        <Stack spacing={1}>
            <Grid container spacing={1}>
                <TextFrom />
                <MediaPreview name={sojiFileToUpload.name} image={sojiFileToUpload.imageBase64} audio={sojiFileToUpload.audioBase64} />
            </Grid>
            <SojiDropZone />
            <Button variant="outlined" onClick={submitHandle}>Submit</Button>
            <Tooltip title="mint a soji with rare traits">
                <Button variant="outlined"  onClick={submitRandomHandle}>I'm Feeling Lucky</Button>
            </Tooltip>
        </Stack>
    </Container> :
        <Typography>Please connect web3 wallet</Typography>
}
