import produce from "immer";
import { ActionType } from "../action-types";
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

const randomIDGen = (): string => Math.random().toString(36).substring(2, 5);

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState | void => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const moveIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        const targetIndex = direction === "up" ? moveIndex - 1 : moveIndex + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
        state.order[moveIndex] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        // filter out order ids that = payload id and return new array
        state.order = state.order.filter((id) => id !== action.payload);
        return;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return;

      case ActionType.INSERT_CELL_BEFORE:
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
          state.order.push(cell.id); // pushes cell to end of order arr if no id match
        } else {
          state.order.splice(insertIndex, 0, cell.id); // adds new cell before given id
        }
        return;

      default:
        return state;
    }
  }
);

export default reducer;
