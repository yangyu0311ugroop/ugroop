import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { URL_HELPERS } from 'appConstants';
import EditPreferencesForm from 'smartComponents/Person/components/EditPreferencesForm';

import JText from 'components/JText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import classnames from 'classnames';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import { Route, Switch, withRouter } from 'react-router-dom';
import JButton from 'viewComponents/Button/variants/JButton';
import styles from './styles';
import { CONFIG } from './config';

const breadcrumbNameMap = {
  reminders: 'Invitation Reminder',
};

export class Preferences extends PureComponent {
  hasAccess = () => true;

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
    const { classes, smDown, match } = this.props;
    return (
      <ListItem
        button={!!subnav && this.hasAccess()}
        onClick={URL_HELPERS.goToUrl(`${match.url}/${subnav}`, this.props)}
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

  renderReminderContent = () => {
    const { classes, id } = this.props;
    return (
      <GridContainer
        direction="column"
        spacing={1}
        wrap="nowrap"
        classes={classes.noWrap}
      >
        <GridItem>
          <JText bold dark nowrap={false}>
            <EditPreferencesForm id={id} variant={VARIANTS.READ_ONLY} />
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  renderRemindersPersonal = () => (
    <EditPreferencesForm userId={this.props.id} />
  );

  renderBreadcrumbs = () => {
    const { location } = this.props;

    const pathnames = location.pathname.split('/');

    const lastItem = pathnames.pop();
    const goBack = pathnames.join('/');

    if (pathnames.length <= 2) return null;

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

  renderPersonalPreference = () => {
    const { classes } = this.props;
    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={4}>
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <JText xl dark>
                  User Preferences
                </JText>
              </GridItem>
              <GridItem className={classes.textCenter}>
                <JText gray nowrap={false}>
                  Specify your preference that will be use on uGroop
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderPreference()}
        </GridContainer>
      </div>
    );
  };

  renderPreference = () => {
    const { classes, id } = this.props;

    return (
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
                subnav: 'reminders',
                heading: 'Invitation Reminder',
                content: this.renderReminderContent(),
              })}
              <ListItem divider className={classes.padding}>
                <GridContainer direction="column" spacing={1}>
                  <EditPreferencesForm
                    variant={VARIANTS.SEE_MORE_SWITCH}
                    userId={id}
                  />
                </GridContainer>
              </ListItem>
            </List>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer direction="column" spacing={1}>
          {this.renderBreadcrumbs()}
          <GridItem>
            <Switch>
              <Route
                path={`${match.url}/reminders`}
                render={this.renderRemindersPersonal}
              />
              <Route path="*" render={this.renderPersonalPreference} />
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

  // parent props
  id: PropTypes.number,
  smDown: PropTypes.bool,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // resaga props
};

Preferences.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Preferences' }),
  withSMDown,
  withRouter,
  resaga(CONFIG),
)(Preferences);
