import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, costs, income }) => (
  <section className={styles.balance}>
    <span>
      <i className={styles.arrowUp}>↑ </i>
      {income}
    </span>
    <span>
      <i className={styles.arrowDown}>↓ </i>
      {costs}
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  costs: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
};

export default Balance;
