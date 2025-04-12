import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import {sagaMiddleware} from "./middleware";
import rootSaga from "./counterSagas";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;