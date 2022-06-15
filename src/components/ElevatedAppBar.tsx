
import React from 'react';
import { AppBar, Box, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { SearchBox } from './Search/SearchBox';
import { Container } from '@mui/system';
import { ConnectButton } from 'web3uikit';


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
                                {/* <ConnectButton moralisAuth={true} /> */}
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