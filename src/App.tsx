import { HTMLTable, NonIdealState, Spinner } from "@blueprintjs/core";
import { sortBy } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { style } from "typestyle";
import { Transaction } from "./components/Transaction";
import { IAppState } from "./store/state";
import { AppTab, ITransaction } from "./types";

interface IStateProps {
    transactions?: ITransaction[];
}

type IProps = IStateProps;

interface IState {
    selectedTab: AppTab;
}

class UnconnectedApp extends React.Component<IProps, IState> {
    public state: IState = {
        selectedTab: AppTab.Incomplete,
    };

    public render() {
        return <div className={appContainerStyle}>{this.renderContent()}</div>;
    }

    private renderContent() {
        const { transactions } = this.props;
        if (transactions != null) {
            return this.renderLoaded(transactions);
        } else {
            return this.renderLoading();
        }
    }

    private renderLoading() {
        return (
            <div>
                <NonIdealState
                    icon={<Spinner />}
                    description="Loading transactions"
                />
            </div>
        );
    }

    private renderLoaded(transactions: ITransaction[]) {
        const transactionElements = transactions.map(t => (
            <Transaction key={t.transactionId} transaction={t} />
        ));
        return (
            <HTMLTable className={tableStyle} striped={true}>
                <thead>
                    <tr>
                        <th>Received</th>
                        <th>Credit Card Network</th>
                        <th>Credit Card Number</th>
                        <th>Amount (USD)</th>
                        <th>Status</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>{transactionElements}</tbody>
            </HTMLTable>
        );
    }
}

const appContainerStyle = style({
    height: "100%",
    paddingLeft: "20px",
    paddingRight: "20px",
});

const tableStyle = style({ width: "100%" });

// Order by received time, network, number in ASC order (older times before newer times, a before Z)
function sortTransactions(transactions: ITransaction[]) {
    return sortBy(transactions, ["receivedTime", "ccNetwork", "ccNumber"]);
}

function mapStateToProps({ transactions }: IAppState): IStateProps {
    if (transactions == null) {
        return {};
    } else {
        const sortedTransactions = sortTransactions(
            Object.values(transactions),
        );

        return {
            transactions: sortedTransactions,
        };
    }
}

export const App = connect(mapStateToProps)(UnconnectedApp);
