import uuid from "uuid";
import { ITransactionMap } from "./../types";

// MOCKED DATA

const t1Id = uuid();
const t2Id = uuid();
const t3Id = uuid();
const t4Id = uuid();

const LOADED_TRANSACTIONS: ITransactionMap = {
    t1Id: {
        transactionId: t1Id,
        receivedTime: 1572733611000,
        ccNetwork: "a",
        amount: 100,
        progress: 100,
        ccNumber: "1234567890123456",
        status: "SUCCESS",
    },
    t2Id: {
        transactionId: t2Id,
        receivedTime: 1572732118978,
        ccNetwork: "Z",
        amount: 500.58,
        progress: 50,
        ccNumber: "2234567890123456",
        status: "DECLINED",
    },
    t3Id: {
        transactionId: t3Id,
        receivedTime: new Date().getTime(),
        ccNetwork: "b",
        amount: 500.58,
        progress: 0,
        ccNumber: "3234567890123456",
        status: "PENDING",
    },
    t4Id: {
        transactionId: t4Id,
        receivedTime: 1572734118978,
        ccNetwork: "z",
        amount: 500.58,
        progress: 12,
        ccNumber: "4234567890123456",
        status: "IN_PROGRESS",
    },
};

export interface IAppState {
    transactions: ITransactionMap | null;
}

export const INTITIAL_STATE: IAppState = {
    transactions: LOADED_TRANSACTIONS,
};
