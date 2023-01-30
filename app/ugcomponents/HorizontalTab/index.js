import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import Tab from 'ugcomponents/Tab';
import Tabs from 'ugcomponents/Tabs';

export const stylesheet = ({ colors }) => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: colors.ghostWhite,
    '&::after': {
      content: '" "',
      width: '100%',
      height: 1,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#eee',
    },
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  tabs: {
    flex: 1,
  },
  tabItem: {
    textTransform: 'none',
    fontSize: '16px',
  },
  toolbarFlexEnd: {
    alignItems: 'flex-end',
  },
});

export class UGHorizontalTab extends PureComponent {
  state = {
    tabSelected: this.props.selectedTab,
  };

  handleChangeTab = (event, value) => {
    this.setState({
      tabSelected: value,
    });
  };

  render = () => {
    const {
      classes,
      className,
      children,
      appBarClassName,
      tabItems,
    } = this.props;
    const { tabSelected } = this.state;
    const tabItemList = tabItems.map(tabItem => (
      <Tab
        key={`UGHRTabItem-${tabItem.label}`}
        className={classNames(classes.tabItem)}
        label={tabItem.label}
      />
    ));
    return (
      <div className={classNames(classes.root, className)}>
        <AppBar
          className={classNames(classes.appBar, appBarClassName)}
          position="static"
          color="inherit"
        >
          <Container>
            <Toolbar
              className={classNames(classes.toolbar, classes.toolbarFlexEnd)}
            >
              <Tabs
                onChange={this.handleChangeTab}
                value={this.state.tabSelected}
                className={classNames(classes.tabs)}
                textColor="primary"
              >
                {tabItemList}
              </Tabs>
            </Toolbar>
          </Container>
        </AppBar>
        {children[tabSelected]}
      </div>
    );
  };
}

UGHorizontalTab.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  appBarClassName: PropTypes.string,
  tabItems: PropTypes.array.isRequired,
  selectedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
UGHorizontalTab.defaultProps = {
  selectedTab: 0,
};

export default withStyles(stylesheet, { name: 'UGHorizontalTab' })(
  UGHorizontalTab,
);
