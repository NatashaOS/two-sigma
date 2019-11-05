import { Intent, ProgressBar, Tag } from "@blueprintjs/core";
import { format } from "date-fns";
import * as React from "react";
import { ITransaction, TransactionStatus } from "../types";

interface IProps {
    transaction: ITransaction;
}

export class Transaction extends React.PureComponent<IProps> {
    public render() {
        const {
            receivedTime,
            ccNumber,
            ccNetwork,
            amount,
            status,
            progress,
        } = this.props.transaction;
        return (
            <tr>
                <td>{this.renderReceivedTimestamp(receivedTime)}</td>
                <td>{ccNetwork}</td>
                <td>{ccNumber}</td>
                <td style={{ textAlign: "right" }}>
                    {this.renderAmount(amount)}
                </td>
                <td>{this.renderStatus(status)}</td>
                <td>{this.maybeRenderProgress(status, progress)}</td>
            </tr>
        );
    }

    private renderReceivedTimestamp(receivedMs: number) {
        return format(new Date(receivedMs), "MM/dd/yyyy HH:mm:ss");
    }

    private renderStatus(status: TransactionStatus) {
        return <Tag intent={getTransactionStatusIntent(status)}>{status}</Tag>;
    }

    private renderAmount(amount: number) {
        return `$${amount.toFixed(2)}`;
    }

    private maybeRenderProgress(status: TransactionStatus, progress: number) {
        // Intentionally do not render progress if it reaches 100 to reduce noise on the UI
        // (Expectation is that status will be SUCCESS to indicate this)
        if (status === "IN_PROGRESS" && progress >= 0 && progress < 100) {
            return <ProgressBar value={progress / 100} />;
        }
        return null;
    }
}

function getTransactionStatusIntent(status: TransactionStatus): Intent {
    switch (status) {
        case "DECLINED":
            return "danger";
        case "PENDING":
            return "warning";
        case "SUCCESS":
            return "success";
        case "IN_PROGRESS":
        default:
            return "none";
    }
}
