import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IAppState } from "./store/state";

export type Dispatch = ThunkDispatch<IAppState, {}, any>;
export type AsyncAction<R> = ThunkAction<Promise<R>, IAppState, {}, any>;

export enum AppTab {
    Incomplete,
    Complete,
}

export interface ITransactionMap {
    [transactionId: string]: ITransaction;
}

export type TransactionStatus =
    | "PENDING"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "DECLINED";

export interface ITransaction {
    transactionId: string;
    receivedTime: number; // ms since unix epoch
    ccNetwork: string; // ex: visa, mastercard
    ccNumber: string; // credit card number
    amount: number; // the amount of money ($ USD) transferred from the card in the transaction
    status: TransactionStatus;
    progress: number; // a number from 0 to 100
}
