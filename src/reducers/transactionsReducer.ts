import { Reducer } from "redux";
import { TransactionAction } from "../actions";
import { ITransactionMap } from "../types";

export const transactionsReducer: Reducer<
    ITransactionMap | null,
    TransactionAction
> = (state: ITransactionMap | null = null, action: TransactionAction) => {
    switch (action.type) {
        case "UPDATE_TRANSACTIONS": {
            const updatedTransactionMap = convertArrayToMap(
                action.transactions,
                t => t.transactionId,
            );

            // If this is the first update i.e. we don't have any persisted transactions, store the
            // received transactions as the initial state, otherwise merge it into existing state
            return state == null
                ? updatedTransactionMap
                : { ...state, ...updatedTransactionMap };
        }
        default:
            return state;
    }
};

// Util function to convert an array to a map
function convertArrayToMap<T>(
    arr: T[],
    getKey: (t: T) => string,
): { [id: string]: T } {
    return arr.reduce((tempMap: { [id: string]: T }, item) => {
        tempMap[getKey(item)] = item;
        return tempMap;
    }, {});
}
