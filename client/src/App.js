import React, {useLayoutEffect, lazy, Suspense} from 'react';
import {useDispatch} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ModerationPage from './pages/ModerationPage';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS, {REFRESH_TOKEN_KEY} from './constants';
import browserHistory from './browserHistory';
import ChatContainer
  from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner/Spinner';
import {refreshAuthRequest} from './actions/authActionCreators';
import PasswordRestore from './pages/PasswordRestore';
import PasswordVerification from './pages/PasswordVerification';
import GeneralCounter from './components/GeneralCounter';
import EventsPage from './pages/EventsPage';
import HowItWorks from './pages/HowItWorks';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
      dispatch(
          refreshAuthRequest({
            refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
          }),
      );
    }
  }, []);

  return (
      <GeneralCounter>
        <Router history={browserHistory}>
          <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
          />
          <Suspense fallback={<Spinner/>}>
            <Switch>
              <PrivateRoute exact
                            path="/"
                            component={Home}
                            roles={{exclude: ['moderator']}}/>

              <Route exact
                     path="/login"
                     component={LoginPage}/>
              <Route exact
                     path="/signup"
                     component={RegistrationPage}/>
              <Route exact
                     path='/restore'
                     component={PasswordRestore}/>
              <Route exact
                     path='/restoreVerification'
                     component={PasswordVerification}/>
              <Route exact
                     path='/howitworks'
                     component={HowItWorks}/>

              <PrivateRoute
                  roles={['customer']}
                  exact
                  path="/events"
                  component={EventsPage}/>
              <PrivateRoute
                  roles={['customer']}
                  exact
                  path="/payment"
                  component={Payment}
              />
              <PrivateRoute
                  roles={['customer']}
                  exact
                  path="/startContest"
                  component={StartContestPage}
              />
              <PrivateRoute
                  roles={['customer']}
                  exact
                  path="/startContest/nameContest"
              >
                <ContestCreationPage
                    contestType={CONSTANTS.NAME_CONTEST}
                    title="Company Name"
                />
              </PrivateRoute>
              <PrivateRoute
                  roles={['customer']}
                  exact
                  path="/startContest/taglineContest"
              >
                <ContestCreationPage
                    contestType={CONSTANTS.TAGLINE_CONTEST}
                    title="TAGLINE"
                />
              </PrivateRoute>
              <PrivateRoute
                  roles={['customer']}
                  exact
                  path="/startContest/logoContest"
              >
                <ContestCreationPage
                    contestType={CONSTANTS.LOGO_CONTEST}
                    title="LOGO"
                />
              </PrivateRoute>
              <PrivateRoute exact
                            path="/dashboard"
                            component={Dashboard}
                            roles={{exclude: ['moderator']}}/>
              <PrivateRoute exact
                            path="/contest/:id"
                            component={ContestPage}
                            roles={{exclude: ['moderator']}}/>
              <PrivateRoute exact
                            path="/account"
                            component={UserProfile}
                            roles={{exclude: ['moderator']}}/>
              <PrivateRoute
                  roles={['moderator']}
                  exact
                  path="/moderation"
                  component={ModerationPage}
              />
              <Route component={NotFound}/>
            </Switch>
          </Suspense>
          <ChatContainer/>
        </Router>
      </GeneralCounter>
  );
}

export default App;
