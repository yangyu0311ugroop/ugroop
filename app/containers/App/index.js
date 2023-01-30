import MomentUtils from '@date-io/moment';
import { MuiThemeProvider } from '@material-ui/core/styles';
import API from 'apis';
import { URL_HELPERS, INTERCOM } from 'appConstants';
import AuthenticatedPage from 'containers/AuthenticatedPage';
import ConfirmPage from 'containers/Authentication/Confirm/wrapper';
import ForgetPasswordWrapper from 'containers/Authentication/ForgetPassword/wrapper';
import LoginPageWrapper from 'containers/Authentication/Login/wrapper';
import RegisterPageWrapper from 'containers/Authentication/Register/wrapper';
import ErrorDialog from 'containers/ErrorDialog';
import FirstTimeSetupWrapper from 'containers/FirstTimeSetup/wrapper';
import NotFoundPage from 'containers/NotFoundPage';
import DeclineInvitationWrapper from 'containers/Notification/DeclineInvitation';
import DeclineNotificationPage from 'containers/Notification/DeclineInvitation/wrapper';
import NotificationPage from 'containers/Notification/index';
import PrintPage from 'containers/PrintPage';
import PrivacyPolicy from 'containers/PrivacyPolicy';
import PublicPage from 'containers/PublicPage';
import TermsOfService from 'containers/TermsOfService';
import { loadStripe } from '@stripe/stripe-js';
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import AwsLib from 'lib/awsLib';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { sagas } from 'resaga';
import { Authenticated, FirstTime, NotAuthenticated } from 'routeProtectionV2';
import Me from 'smartComponents/Authentication/components/Me';
import CoolTheme from 'theme/coolTheme';
import UniversalSnackbar from 'ugcomponents/SnackBar';
import { ToastContainer } from 'ugcomponents/Toast';
import { UGLiveSupport } from 'ugcomponents/LiveSupport';
import Portal from 'containers/Portal';
import injectSaga from 'utils/injectSaga';

import GlobalStyle from '../../global-styles';
import StreamChat, { StreamChatContext } from '../../lib/streamChat';
import { MessengerProvider } from '../StreamChat/messengerProvider';
import StreamChatUserInitilize from '../StreamChat/streamChatUserInitilize';
import ChannelResourceManagement from '../StreamChat/channelResourceManagement';
import { MarketplaceProvider } from '../MarketPlace/context/marketplaceProvider';
import InitDataStore from '../../datastore/dataStore';
import { StripeContext } from '../../lib/stripe';
import { PlanProviderGlobal } from '../../smartComponents/Plan/context/planProviderGlobal';
import { GlobalProvider } from './globalContext';

AwsLib.Auth.configure({
  region: process.env.REGION,
  userPoolId: process.env.USER_POOL_ID,
  userPoolWebClientId: process.env.USER_POOL_WEB_CLIENTID,
  mandatorySignIn: false,
});

/**
 * Authentication Pages
 * redirect to /admin if user is authenticated
 */
const Login = NotAuthenticated(LoginPageWrapper);
const Registration = NotAuthenticated(RegisterPageWrapper);
const ForgetPassword = NotAuthenticated(ForgetPasswordWrapper);
const DeclineInvitationPage = NotAuthenticated(DeclineInvitationWrapper);

/**
 * First Time Setup Pages
 * redirect to /login if user is not authenticated
 * redirect to /admin if setup done
 * @type {FirstTimeSetupWrapper|*|any}
 */
const Setup = compose(
  Authenticated,
  FirstTime,
)(FirstTimeSetupWrapper);

const getStreamChatLib = () => new StreamChat().getStreamChatInstance();
const stripePromise = loadStripe('pk_test_C6mD7O3hqMFYB0HuMHWI23pS00ykd9ULW7');

export function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <UGLiveSupport appId={INTERCOM.APP_ID} />
        <MuiThemeProvider theme={CoolTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <StripeContext.Provider value={stripePromise}>
              <StreamChatContext.Provider value={getStreamChatLib()}>
                <MessengerProvider>
                  <MarketplaceProvider>
                    <PlanProviderGlobal>
                      <div>
                        <Helmet
                          titleTemplate="%s - uGroop"
                          defaultTitle="uGroop"
                          meta={[
                            {
                              name: 'description',
                              content: 'uGroop application',
                            },
                          ]}
                        />
                        <ErrorDialog />
                        <Switch>
                          <Route path="/login/:token?" component={Login} />
                          <Route
                            path="/registration/:token?"
                            component={Registration}
                          />
                          <Route path="/forgot" component={ForgetPassword} />
                          <Route path="/admin/setup" component={Setup} />
                          <Route path="/confirm" component={ConfirmPage} />

                          <Route
                            exact
                            path={URL_HELPERS.index()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.myTours()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.marketPlace()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            exact
                            path={URL_HELPERS.productDetail({
                              category: ':category',
                              id: ':id',
                            })}
                            component={AuthenticatedPage}
                          />
                          <Route
                            exact
                            path={URL_HELPERS.dashboard()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.orgIndex(':id')}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.tourStats(':id')}
                            component={AuthenticatedPage}
                          />
                          <Route
                            exact
                            path={URL_HELPERS.tours()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.tours(':id?')}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.sharedTours()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.checklists()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.settings()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.subscriptionSetup()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.subscriptionResubscribe()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.subscriptionUpgrade()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.subscriptionDowngrade()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.subscriptionDurationChangeDowngrade()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.subscriptionDurationChangeUpgrade()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path={URL_HELPERS.personalViewPaymentHistory()}
                            component={AuthenticatedPage}
                          />
                          <Route
                            path="/invitation/:token/decline"
                            component={DeclineInvitationPage}
                          />
                          <Route
                            path="/notification/:token/decline"
                            component={DeclineNotificationPage}
                          />
                          <Route
                            path="/notification/:token"
                            component={NotificationPage}
                          />
                          <Route path="/public" component={PublicPage} />
                          <Route path="/print" component={PrintPage} />
                          <Route path="/privacy" component={PrivacyPolicy} />
                          <Route
                            path="/terms-of-service"
                            component={TermsOfService}
                          />
                          <Route path="*" component={NotFoundPage} />
                        </Switch>
                        <API />
                        <UniversalSnackbar />
                        <ToastContainer />
                        <Me />
                        <GlobalStyle />
                        <Portal />
                        <StreamChatUserInitilize />
                        <ChannelResourceManagement />
                        <InitDataStore />
                      </div>
                    </PlanProviderGlobal>
                  </MarketplaceProvider>
                </MessengerProvider>
              </StreamChatContext.Provider>
            </StripeContext.Provider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

App.defaultProps = {};

// Only one resaga saga needs to be injected (injecting more creates duplicate watchers)
const withSaga = injectSaga({ key: 'App', saga: sagas[0] });

export default compose(withSaga)(App);
