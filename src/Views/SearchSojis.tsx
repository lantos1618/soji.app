import { Container, Stack } from "@mui/material";
import { SojiSearchResults } from "../components/Soji/SojiSearchResults";
// import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react";

export function SearchSounds() {
    // @ts-ignore params not passed execution only


    return <Container style={{ paddingTop: "50px" }}>
        <Stack spacing={2} >
            <SojiSearchResults />
        </Stack>
    </Container >
}
