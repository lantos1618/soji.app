

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { searchReducer } from '../components/SojiSearch/sojisearchService';
import { uploadSojiReducer } from '../components/SojiUpload/uploadSojiService';
import { ethereumReducer } from './ethereumService';


export const store = configureStore({
    reducer: {
        ethereumReducer,
        searchReducer,
        uploadSojiReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;