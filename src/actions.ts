import { ITransaction } from "./types";

interface IUpdateTransactionAction {
    type: "UPDATE_TRANSACTIONS";
    transactions: ITransaction[];
}

export type TransactionAction = IUpdateTransactionAction;

export function updateTransactions(
    transactions: ITransaction[],
): TransactionAction {
    return {
        type: "UPDATE_TRANSACTIONS",
        transactions,
    };
}
