import { Action } from "../actions";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[]; // ids in order
  data: {
    [key: string]: Cell; // key is the cell's own ID. value is the cell itself
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
  return state;
};

export default reducer;
