import classNames from 'classnames';
import Container from 'components/Container';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from 'ugcomponents/Tabs';
import { compose } from 'redux';

import styles from './styles';
import TabItem from './components/TabItem';

export class TabHeader extends PureComponent {
  state = {
    sticky: false,
    activeTab: this.props.activeTab,
  };

  componentDidMount = () => {
    const { classes } = this.props;
    this.customClasses = {
      flexContainer: classes.flexContainer,
    };
  };

  // TODO: Replace this to getDerivedStateFromProps when we upgrade storybook to run storybook 4.0.11alpha (https://github.com/storybooks/storybook/issues/3825)
  componentWillReceiveProps = nextProps => {
    if (nextProps.activeTab !== this.state.activeTab) {
      if (!this.props.controlledActiveTab) {
        this.setState({
          activeTab: nextProps.activeTab,
        });
      }
    }
  };

  handleTabChange = (event, index) => {
    if (!this.props.controlledActiveTab) {
      this.setState({
        activeTab: index,
      });
    }
    LOGIC_HELPERS.ifFunction(this.props.onTabChange, [index]);
  };

  handleStateChange = status => {
    if (typeof status === 'object') {
      this.setState({ sticky: status.status === Sticky.STATUS_FIXED });
    }
  };

  renderTabItems = () => {
    const { tabItems } = this.props;
    const { sticky } = this.state;
    return tabItems.map(tabItem => (
      <TabItem
        key={tabItem.id}
        noBackgroundColor={sticky}
        tabId={tabItem.id}
        label={tabItem.label}
        hideItem={tabItem.hidden}
      />
    ));
  };

  render = () => {
    const {
      classes,
      children,
      helper,
      isContainerLarge,
      activeTab: parentActiveTab,
    } = this.props;

    const { activeTab } = this.state;

    const { sticky } = this.state;

    const tabItems = isEmptyString(children) ? this.renderTabItems() : children;

    const selectedTab = this.props.controlledActiveTab
      ? parentActiveTab
      : activeTab;

    return (
      <Sticky
        id="tabHeader"
        enabled
        innerZ={99}
        onStateChange={this.handleStateChange}
      >
        <AppBar position="static" color="inherit" className={classes.appBar}>
          <Container large={isContainerLarge}>
            <Toolbar
              className={classNames(classes.toolbar, {
                [classes.toolbarFlexEnd]: !sticky,
              })}
            >
              <Tabs
                value={selectedTab}
                onChange={this.handleTabChange}
                textColor="primary"
                className={classes.tabs}
                variant="scrollable"
                scrollButtons="auto"
                classes={this.customClasses}
              >
                {tabItems}
              </Tabs>
              {helper}
            </Toolbar>
          </Container>
        </AppBar>
      </Sticky>
    );
  };
}

TabHeader.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  tabItems: PropTypes.array,
  helper: PropTypes.node,
  children: PropTypes.node,
  isContainerLarge: PropTypes.bool,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  controlledActiveTab: PropTypes.bool,
};

TabHeader.defaultProps = {
  tabItems: [],
  children: '',
  isContainerLarge: false,
  activeTab: 0,
  helper: null,
  onTabChange: null,
  controlledActiveTab: false,
};

export default compose(withStyles(styles, { name: 'TabHeader' }))(TabHeader);
