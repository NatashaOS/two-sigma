This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this project after cloning the repo locally

Note: Install Node (`$ brew install node`) and Yarn (`$ brew install yarn`) first if not already installed.

```
$ cd two-sigma
$ yarn
$ yarn start
```

This will open the app in development mode [http://localhost:3000](http://localhost:3000) in the browser.

### Features I didn't get a chance to do

1. Removed all the "mocked" data and register as a listener to the transaction status monitor on `componentDidMount()` and unregister on `componentDidUnmount()`. This would be done using a redux `thunk` function that provides the required callback to the monitor's `registerStatusUpdateListener()`. The callback would essentially dispatch an action that would update the redux store by "merging" the results. Since the redux store stores all transactions in map, this would allow applying these patch updates easily.
2. Split the UI into two tabs: `Incomplete` (all transactions whose status was pending or in-progress) and `Complete` (all transactions whose status is success or declined)
3. Fix the sorting of transactions. I used lodash's `sortBy` but looks like it didn't respect lexicographic ordering so would need to debug that.
