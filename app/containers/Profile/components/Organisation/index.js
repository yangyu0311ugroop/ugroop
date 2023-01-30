import { withStyles } from '@material-ui/core/styles';
import {
  GET_ORG_MEMBERS,
  GET_ORG_SUBTYPES,
  GET_ORG_TYPES,
  GET_ORGANISATION,
  ORGANISATION_API,
} from 'apis/constants';
import { DO_NOTHING, ORGANISATION_VIEWSTORE, URL_HELPERS } from 'appConstants';
import Container from 'components/Container';
import GridItem from 'components/GridItem';
import { SCHOOL_ORG_TYPE } from 'containers/Profile/constants';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import injectReducer from 'utils/injectReducer';
import {
  withSMDown,
  withXSDown,
} from 'components/material-ui/hocs/withMediaQuery';
import Sticky from 'react-stickynode';
import GridContainer from 'components/GridContainer';
import classnames from 'classnames';
// import { Hidden } from '@material-ui/core';
import Content from './components/Content';
// import TabHeader from './components/TabHeader';
import { CONFIG, CONFIG2 } from './config';
import m from './messages';

import styles from './styles';
import Preferences from './components/Content/components/Preferences';
import People from '../../../Organisations/components/People';
import School from './components/Content/components/School';
import ProfileTab from './components/Content/components/Profile';
import Billing from './components/Content/components/Billing';
import Hr from '../../../../components/Hr';
import OrganisationList from '../../../../smartComponents/Users/components/OrganisationList';

export class Organisation extends React.PureComponent {
  state = {
    errorLoading: false,
    errorStatusCode: HTTP_STATUS_CODE.STATUS_OK,
  };

  componentDidMount = () => {
    const { organisationIdFromURL } = this.props;

    this.orgInfoSuccess(organisationIdFromURL);
  };

  componentWillReceiveProps = nextProps => {
    const { organisationIdFromURL } = this.props;

    if (organisationIdFromURL !== nextProps.organisationIdFromURL) {
      return this.orgInfoSuccess(nextProps.organisationIdFromURL);
    }

    return DO_NOTHING;
  };

