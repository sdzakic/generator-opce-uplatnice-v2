import { configureStore } from '@reduxjs/toolkit';
import nalogReducer from './nalogSlice';

export const store = configureStore({
    reducer: {
        nalog: nalogReducer
    }
});
