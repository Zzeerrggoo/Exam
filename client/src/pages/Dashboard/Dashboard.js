import React from 'react';
import {ROLES} from '../../constants';
import {useSelector} from 'react-redux';
import CustomerDashboard
  from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard
  from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import {authUserSelector} from '../../selectors';

const Dashboard = props => {

  const user = useSelector(authUserSelector);
  const {history, match} = props;
  const {role} = user;

  return (
      <div>
        <Header/>
        {role === ROLES.CUSTOMER ? (
            <CustomerDashboard history={history}
                               match={match}/>
        ) : (
            <CreatorDashboard history={history}
                              match={match}/>
        )}
      </div>
  );
};

export default Dashboard;
