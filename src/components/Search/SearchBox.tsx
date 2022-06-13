import { Box, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { getSojis, setSearchTerm } from './searchService';


export function SearchBox() {
    // redux search dispatch
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
       dispatch(setSearchTerm(e.target.value)) 
    }

    useEffect(() => {
        dispatch(getSojis())
    }, [])

    return <Stack direction="row" spacing="2">
        <TextField
            label="search for sojis"
            variant="outlined"
            onChange={handleSearchChange}
            fullWidth />
        <Box style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "52px"
        }}>
            <Routes>
                <Route
                    path="/"
                    element={<AddCircleIcon
                        onClick={() => navigation("/uploadSound")}
                        style={{ transform: "rotate(0deg)" }}
                        color={"success"} />}
                />
                <Route
                    path="/uploadSound"
                    element={<AddCircleIcon
                        onClick={() => navigation("/")}
                        style={{ transform: "rotate(45deg)" }}
                        color={"error"} />}
                />
            </Routes>
        </Box>
    </Stack>;
}
