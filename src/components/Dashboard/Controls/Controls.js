import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({ onClick }) => (
  <section className={styles.controls}>
    <input type="number" className={styles.input} min="1" />
    <button
      type="button"
      name="deposit"
      onClick={onClick}
      className={styles.button}
    >
      Deposit
    </button>
    <button
      type="button"
      name="withdraw"
      onClick={onClick}
      className={styles.button}
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Controls;
