import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import paginationReducer from "./paginationSlice";
import categoryReducer from "./categorySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// Persist configuration for the reducers you want to persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ['products', 'cart'], // Only persist these reducers
};

// Combine all reducers
const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    pagination: paginationReducer,
    categories: categoryReducer,
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);

