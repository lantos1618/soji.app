

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { searchReducer } from '../components/Search/searchService';
import { uploadSojiReducer } from '../components/SojiUpload/uploadSojiService';



export const store = configureStore({
    reducer: {
        searchReducer,
        uploadSojiReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;