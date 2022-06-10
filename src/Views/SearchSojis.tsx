import { Container, Stack } from "@mui/material";
import { SojiSearchResults } from "../components/Soji/SojiSearchResults";
// import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react";

export function SearchSounds() {


    return <Container style={{ paddingTop: "50px" }}>
        <Stack spacing={2} >
            <SojiSearchResults />
        </Stack>
    </Container >
}
