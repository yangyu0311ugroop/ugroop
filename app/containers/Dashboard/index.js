import { Hidden } from '@material-ui/core';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { userActionSelect } from 'containers/App/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  PERSONAL,
  SUBSCRIPTION_ENTERPRISE,
  URL_HELPERS,
  PAGE_HELMETS,
} from 'appConstants';
import { USERLOGOUT } from 'containers/App/constants';
import classnames from 'classnames';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import { ABILITY_API, FIND_MY_TOURS } from 'apis/constants';
import { withStyles } from 'components/material-ui';
import UGNavLink from 'components/NavLink';
import CreateOrganisationWrapper from 'containers/Organisations/components/CreateOrganisation/createOrganisationWrapper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import DenyAccess from 'smartComponents/Plan/parts/DenyAccess';
import OrganisationList from 'smartComponents/Users/components/OrganisationList';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Helmet } from 'react-helmet';
import Home from './components/Home';
import HomeMenu from './components/HomeMenu';
import Tours from './components/Tours';
import { CONFIG } from './config';
import styles from './styles';
import MarketPlace from '../MarketPlace/marketplaceCategoryMenuSideView';
import MarketplaceCategoryListContent from '../MarketPlace/marketplaceCategoryListContent';
import MarketplaceContentDetail from '../MarketPlace/marketplaceContentDetail';
import { PlanProvider } from '../../smartComponents/Plan/context/planProvider';

export const HOME_PAGES = [URL_HELPERS.myTours(), URL_HELPERS.index()];

export class Dashboard extends PureComponent {
  componentDidMount = () => {
    const { location, match } = this.props;
    if (location.pathname === URL_HELPERS.index()) {
      this.fetchAbility();
    }
    this.handleChangePage(location);
    this.handleChangeHomePage(match);
  };

