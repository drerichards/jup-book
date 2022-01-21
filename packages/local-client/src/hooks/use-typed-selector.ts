import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// to access any state inside the component
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
