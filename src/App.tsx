
import { Button, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
// import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ElevatedAppBar from './components/ElevatedAppBar';
import UploadSoji from './components/Soji/UploadSojiBox';
import { store } from './services/store';
import { SearchSounds } from './Views/SearchSojis';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


// this app entry is not the best just throwing things together to get a prototype...
// Router -> Moralis -> MUIThemes
// App
//   Main
//     App bar
//       logo
//       login
//       Search
//       Upload
//     Results



function App() {

  
    return <Provider store={store}>
        <BrowserRouter>
            {/* <MoralisProvider initializeOnMount={false}> */}
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container style={{
                    width: "100%",
                    height: "100%",
                }}>
                    <ElevatedAppBar />
                    <Routes>
                        <Route path="/" element={<></>}></Route>
                        <Route path="/uploadSound" element={<UploadSoji />} ></Route>
                    </Routes>
                    <SearchSounds />
                </Container>
            </ThemeProvider>
            {/* </MoralisProvider> */}
        </BrowserRouter>
    </Provider>
}

export default App;
