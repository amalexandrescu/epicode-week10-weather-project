import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers";
// configureStore will set up the Redux Store for us!

const store = configureStore({
  reducer: mainReducer,
});

export default store;

// now the store is ready! let's INJECT IT into our REACT APP!
// we do it in the src/index.js file
