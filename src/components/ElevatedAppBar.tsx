
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { SearchBox } from './SojiSearch/SojiSearchBox';
import { Container } from '@mui/system';
// import {Moralis } from "moralis"
import Web3Modal from "web3modal";
import { ethers } from 'ethers';


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
        const providerOptions = {
            /* See Provider Options Section */
        };

        const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions // required
        });

        const instance = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();

        // const provider = window.ethereum;
        // const results = await provider.send({ method: 'eth_requestAccounts' });
        const accounts = await provider.send('eth_accounts', []);
        setWeb3Account(accounts[0]);

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

    const [appBarHeight, setAppBarHeight] = useState(120)
    const appBarRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(appBarRef.current ) {
            setAppBarHeight(appBarRef.current.offsetHeight + 20)
            // dumb remove me
            handleWallet();
        }   
    }, [appBarRef])

    return <>
        <ElevationScroll >
            <AppBar>
                <Toolbar style={{
                    display: "flex",
                    // justifyContent: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Container ref={appBarRef}>
                        <Stack width="100%" spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack alignItems={"flex-start"}>
                                    <Typography variant="h4" align={"center"} component="div">
                                        Soji
                                    </Typography>
                                    <Typography variant="h4" align={"center"} component="div">
                                        /səʊdʒi/
                                    </Typography>
                                    <Typography>
                                        noun: soji; plural noun: sojis;
                                    </Typography>
                                    <Typography>
                                        sound + emoji = Soji
                                    </Typography>
                                    <Typography>
                                        2020s: Soji is a Japanese word for "sound + emoji
                                    </Typography>
                                </Stack>
                                <Button onClick={handleWallet}>{web3Account !== '' ? web3Account : 'Connect Wallet'}</Button>
                            </Stack>
                            <SearchBox />
                        </Stack>
                    </Container>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Box style={{ height: appBarHeight  }} />
    </>
}