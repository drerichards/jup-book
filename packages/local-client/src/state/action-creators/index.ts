import { Dispatch } from "redux";
import axios from "axios";
import { ActionType } from "../action-types";
import {
  Direction,
  MoveCellAction,
  DeleteCellAction,
  UpdateCellAction,
  InsertCellAfterAction,
  Action,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import bundle from "../../bundler";
import { RootState } from "../reducers";

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle = (id: string, inputCode: string) => {
  // ensures that any action we dispatch is of type Action
  return async (dispatchEvent: Dispatch<Action>) => {
    dispatchEvent({
      type: ActionType.BUNDLE_START,
      payload: {
        id,
      },
    });

    const result = await bundle(inputCode);

    dispatchEvent({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: {
          code: result.code,
          err: result.error,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatchEvent: Dispatch<Action>) => {
    dispatchEvent({ type: ActionType.FETCH_CELLS });
    try {
      const { data }: { data: Cell[] } = await axios.get<Cell[]>("/cells");
      dispatchEvent({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (error: any) {
      dispatchEvent({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: error.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatchEvent: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (error: any) {
      dispatchEvent({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