  getOrgSuccess = (result, { id: organisationIdFromURL }) => {
    if (organisationIdFromURL) {
      return this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
        payload: { id: organisationIdFromURL, activated: '' },
        onSuccess: this.orgMembersSuccess,
      });
    }

    return DO_NOTHING;
  };

  orgInfoSuccess = organisationIdFromURL => {
    if (organisationIdFromURL) {
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORGANISATION, {
        payload: { id: organisationIdFromURL },
        onSuccess: this.getOrgSuccess,
        onError: this.orgFetchOrgError,
      });
    }
  };

  orgFetchOrgError = err => {
    // TODO: Add redirect component when its fixed
    this.setState({
      errorLoading: true,
      errorStatusCode: get(err, 'response.error.statusCode', 0),
    });
  };

  orgMembersSuccess = () => {
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_TYPES, {
      onSuccess: this.orgTypesSuccess,
    });
  };

  orgTypesSuccess = () => {
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_SUBTYPES, {
      payload: { code: SCHOOL_ORG_TYPE },
    });
  };

  renderLoading = () => (
    <Container>
      <LoadingText />
    </Container>
  );

  renderUnauthorized = () => {
    const { classes } = this.props;
    const { errorStatusCode } = this.state;
    return (
      <GridItem>
        <div className={classes.unauth}>
          {errorStatusCode === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED ? (
            <M {...m.unauthorized} />
          ) : (
            <M {...m.unKnownError} />
          )}
        </div>
      </GridItem>
    );
  };

  renderNav = () => {
    const { classes, match, orgType } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <NavLink
            to={`${match.url}/org-info`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Profile
          </NavLink>
        </GridItem>
        {SCHOOL_ORG_TYPE === orgType && (
          <GridItem>
            <NavLink
              to={`${match.url}/school`}
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              School
            </NavLink>
          </GridItem>
        )}

        <GridItem>
          <NavLink
            to={`${match.url}/roles`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Roles
          </NavLink>
        </GridItem>
        <GridItem>
          <NavLink
            to={`${match.url}/preferences`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Preferences
          </NavLink>
        </GridItem>
        <GridItem>
          <NavLink
            to={`${match.url}/billings`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Billing
          </NavLink>
        </GridItem>
        <GridItem>{this.renderOrgList()}</GridItem>
      </GridContainer>
    );
  };

  renderOrgList = () => {
    const { classes, organisationIdFromURL: id } = this.props;
    return (
      <>
        <GridItem>
          <Hr half />
        </GridItem>
        {/* <GridItem xs={6} sm={6} md={12} className={classes.orgHeaderTitle}>
          Other Organisations
        </GridItem> */}
        <GridItem className={classes.orgHeaderTitle}>
          Other Organisations
        </GridItem>
        <GridItem>
          <OrganisationList
            overlay
            canCreate={false}
            excludeOrg={[id, -1]}
            redirectToUrl={URL_HELPERS.orgSettings}
          />
        </GridItem>
      </>
    );
  };

  renderSettingTab = () => {
    const { organisationIdFromURL, classes } = this.props;
    return (
      <Container className={classes.contentView}>
        <GridContainer className={classes.settingTab}>
          <GridItem xs={12} md={3}>
            <GridContainer className={classes.tabHeader}>
              {/* <TabHeader id={organisationIdFromURL} /> */}
              {this.renderNav()}
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={9}>
            <Content id={organisationIdFromURL} />
          </GridItem>
        </GridContainer>
      </Container>
    );
  };

  renderPreferencesTab = () => (
    <Container reading padding={false}>
      <Preferences id={this.props.organisationIdFromURL} />
    </Container>
  );

  renderRolesTab = () => (
    <Container reading padding={false}>
      <People
        id={this.props.organisationIdFromURL}
        showHeader
        userId={this.props.userId}
      />
    </Container>
  );

  renderSchoolTab = () => {
    const { orgType } = this.props;
    if (orgType !== SCHOOL_ORG_TYPE) return this.renderRedirect();
    return (
      <Container reading padding={false}>
        <School id={this.props.organisationIdFromURL} />
      </Container>
    );
  };

  renderProfileTab = () => (
    <Container reading padding={false}>
      <ProfileTab id={this.props.organisationIdFromURL} />
    </Container>
  );

  renderBillingTab = () => (
    <Container reading padding={false}>
      <Billing
        id={this.props.organisationIdFromURL}
        userId={this.props.userId}
      />
    </Container>
  );

  renderRedirect = () => <Redirect to={`${this.props.match.url}/org-info`} />;

  render = () => {
    const {
      isLoading,
      organisationIdFromURL,
      classes,
      xsDown,
      match,
    } = this.props;
    const { errorLoading } = this.state;
    if (isLoading) return this.renderLoading();
    if (errorLoading) return this.renderUnauthorized();
    if (!organisationIdFromURL) return null;

    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column">
          {xsDown && <GridItem>{this.renderNav()}</GridItem>}
          <GridItem>
            <GridContainer wrap="nowrap" spacing={0}>
              {!xsDown && (
                <GridItem className={classes.left}>
                  <Sticky top={60} bottomBoundary="#LayoutContent">
                    {this.renderNav()}
                  </Sticky>
                </GridItem>
              )}
              <GridItem className={classnames(!xsDown && classes.grow)}>
                <Switch>
                  <Route
                    path={`${match.url}/org-info`}
                    render={this.renderProfileTab}
                  />
                  <Route
                    path={`${match.url}/school`}
                    render={this.renderSchoolTab}
                  />
                  <Route
                    path={`${match.url}/roles`}
                    render={this.renderRolesTab}
                  />
                  <Route
                    path={`${match.url}/preferences`}
                    render={this.renderPreferencesTab}
                  />
                  <Route
                    path={`${match.url}/billings`}
                    render={this.renderBillingTab}
                  />
                  <Route path="*" render={this.renderRedirect} />
                </Switch>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

Organisation.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  // parent props
  // resaga props
  smDown: PropTypes.bool,
  isLoading: PropTypes.bool,
  organisationIdFromURL: PropTypes.number,
  xsDown: PropTypes.bool,
  userId: PropTypes.number,
  orgType: PropTypes.string,
};

Organisation.defaultProps = {
  isLoading: false,
};
const orgViewReducer = injectReducer({
  key: ORGANISATION_VIEWSTORE,
  reducer: reducer(ORGANISATION_VIEWSTORE),
});

export default compose(
  orgViewReducer,
  withRouter,
  withStyles(styles, { name: 'Organisation' }),
  withSMDown,
  withXSDown,
  resaga(CONFIG),
  resaga(CONFIG2),
)(Organisation);
