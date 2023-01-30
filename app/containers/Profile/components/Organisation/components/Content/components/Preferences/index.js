import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
// import { Helmet } from 'react-helmet';
import { URL_HELPERS } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ORGANISATION_SETTING } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import { VARIANTS } from 'variantsConstants';
// parts
import { Route, Switch, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames';

import Timezone from 'smartComponents/Organisation/parts/Preference/parts/Timezone';
import DateFormat from 'smartComponents/Organisation/parts/Preference/parts/DateFormat';
import Reminders from 'smartComponents/Organisation/parts/Preference/parts/Reminders';
import PaxLabel from 'smartComponents/Organisation/parts/Preference/parts/PaxLabel';

import Address from 'smartComponents/Organisation/parts/Location/parts/Address';
import JButton from 'viewComponents/Button/variants/JButton';
import Icon from 'ugcomponents/Icon';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
// input
import TimezoneField from './components/Timezone';
import DateFormatField from './components/DateFormat';
import LabelsField from './components/Labels';
import RemindersField from './components/Reminders';
import { CONFIG } from './config';
import styles from './styles';

const breadcrumbNameMap = {
  timezone: 'Timezone',
  'date-format': 'Date Format',
  reminders: 'Invitation Reminder',
  labels: 'Labels',
};

export class Preferences extends PureComponent {
  renderBreadcrumbs = () => {
    const { location } = this.props;

    const pathnames = location.pathname.split('/');
    if (pathnames.length < 6) return null;

    const lastItem = pathnames.pop();
    const goBack = pathnames.join('/');

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={1} wrap="nowrap">
          <GridItem>
            <JButton onClick={URL_HELPERS.goToUrl(goBack, this.props)}>
              <Icon icon="lnr-arrow-left" size="normal" />
            </JButton>
          </GridItem>
          <GridItem>
            <JText dark xl>
              {breadcrumbNameMap[lastItem]}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  hasAccess = () => ability.can('execute', ORGANISATION_SETTING);

  renderListItem = ({
    subnav,
    heading,
    content,
    body,
    extras = LOGIC_HELPERS.ifElse(
      this.hasAccess(),
      <Icon size="normal" icon="lnr-chevron-right" />,
      <Icon size="normal" icon="lnr-lock" />,
    ),
    divider = true,
  } = {}) => {
    const { classes, match, smDown } = this.props;

    return (
      <ListItem
        button={!!subnav && this.hasAccess()}
        onClick={LOGIC_HELPERS.ifElse(
          subnav,
          URL_HELPERS.goToUrl(`${match.url}/${subnav}`, this.props),
        )}
        divider={divider}
        className={classes.padding}
      >
        <GridContainer direction="column" spacing={1}>
          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem className={classes.grow}>
                <GridContainer
                  direction={LOGIC_HELPERS.ifElse(smDown, 'column', 'row')}
                  spacing={0}
                >
                  {heading && (
                    <GridItem className={classnames(!smDown, classes.left)}>
                      <JText bold gray sm uppercase>
                        {heading}
                      </JText>
                    </GridItem>
                  )}
                  {content && <GridItem xs>{content}</GridItem>}
                </GridContainer>
              </GridItem>
              {extras && <GridItem>{extras}</GridItem>}
            </GridContainer>
          </GridItem>
          {body && <GridItem>{body}</GridItem>}
        </GridContainer>
      </ListItem>
    );
  };

  renderTimezoneContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Timezone
            id={this.props.preferenceId}
            variant={VARIANTS.STRING_ONLY}
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderDateFormatContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <DateFormat
            id={this.props.preferenceId}
            variant={VARIANTS.STRING_ONLY}
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderReminderContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Reminders
            id={this.props.preferenceId}
            variant={VARIANTS.READ_ONLY}
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderLabelContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <PaxLabel
            id={this.props.preferenceId}
            variant={VARIANTS.STRING_ONLY}
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderType = routeProps => (
    <Address
      id={this.props.id}
      variant={ORG_FIELD_VARIANTS.TEXT_ONLY}
      readOnly={!this.hasAccess()}
      {...routeProps}
    />
  );

  renderPreference = () => (
    <GridItem>
      <GridContainer card highlight direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText dark lg>
                Preferences
              </JText>
            </GridItem>
            <GridItem>
              <JText gray nowrap={false}>
                Some info may be visible to other people using uGroop.
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <List component="nav">
            {this.renderListItem({
              subnav: 'timezone',
              heading: 'Home Timezone',
              content: this.renderTimezoneContent(),
            })}
            {this.renderListItem({
              subnav: 'date-format',
              heading: 'Date Format',
              content: this.renderDateFormatContent(),
            })}
            {this.renderListItem({
              subnav: 'reminders',
              heading: 'Invitation Reminder',
              content: this.renderReminderContent(),
            })}
          </List>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderLabels = () => (
    <GridItem>
      <GridContainer card highlight direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText dark lg>
                Labels
              </JText>
            </GridItem>
            <GridItem>
              <JText gray nowrap={false}>
                Customized the collective name of those travelling, e.g.
                passesengers, travellers, guests, participants, riders,
                customers, staff or something else.
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <List component="nav">
            {this.renderListItem({
              subnav: 'labels',
              heading: 'PAX',
              content: this.renderLabelContent(),
            })}
          </List>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderOrgPreference = () => {
    const { classes } = this.props;

    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={4}>
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <JText xl dark>
                  Organisation Preferences
                </JText>
              </GridItem>
              <GridItem className={classes.textCenter}>
                <JText gray nowrap={false}>
                  Specify Organisation preferences that your organisation use on
                  uGroop
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderPreference()}
          {this.renderLabels()}
        </GridContainer>
      </div>
    );
  };

  renderTimezone = routeProps => (
    <TimezoneField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  renderDateFormat = routeProps => (
    <DateFormatField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  renderPaxLabel = routeProps => (
    <LabelsField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  renderReminders = routeProps => (
    <RemindersField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  render = () => {
    const { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer direction="column" spacing={1}>
          {this.renderBreadcrumbs()}
          <GridItem>
            <Switch>
              <Route
                path={`${match.url}/timezone`}
                render={this.renderTimezone}
              />
              <Route
                path={`${match.url}/date-format`}
                render={this.renderDateFormat}
              />
              <Route
                path={`${match.url}/reminders`}
                render={this.renderReminders}
              />
              <Route
                path={`${match.url}/labels`}
                render={this.renderPaxLabel}
              />
              <Route path="*" render={this.renderOrgPreference} />
            </Switch>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

Preferences.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number.isRequired,

  // resaga props
  preferenceId: PropTypes.number,
};

Preferences.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Preferences' }),
  withSMDown,
  withRouter,
  resaga(CONFIG),
)(Preferences);
