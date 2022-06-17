
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { SearchBox } from './SojiSearch/SojiSearchBox';
import { Container } from '@mui/system';
// import {Moralis } from "moralis"


interface ElevationScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}
function ElevationScroll(props: ElevationScrollProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


export default function ElevatedAppBar() {
    async function handleWallet() {
        // const provider = await Moralis.enableWeb3()
        if (typeof window.ethereum === "undefined") {
            return
        }
        const provider = window.ethereum;
        // await provider.send("eth_requestAccounts", []);
        await provider.request({ method: 'eth_requestAccounts' })
        console.info("shit")
    }
    const [web3Account, setWeb3Account] = useState("");
    useEffect(() => {
        if (typeof window.ethereum === 'undefined') {
            return
        }

        window.ethereum.on("accountsChanged", (accounts: any) => {
            setWeb3Account(accounts[0]);
            console.log(accounts)
        })
    }, [])


    return <>
        <ElevationScroll >
            <AppBar>
                <Toolbar style={{
                    display: "flex",
                    // justifyContent: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Container>

                        <Stack width="100%" spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h4" align={"center"} component="div">
                                    Soji 🍶🔊
                                </Typography>
                                <Button onClick={handleWallet}>{web3Account !== '' ? web3Account : 'Connect Wallet'}</Button>
                            </Stack>
                            <SearchBox />
                        </Stack>
                    </Container>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Box style={{ height: "120px" }} />
    </>
}