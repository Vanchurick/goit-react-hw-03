import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

const v4 = require('uuid/v4');

const toastStyle = {
  textAlign: 'center',
  fontSize: '24px',
};

export default class Dashboard extends Component {
  state = {
    history: [],
    balance: 0,
    costs: 0,
    income: 0,
  };

  componentDidMount() {
    const isHistoryExist = localStorage.getItem('history');
    const history = isHistoryExist ? JSON.parse(isHistoryExist) : [];
    this.setState(history);
  }

  componentDidUpdate() {
    const data = this.state;
    localStorage.setItem('history', JSON.stringify(data));
  }

  alertNigativNumber = () => {
    toast.warn('Введите целое положительное число!');
  };

  alertZeroNumber = () => {
    toast.info('Введите сумму для проведения операции!');
  };

  alertNoMoney = () => {
    toast.error('На счету недостаточно средств для проведения операции!');
  };

  handleOperation = e => {
    const inputValue = e.target.parentNode.firstChild.value;
    const transactionType = e.target.name;
    const transactionTime = new Date().toLocaleString('en-GB');
    const summ =
      e.target.name === 'withdraw'
        ? Number(inputValue) * -1
        : Number(inputValue);

    const transaction = {
      id: v4(),
      type: transactionType,
      amount: summ,
      date: transactionTime,
    };

    this.setState(prevState => {
      const money = Number(inputValue);
      if (money % 1 !== 0 || Math.sign(money) === -1)
        return this.alertNigativNumber();
      if (money === 0) return this.alertZeroNumber();
      if (prevState.balance < money && transactionType === 'withdraw')
        return this.alertNoMoney();

      prevState.history.unshift(transaction);

      const costs = transactionType === 'withdraw' ? money : 0;
      const income = transactionType === 'deposit' ? money : 0;

      return {
        balance: prevState.balance + transaction.amount,
        costs: prevState.costs + costs,
        income: prevState.income + income,
      };
    });

    e.target.parentNode.firstChild.value = '';
  };

  render() {
    const { history, balance, costs, income } = this.state;
    return (
      <div>
        <Controls onClick={this.handleOperation} />
        <Balance balance={balance} costs={costs} income={income} />
        <TransactionHistory history={history} />
        <ToastContainer
          position="bottom-center"
          closeButton={false}
          newestOnTop
          draggablePercent={100}
          autoClose={8000}
          style={toastStyle}
        />
      </div>
    );
  }
}
