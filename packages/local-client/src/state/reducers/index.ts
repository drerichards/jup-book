import { combineReducers } from "redux";
import cellReducer from "./cellReducer";
import bundleReducer from "./bundleReducer";

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer,
});

export default reducers;

// type setup for store as reducers
export type RootState = ReturnType<typeof reducers>;
