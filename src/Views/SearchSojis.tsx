import { Container, Stack } from "@mui/material";
import { SojiSearchResults } from "../components/SojiSearch/SojiSearchResults";

export function SearchSounds() {
    return <Container style={{ paddingTop: "50px" }}>
        <Stack spacing={2} >
            <SojiSearchResults />
        </Stack>
    </Container >
}
