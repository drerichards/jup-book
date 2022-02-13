import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { saveCells } from "../action-creators";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action); // forwards along to other middlewares and reducers

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          // call the func then immed dispatch it with root state.
          // must be done because it is an action creator that uses thunk
          saveCells()(dispatch, getState);
        }, 500);
      }
    };
  };
};
