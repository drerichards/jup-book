import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

// simplied function for binding actions to dispatch when updating state
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

// template for calling dispatch with action:
// const (updateCell) = useActions()
// updateCell( args )
