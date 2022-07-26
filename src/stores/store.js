import { configureStore } from '@reduxjs/toolkit';
import { rawgAPI } from '../services/rawgApi';

export default configureStore({
    reducer: {
        [rawgAPI.reducerPath]: rawgAPI.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(rawgAPI.middleware);
    }
});