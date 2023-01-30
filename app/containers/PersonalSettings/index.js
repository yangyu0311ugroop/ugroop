import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { withXSDown } from 'components/material-ui/hocs/withMediaQuery';
import BillingTab from 'containers/Profile/components/Person/components/Content/components/Billing';
import PassportTab from 'containers/Profile/components/Person/components/Content/components/Passports';
import Preferences from 'containers/Profile/components/Person/components/Content/components/Preferences';
import RolesTab from 'containers/Profile/components/Person/components/Content/components/Roles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Redirect, NavLink, Route, Switch } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import PersonalInfo from './components/PersonalInfo';
import { CONFIG } from './config';
import styles from './styles';

export class PersonalSettings extends PureComponent {
  renderNav = () => {
    const { classes, match } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <NavLink
            to={`${match.url}/personal-info`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Personal Info
          </NavLink>
        </GridItem>
        <GridItem>
          <NavLink
            to={`${match.url}/passports`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Passports
          </NavLink>
        </GridItem>
        <GridItem>
          <NavLink
            to={`${match.url}/organisations`}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            My Organisations
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
            Billings
          </NavLink>
        </GridItem>
      </GridContainer>
    );
  };

  renderPersonalInfo = routeProps => (
    <PersonalInfo {...routeProps} userId={this.props.userId} />
  );

  renderPassports = () => (
    <Container reading padding={false}>
      <PassportTab id={this.props.userId} />
    </Container>
  );

  renderRolesTab = () => (
    <Container reading padding={false}>
      <RolesTab id={this.props.userId} />
    </Container>
  );

  renderPreferences = () => (
    <Container reading padding={false}>
      <Preferences id={this.props.userId} />
    </Container>
  );

  renderBillingTab = () => (
    <Container reading padding={false}>
      <BillingTab userId={this.props.userId} />
    </Container>
  );

  renderRedirect = () => (
    <Redirect to={`${this.props.match.url}/personal-info`} />
  );

  render = () => {
    const { classes, match, xsDown } = this.props;

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
                    path={`${match.url}/personal-info`}
                    render={this.renderPersonalInfo}
                  />
                  <Route
                    path={`${match.url}/passports`}
                    render={this.renderPassports}
                  />
                  <Route
                    path={`${match.url}/organisations`}
                    render={this.renderRolesTab}
                  />
                  <Route
                    path={`${match.url}/preferences`}
                    render={this.renderPreferences}
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

PersonalSettings.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  xsDown: PropTypes.bool,

  // parent props
  match: PropTypes.object.isRequired,
  userId: PropTypes.number,

  // resaga props
};

PersonalSettings.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'PersonalSettings' }),
  withXSDown,
  resaga(CONFIG),
)(PersonalSettings);
