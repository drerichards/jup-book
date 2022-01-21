import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[]; // ids in order of how they should be displayed
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

const randomIDGen = (): string => Math.random().toString(36).substring(2, 7);

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const moveIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        const targetIndex = direction === "up" ? moveIndex - 1 : moveIndex + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1)
          return state;
        state.order[moveIndex] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        // filter out order ids that = payload id and return new array
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.INSERT_CELL_AFTER:
        const { type } = action.payload;
        const cell: Cell = {
          id: randomIDGen(),
          type,
          content: "",
        };

        state.data[cell.id] = cell;
        // return index of elem that matches created ID
        const insertIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (insertIndex === -1) {
          state.order.unshift(cell.id); // pushes cell to start of order arr if no id match
        } else {
          state.order.splice(insertIndex + 1, 0, cell.id); // adds new cell after given id
        }
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
