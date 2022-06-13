import { Container, Stack } from "@mui/material";
import { SojiSearchResults } from "../components/Soji/SojiSearchResults";

export function SearchSounds() {
    return <Container style={{ paddingTop: "50px" }}>
        <Stack spacing={2} >
            <SojiSearchResults />
        </Stack>
    </Container >
}
