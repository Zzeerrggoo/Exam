import React from 'react';
import {
  pay as payAction,
  clearPaymentStore,
} from '../../actions/paymentActionCreators';
import PayForm from '../../components/forms/PayForm/PayForm';
import styles from './Payment.module.sass';
import isEmpty from 'lodash/isEmpty';
import CONSTANTS from '../../constants';
import Error from '../../components/Error/Error';
import {useDispatch, useSelector} from 'react-redux';
import {contestsSelector, paymentSelector} from '../../selectors';

const Payment = (props) => {

  const dispatch = useDispatch();
  const contestsStore = useSelector(contestsSelector);
  const payment = useSelector(paymentSelector);

  const {creatingContests} = contestsStore;
  const {error} = payment;

  const pay = (values) => {

    const {number, expiry, cvc} = values;
    const data = new FormData();
    const contestArray = creatingContests.map(
        item => ({contestType: item.type, ...item.info}));

    for (let i = 0; i < contestArray.length; i++) {
      data.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }

    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');
    dispatch(payAction({
      formData: data,
    }));
  };

  const goBack = () => {
    props.history.goBack();
  };

  if (isEmpty(creatingContests)) {
    props.history.replace('startContest');
  }
  return (
      <div>
        <div className={styles.header}>
          <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
              alt="blue-logo"
          />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.paymentContainer}>
            <span className={styles.headerLabel}>Checkout</span>
            {error && (
                <Error
                    data={error.data}
                    status={error.status}
                    clearError={clearPaymentStore}
                />
            )}
            <PayForm sendRequest={pay}
                     back={goBack}
                     isPayForOrder={true}/>
          </div>
          <div className={styles.orderInfoContainer}>
            <span className={styles.orderHeader}>Order Summary</span>
            <div className={styles.packageInfoContainer}>
              <span className={styles.packageName}>Package Name: Standard</span>
              <span className={styles.packagePrice}>$100 USD</span>
            </div>
            <div className={styles.resultPriceContainer}>
              <span>Total:</span>
              <span>$100.00 USD</span>
            </div>
            <a href="http://www.google.com">Have a promo code?</a>
          </div>
        </div>
      </div>
  );
};

export default Payment;
