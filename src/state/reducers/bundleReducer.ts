import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [key: string]: {
    // id of cell
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundleState = {
  //   loading: false,
  //   code: "",
  //   error: "",
};

const reducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.id] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;

      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.id] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;

      default:
        return state;
    }
  }
);

export default reducer;
