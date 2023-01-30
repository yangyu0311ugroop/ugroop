import {
  ORGANISATION,
  SUBSCRIPTION_PLAN_TYPE,
  URL_HELPERS,
} from 'appConstants';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import resaga from 'resaga';
import { withStyles } from 'components/material-ui';
import Organisation from 'containers/Profile/components/Organisation';
import { AbilityResolver } from 'apis/components/Ability';
import { ability } from 'apis/components/Ability/ability';
import { ORG_USER, CHECKLIST, TEMPLATE, FOLDER } from 'utils/modelConstants';
import { Can } from 'apis/components/Ability/components/Can';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UGNavLink from 'components/NavLink';
import SubscriptionDowngrade from 'containers/Organisations/components/SubscriptionDowngrade';
import ChangeDurationUpgrade from 'containers/Organisations/components/SubscriptionChangeDuration/upgrade';
import ChangeDurationDowngrade from 'containers/Organisations/components/SubscriptionChangeDuration/downgrade';
import SubscriptionUpgrade from 'containers/Organisations/components/SubscriptionUpgrade';
import PaymentInvoiceHistory from 'containers/Organisations/components/PaymentInvoiceHistory';
import DenyAccess from 'smartComponents/Plan/parts/DenyAccess';
import { compose } from 'redux';
import { Authenticated, SetupDone } from 'routeProtectionV2';
import Checklists from './components/Checklists';
import Contacts from './components/Contacts';
import People from './components/People';
import SharedTours from './components/SharedTours';
import Teams from './components/Teams';
import Tours from './components/Tours';
import Dashboard from './components/Dashboard';
import Subscription from './components/OrgSubscriptionSetup';
import Resubscribe from './components/OrgSubscriptionSetup/resubscribe';
import styles from './styles';
import { CONFIG } from './config';
import SubscriptionAddSeat from './components/SubscriptionAddSeat';
import SubscriptionRemoveSeat from './components/SubscriptionRemoveSeat';
import { VARIANTS } from '../../variantsConstants';
import PaxLabel from '../../smartComponents/Organisation/parts/Preference/parts/PaxLabel';

export class Organisations extends PureComponent {
  hasOrgAccess = () => ability.can('execute', TEMPLATE);

  canViewFolder = () => ability.can('read', FOLDER);

