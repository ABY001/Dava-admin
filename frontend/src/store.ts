import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import authReducer from "./store/authSlice";
import productReducer from "./store/productSlice";
import userReducer from "./store/userSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    darkMode: darkModeReducer,
    auth: authReducer,
    products: productReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;