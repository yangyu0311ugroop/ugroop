import { ability } from 'apis/components/Ability/ability';
import { PARTICIPANT, NODE_SHARE } from 'utils/modelConstants';
import { DO_NOTHING } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import {
  CONFIRMED,
  PENDING,
  ORG_MEMBER,
} from 'datastore/invitationStore/constants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import Tab from 'ugcomponents/Tab/tab';
import Tabs from 'ugcomponents/Tabs';
import Button from 'viewComponents/Button';
import HelpTourConnections from './components/HelpTourConnections';
import { CONFIG } from './config';
import styles from './styles';

export class ShareListTabs extends PureComponent {
  state = {
    showHelp: false,
  };

  componentWillMount = () => {
    const { shareListTab, shareListFilter } = ShareListTabs.defaultProps;
    this.props.resaga.setValue({ shareListTab, shareListFilter });
  };

  handleTabChange = (event, shareListTab) => {
    this.props.resaga.setValue({ shareListTab });
  };

  changeFilter = shareListFilter => () => {
    if (shareListFilter) {
      return this.props.resaga.setValue({ shareListFilter });
    }

    return DO_NOTHING;
  };

  showHelp = () => {
    this.setState({ showHelp: true });
  };

  hideHelp = () => {
    this.setState({ showHelp: false });
  };

  renderBadge = (count, state) => {
    if (!count) return null;

    const { classes, shareListFilter } = this.props;

    return (
      <div
        className={classnames(classes.badge, {
          [classes.badgeActive]: shareListFilter === state,
        })}
      >
        {count}
      </div>
    );
  };

  renderTabs = () => {
    const {
      classes,
      userNodeIds,
      shareTokens,
      shareListTab,
      orgId,
    } = this.props;

    const connected = (
      <div className={classes.flexCenter}>
        Connected {this.renderBadge(userNodeIds.length, CONFIRMED)}
      </div>
    );

    const pending = (
      <div className={classes.flexCenter}>
        Pending {this.renderBadge(shareTokens.length, PENDING)}
      </div>
    );

    return (
      <div className={classes.tabs}>
        <Tabs
          value={shareListTab}
          textColor="primary"
          onChange={this.handleTabChange}
          className={classnames(classes.tabRoot, classes.grow)}
        >
          <Tab
            label={connected}
            onClick={this.changeFilter(CONFIRMED)}
            className={classnames(classes.tabItem, classes.firstTabItem)}
          />
          {ability.can('execute', PARTICIPANT) && (
            <Tab
              label={pending}
              onClick={this.changeFilter(PENDING)}
              className={classes.tabItem}
            />
          )}
          {ability.can('create', NODE_SHARE) && orgId && (
            <Tab
              label="Organisation"
              onClick={this.changeFilter(ORG_MEMBER)}
              className={classes.tabItem}
            />
          )}
        </Tabs>
        <div className={classes.helpRoot}>
          <Button
            icon="question"
            variant="outline"
            size="extraSmall"
            onClick={this.showHelp}
            weight="strong"
            color="gray"
            iconButton
          />
        </div>
      </div>
    );
  };

  renderHelp = () => (
    <HelpTourConnections open={this.state.showHelp} onClose={this.hideHelp} />
  );

  render = () => (
    <React.Fragment>
      {this.renderHelp()}
      {this.renderTabs()}
    </React.Fragment>
  );
}

ShareListTabs.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  userNodeIds: PropTypes.array,
  shareTokens: PropTypes.array,

  // resaga props
  shareListTab: PropTypes.number,
  shareListFilter: PropTypes.string,

  // parent
  orgId: PropTypes.number,
};

ShareListTabs.defaultProps = {
  userNodeIds: [],
  shareTokens: [],

  shareListTab: 0,
  shareListFilter: CONFIRMED,
};

export default compose(
  withStyles(styles, { name: 'ShareListTabs' }),
  INVITATION_STORE_HOC.selectUserNodeIds({
    nodeIds: 'id',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
  }),
  INVITATION_STORE_HOC.selectShareTokens({
    nodeIds: 'id',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    statuses: [PENDING],
  }),
  resaga(CONFIG),
)(ShareListTabs);
