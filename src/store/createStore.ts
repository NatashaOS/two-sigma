import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";
import { INTITIAL_STATE } from "./state";

export function configureStore() {
    return createStore(rootReducer, INTITIAL_STATE, applyMiddleware(thunk));
}
