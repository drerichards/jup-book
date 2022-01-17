import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  Direction,
  MoveCellAction,
  DeleteCellAction,
  UpdateCellAction,
  InsertCellAfterAction,
  Action,
} from "../actions";
import { CellTypes } from "../cell";
import bundle from "../../bundler";

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
