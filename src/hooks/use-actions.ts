import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

// simplified function for binding actions to dispatch when updating state
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

// when dispatch dependency changes, react reruns the bindActionCreators func
// useMemo ensures that createBundle from useActions runs only once

// template for calling dispatch with action:
// const (updateCell) = useActions()
// updateCell( args )