  render = () => {
    const { classes, match, location } = this.props;
    const id = get(match, 'params.id', 0);
    /**
     * Alternatively, we can generate link based on match.url
     * For example:
     * <Route path={`${match.url}/tours`} component={Tours} />
     */
    let subNav = (
      <GridItem className={classes.subNav}>
        <Container>
          <GridContainer spacing={2} alignItems="center">
            <GridItem>
              <UGNavLink
                to={URL_HELPERS.orgTours(id)}
                className={classes.link}
                activeClassName={classes.active}
                title="Folders"
              >
                Folders
              </UGNavLink>
            </GridItem>
            <Can do="update" on={CHECKLIST}>
              <GridItem>
                <UGNavLink
                  to={URL_HELPERS.orgChecklists(id)}
                  className={classes.link}
                  activeClassName={classes.active}
                  title="Checklists"
                >
                  Checklists
                </UGNavLink>
              </GridItem>
            </Can>
            <GridItem>
              <UGNavLink
                to={URL_HELPERS.orgPeople(id)}
                className={classes.link}
                activeClassName={classes.active}
                title="Our Team"
              >
                Our Team
              </UGNavLink>
            </GridItem>
            <GridItem>
              <UGNavLink
                to={URL_HELPERS.orgContacts(id)}
                className={classes.link}
                activeClassName={classes.active}
                title="Contacts"
              >
                <PaxLabel
                  orgId={id}
                  variant={VARIANTS.STRING_ONLY}
                  defaultValue="PAX"
                />
              </UGNavLink>
            </GridItem>
            <Can do="update" on={ORG_USER}>
              <GridItem>
                <UGNavLink
                  to={URL_HELPERS.orgSettings(id)}
                  className={classes.link}
                  activeClassName={classes.active}
                  title="Settings"
                >
                  Settings
                </UGNavLink>
              </GridItem>
            </Can>
          </GridContainer>
        </Container>
      </GridItem>
    );
    if (location.state && location.state.denyAccess) {
      subNav = <GridItem />;
    }

    return (
      <GridContainer direction="column" className={classes.root} spacing={0}>
        <AbilityResolver orgId={Number(id)} />
        {subNav}
        <GridItem>
          <Switch>
            <Route
              path={URL_HELPERS.orgTours(id)}
              component={
                this.hasOrgAccess() || this.canViewFolder()
                  ? Tours
                  : SharedTours
              }
            />
            <Route
              exact
              path={URL_HELPERS.orgIndex(id)}
              component={Dashboard}
            />
            <Route
              path={URL_HELPERS.orgDenyAccess(id)}
              render={() => <DenyAccess variant={ORGANISATION} />}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionSetup(id)}
              render={() => <Subscription id={Number(id)} />}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionSubscribe(id)}
              render={() => <Resubscribe id={Number(id)} />}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionUpgrade(id)}
              render={() => (
                <SubscriptionUpgrade
                  orgId={Number(id)}
                  planType={SUBSCRIPTION_PLAN_TYPE.ORG_SEAT}
                  resaga={this.props.resaga}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionDowngrade(id)}
              render={() => (
                <SubscriptionDowngrade
                  orgId={Number(id)}
                  resaga={this.props.resaga}
                  planType={SUBSCRIPTION_PLAN_TYPE.ORG_SEAT}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionTourPlanUpgrade(id)}
              render={() => (
                <SubscriptionUpgrade
                  orgId={Number(id)}
                  planType={SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT}
                  resaga={this.props.resaga}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionTourPlanDowngrade(id)}
              render={() => (
                <SubscriptionDowngrade
                  orgId={Number(id)}
                  resaga={this.props.resaga}
                  planType={SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionDurationChangeDowngrade(id)}
              render={() => (
                <ChangeDurationDowngrade
                  orgId={Number(id)}
                  resaga={this.props.resaga}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionDurationChangeUpgrade(id)}
              render={() => (
                <ChangeDurationUpgrade
                  orgId={Number(id)}
                  resaga={this.props.resaga}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionAddSeats(id)}
              render={() => (
                <SubscriptionAddSeat
                  orgId={Number(id)}
                  resaga={this.props.resaga}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSubscriptionRemoveSeats(id)}
              render={() => (
                <SubscriptionRemoveSeat
                  orgId={Number(id)}
                  resaga={this.props.resaga}
                />
              )}
            />
            <Route
              path={URL_HELPERS.orgSharedTours(id)}
              component={SharedTours}
            />
            <Route
              path={URL_HELPERS.orgChecklists(id)}
              component={Checklists}
            />
            <Route
              path={URL_HELPERS.orgContacts(id)}
              component={() => (
                <Contacts orgId={Number(id)} resaga={this.props.resaga} />
              )}
            />
            <Route
              path={URL_HELPERS.orgPeople(id)}
              render={() => <People id={Number(id)} />}
            />
            <Route path={URL_HELPERS.orgTeams(id)} component={Teams} />
            <Route
              path={URL_HELPERS.orgSettings(id)}
              component={Organisation}
            />
            <Route
              path={URL_HELPERS.orgViewPaymentHistory(id)}
              render={() => <PaymentInvoiceHistory orgId={Number(id)} />}
            />
            <Route path="*">
              <Redirect to="/notfound" />
            </Route>
          </Switch>
        </GridItem>
      </GridContainer>
    );
  };
}

Organisations.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  // parent props
  resaga: PropTypes.object,
  // resaga props
};

Organisations.defaultProps = {
  match: {},
};

export default compose(
  Authenticated,
  SetupDone,
  withStyles(styles, { name: 'Organisations' }),
  resaga(CONFIG),
)(Organisations);
