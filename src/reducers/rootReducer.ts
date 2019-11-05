import { combineReducers } from "redux";
import { IAppState } from "../store/state";
import { transactionsReducer } from "./transactionsReducer";

export const rootReducer = combineReducers<IAppState>({
    transactions: transactionsReducer,
});
