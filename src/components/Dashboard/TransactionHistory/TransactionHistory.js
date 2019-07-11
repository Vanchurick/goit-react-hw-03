import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistore.module.css';

const TransactionHistory = ({ history }) => (
  <table className={styles.history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {history.map(elem => (
        <tr key={elem.id}>
          <td>{elem.type[0].toUpperCase() + elem.type.slice(1)}</td>
          <td>{Math.abs(elem.amount)}.00$</td>
          <td>{elem.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
