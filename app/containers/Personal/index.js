import { AbilityResolver } from 'apis/components/Ability';
import { URL_HELPERS } from 'appConstants';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import MyChecklists from 'containers/ChecklistsRoute/components/MyChecklists';
import NotFoundPage from 'containers/NotFoundPage';
import SharedTemplates from 'containers/Templates/SharedTemplates';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import UGNavLink from 'components/NavLink';
import { compose } from 'redux';
import resaga from 'resaga';
import { Authenticated, SetupDone } from 'routeProtectionV2';
import Tours from './components/Tours';
import styles from './styles';

export class Personal extends PureComponent {
  render = () => {
    const { classes, me, userId } = this.props;

    return (
      <Fragment>
        <AbilityResolver orgId={me} />
        <GridContainer direction="column" className={classes.root} spacing={0}>
          <GridItem className={classes.subNav}>
            <Container>
              <GridContainer spacing={2} alignItems="center">
                <GridItem>
                  <UGNavLink
                    to={URL_HELPERS.tours()}
                    className={classes.link}
                    activeClassName={classes.active}
                    title="Tours"
                  >
                    Tours
                  </UGNavLink>
                </GridItem>
                <GridItem>
                  <UGNavLink
                    to={URL_HELPERS.sharedTours()}
                    className={classes.link}
                    activeClassName={classes.active}
                    title="Shared Tours"
                  >
                    Shared Tours
                  </UGNavLink>
                </GridItem>
                <GridItem>
                  <UGNavLink
                    to={URL_HELPERS.checklists()}
                    className={classes.link}
                    activeClassName={classes.active}
                    title="Checklists"
                  >
                    Checklists
                  </UGNavLink>
                </GridItem>
              </GridContainer>
            </Container>
          </GridItem>
          <GridItem>
            <Switch>
              <Route path={URL_HELPERS.tours()} component={Tours} />
              <Route
                path={URL_HELPERS.sharedTours()}
                component={SharedTemplates}
              />
              <Route
                path={URL_HELPERS.checklists()}
                component={() => <MyChecklists userId={userId} />}
              />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </GridItem>
        </GridContainer>
      </Fragment>
    );
  };
}

Personal.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  me: PropTypes.string,
  userId: PropTypes.number,
};

Personal.defaultProps = {};

export default compose(
  Authenticated,
  SetupDone,
  withStyles(styles, { name: 'Personal' }),
  resaga({
    value: {
      me: COGNITO_STORE_SELECTORS.myEmail,
      userId: COGNITO_STORE_SELECTORS.myId,
    },
  }),
)(Personal);
