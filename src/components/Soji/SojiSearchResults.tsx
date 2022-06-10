import { Box, Grid } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../services/hooks';
import { SojiItem } from './SojiItem';



export function SojiSearchResults() {
    const search = useAppSelector((state) => state.searchReducer)

    return <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} justifyContent={"space-between"}>
            {search.sojisResults.map(soji => <SojiItem {...soji} key={soji.src} spam={true}></SojiItem>)}
        </Grid>
    </Box>

}