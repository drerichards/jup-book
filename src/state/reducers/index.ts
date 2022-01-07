import { combineReducers } from "redux";
import cellReducer from "./cellReducer";

const reducers = combineReducers({
  cells: cellReducer,
});

export default reducers;

// type setup for store as reducers
export type RootState = ReturnType<typeof reducers>;