  fetchAbility = () =>
    this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_TOURS, {});

  componentWillReceiveProps = nextProps => {
    const { page, homepage } = this.props;

    if (page !== nextProps.location.pathname) {
      this.handleChangePage(nextProps.location);
    }
    if (homepage !== nextProps.match.path) {
      this.handleChangeHomePage(nextProps.match);
    }
  };

  handleChangePage = location => {
    this.props.resaga.setValue({ page: location.pathname });
  };

  handleChangeHomePage = match => {
    const { userAction } = this.props;
    if (HOME_PAGES.indexOf(match.path) !== -1 && userAction !== USERLOGOUT) {
      this.props.resaga.setValue({ homepage: match.path });
    }
  };

  renderMenu = xs => {
    const { classes, smDown, match } = this.props;
    const className = LOGIC_HELPERS.ifElse(xs, classes.linkXS, classes.link);
    const activeClassName = LOGIC_HELPERS.ifElse(
      xs,
      classes.activeXS,
      classes.active,
    );

    if (smDown) {
      return (
        <GridContainer alignItems="center" spacing={0}>
          <GridItem xs>
            <UGNavLink
              exact
              to={URL_HELPERS.myTours()}
              title="Tours"
              className={classnames(
                className,
                match.path === URL_HELPERS.myTours() && classes.triggerActive,
              )}
              activeClassName={activeClassName}
            >
              <div className={classes.linkText}>Itineraries</div>
            </UGNavLink>
          </GridItem>
          <GridItem xs>
            <UGNavLink
              exact
              to={URL_HELPERS.index()}
              title="Up Next"
              className={className}
              activeClassName={activeClassName}
            >
              <div className={classes.linkText}>See What&rsquo;s up next</div>
            </UGNavLink>
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer direction="column">
        <GridItem>
          <UGNavLink
            exact
            to={URL_HELPERS.myTours()}
            title="Tours"
            className={classnames(
              className,
              match.path === URL_HELPERS.myTours() && classes.triggerActive,
            )}
            activeClassName={activeClassName}
          >
            <div className={classes.linkText}>Itineraries</div>
          </UGNavLink>
        </GridItem>
        <GridItem>
          <UGNavLink
            exact
            to={URL_HELPERS.index()}
            title="Up Next"
            className={className}
            activeClassName={activeClassName}
          >
            <div className={classes.linkText}>See what&rsquo;s up next</div>
          </UGNavLink>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <div className={classes.heading}>
                <MarketPlace />
              </div>
              <Hr half />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <div className={classnames(classes.heading)}>
            {this.renderOrganisationHeader()}
          </div>
        </GridItem>
        <GridItem>
          <OrganisationList overlay />
        </GridItem>
      </GridContainer>
    );
  };

  renderOrganisationHeader = () => (
    <GridContainer alignItems="center">
      <GridItem>
        <Icon color="blue" size="normal" icon="lnr-group-work" />
      </GridItem>
      <GridItem>Organisations</GridItem>
    </GridContainer>
  );

  renderCreateOrg = () => (
    <PlanProvider>
      <CreateOrganisationWrapper type={SUBSCRIPTION_ENTERPRISE} />
    </PlanProvider>
  );

  render = () => {
    const { classes, smDown } = this.props;
    return (
      <>
        <Helmet
          title={PAGE_HELMETS.ORGANISATION_CREATE}
          meta={[
            {
              name: 'description',
              content: 'Description of Creating Organisation',
            },
          ]}
        />
        <GridContainer
          direction="column"
          className={classnames(
            classes.root,
            LOGIC_HELPERS.ifElse(smDown, classes.noPaddingTop),
          )}
          spacing={0}
        >
          <GridItem className={classes.grow}>
            <Container xl padding={false}>
              <GridContainer justify="space-between" wrap="nowrap" spacing={0}>
                <Hidden smDown>
                  <GridItem className={classes.left}>
                    <Sticky top={60} bottomBoundary="#LayoutContent">
                      {this.renderMenu()}
                    </Sticky>
                  </GridItem>
                </Hidden>

                <GridItem className={classes.grow}>
                  <GridContainer direction="column" spacing={0}>
                    <Hidden mdUp>
                      <>
                        <Sticky
                          id="dashboardLeftXS"
                          top="#stickyAppBar"
                          innerZ={1000}
                        >
                          <div>
                            <GridItem>
                              <div className={classes.leftXS}>
                                {this.renderMenu(true)}
                              </div>
                            </GridItem>
                          </div>
                        </Sticky>

                        <GridItem>
                          <GridContainer direction="column">
                            <GridItem>
                              <Headx>
                                <MarketPlace />
                              </Headx>
                            </GridItem>
                            <Hr halfMarginTop />
                          </GridContainer>
                        </GridItem>

                        <GridItem>
                          <GridContainer direction="column">
                            <GridItem>
                              <Headx>{this.renderOrganisationHeader()}</Headx>
                            </GridItem>

                            <GridItem>
                              <OrganisationList maxRender={4} />
                            </GridItem>

                            <Hr halfMarginTop />
                          </GridContainer>
                        </GridItem>
                      </>
                    </Hidden>

                    <GridItem>
                      <Switch>
                        <Route
                          exact
                          path={URL_HELPERS.index()}
                          component={Home}
                        />
                        <Route
                          path={URL_HELPERS.personalDenyAccess()}
                          render={() => (
                            <DenyAccess variant={PERSONAL} homeButton={false} />
                          )}
                        />
                        <Route
                          exact
                          path={URL_HELPERS.productDetail({
                            category: ':category',
                            id: ':id',
                          })}
                          component={MarketplaceContentDetail}
                        />
                        <Route
                          path={URL_HELPERS.marketPlace()}
                          component={MarketplaceCategoryListContent}
                        />
                        <Route path={URL_HELPERS.myTours()} component={Tours} />
                        <Route
                          exact
                          path={URL_HELPERS.orgNew()}
                          render={this.renderCreateOrg}
                        />
                      </Switch>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <Hidden smDown>
                  <Switch>
                    <Route
                      exact
                      path={URL_HELPERS.index()}
                      component={HomeMenu}
                    />
                  </Switch>
                </Hidden>
              </GridContainer>
            </Container>
          </GridItem>
        </GridContainer>
      </>
    );
  };
}

Dashboard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props

  // resaga props
  page: PropTypes.string,
  homepage: PropTypes.string,

  // redux
  userAction: PropTypes.string,
};

Dashboard.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  userAction: userActionSelect(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withRouter,
  withStyles(styles, { name: 'Dashboard' }),
  withSMDown,
  resaga(CONFIG),
  withConnect,
)(Dashboard);
