
import React from 'react';
import { AppBar, Box, Button, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
// import { ConnectButton } from 'web3uikit';
import { SearchBox } from './Search/SearchBox';

import { ethers } from 'ethers';
import GreeterJSON from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { Greeter } from '../types/contracts/Greeter'

import Web3Modal from "web3modal";


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


    const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'




    async function fetchGreeting() {

        await window.ethereum.request({ method: "eth_requestAccounts" });

      
    }


    return <>
        <ElevationScroll >
            <AppBar>
                <Toolbar style={{
                    display: "flex",
                    // justifyContent: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Stack width="100%" spacing={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4" align={"center"} component="div">
                                Soji 🍶🔊
                            </Typography>
                            {/* <ConnectButton moralisAuth={true} /> */}
                            <Button onClick={fetchGreeting}> Connect </Button>
                        </Stack>
                        <SearchBox />
                    </Stack>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Box style={{ height: "120px" }} />
    </>
}