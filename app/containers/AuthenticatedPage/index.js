import { Ability } from 'apis';
import {
  ABILITY_DATA_STORE,
  MARKET_PLACE_STORE,
  URL_HELPERS,
} from 'appConstants';
import Dashboard from 'containers/Dashboard';
import DashboardIndex from 'containers/Dashboard/components/DashboardIndex';
import FireBase from 'containers/FireBase';
import ChatDraw from 'containers/Notification/ChatDraw';
import Organisations from 'containers/Organisations';
import Personal from 'containers/Personal';
import TemplateStats from 'containers/TemplateStats';
import Person from 'containers/Profile/components/Person/container';
import SeeDetail from 'containers/Templates/Modals/ShareList/components/SeeDetail';
import TemplateManagement from 'containers/Templates/TemplateManagement';
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { Authenticated, SetupDone } from 'routeProtectionV2';
import ChecklistDialogs from 'smartComponents/Node/components/Checklists/components/ChecklistDialogs';
import AuthenticatedLayout from 'ugcomponents/Layout/AuthenticatedLayout';
import { LoadingText } from 'ugcomponents/Progress';
import ErrorBoundary from 'viewComponents/ErrorBoundary';
import Notification from '../../apis/components/Notification';
import { useMessengerContext } from '../StreamChat/messageStateContext';
import { useInjectReducer } from '../../utils/injectReducer';
import marketplaceReducer from '../MarketPlace/dataStore/reducer';
import { GET_TEMPLATE_FEATURED_LIST, TEMPLATE_API } from '../../apis/constants';

export function AuthenticatedPage(props) {
  const [state, setState] = useImmer({
    loading: true,
    chatUserLoaded: true,
    abilityLoaded: false,
  });
  const [messageState] = useMessengerContext();
  useInjectReducer({ key: MARKET_PLACE_STORE, reducer: marketplaceReducer });

  useEffect(() => {
    props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_FEATURED_LIST, {});
  }, []);
  useEffect(() => {
    const env = process.env.ENV;
    if (env === 'production') {
      // if (messageState.hasStreamUser && state.abilityLoaded) {
      if (state.abilityLoaded) {
        setState(draft => {
          // eslint-disable-next-line no-param-reassign
          draft.loading = false;
        });
      }
    } else if (props.fetched) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.loading = false;
      });
    } else if (messageState.hasStreamUser && state.abilityLoaded) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.loading = false;
      });
    }
  }, [messageState.hasStreamUser, state.abilityLoaded, props.fetched]);

  const fetchSuccess = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.abilityLoaded = true;
    });
  };

  const renderLoading = () => <LoadingText splash />;

  const renderAuthenticated = () => (
    <AuthenticatedLayout match={props.match} location={props.location}>
      <ErrorBoundary>
        <Switch>
          <Route exact path={URL_HELPERS.index()} component={Dashboard} />
          <Route path={URL_HELPERS.myTours()} component={Dashboard} />
          <Route exact path={URL_HELPERS.orgNew()} component={Dashboard} />
          <Route exact path={URL_HELPERS.marketPlace()} component={Dashboard} />
          <Route
            exact
            path={URL_HELPERS.productDetail({
              category: ':category',
              id: ':id',
            })}
            component={Dashboard}
          />
          <Route
            exact
            path={URL_HELPERS.dashboard()}
            component={DashboardIndex}
          />
          <Route
            exact
            path={URL_HELPERS.tourStats(':id')}
            component={TemplateStats}
          />
          <Route
            path={URL_HELPERS.tours(':id')}
            component={TemplateManagement}
          />
          <Route path={URL_HELPERS.orgIndex(':id')} component={Organisations} />
          <Route exact path={URL_HELPERS.tours()} component={Personal} />
          <Route path={URL_HELPERS.sharedTours()} component={Personal} />
          <Route path={URL_HELPERS.checklists()} component={Personal} />
          <Route path={URL_HELPERS.settings()} component={Person} />
          <Route path={URL_HELPERS.subscriptionSetup()} component={Person} />
          <Route path={URL_HELPERS.subscriptionUpgrade()} component={Person} />
          <Route
            path={URL_HELPERS.subscriptionResubscribe()}
            component={Person}
          />
          <Route
            path={URL_HELPERS.subscriptionDurationChangeUpgrade()}
            component={Person}
          />
          <Route
            path={URL_HELPERS.subscriptionDurationChangeDowngrade()}
            component={Person}
          />
          <Route
            path={URL_HELPERS.subscriptionDowngrade()}
            component={Person}
          />
          <Route
            path={URL_HELPERS.personalViewPaymentHistory()}
            component={Person}
          />
          <Route path="*">
            <Redirect to="/notfound" />
          </Route>
        </Switch>
      </ErrorBoundary>
      <ChatDraw />
      <SeeDetail />
      <ChecklistDialogs />
      <FireBase />
    </AuthenticatedLayout>
  );

  const loading = state.loading;
  let content;

  // only show loading once first time
  if (loading) {
    content = renderLoading();
  } else {
    content = renderAuthenticated();
  }

  return (
    <div data-testid="authenticatePageTestId">
      <Notification />
      <Ability onSuccess={fetchSuccess} />
      {content}
    </div>
  );
}

AuthenticatedPage.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  match: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  location: PropTypes.object,

  // parent props

  // resaga props
  fetched: PropTypes.number,
  resaga: PropTypes.object,
};

AuthenticatedPage.defaultProps = {};

export default compose(
  Authenticated,
  SetupDone,
  resaga({
    value: {
      fetched: [ABILITY_DATA_STORE, 'fetched'],
    },
  }),
)(React.memo(AuthenticatedPage));
