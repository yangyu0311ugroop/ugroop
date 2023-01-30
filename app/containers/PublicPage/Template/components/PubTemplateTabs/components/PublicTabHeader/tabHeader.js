import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Sticky from 'react-stickynode';
import Container from 'components/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Tabs from 'ugcomponents/Tabs';
import Tab from './components/Tab';
import PlainTab from './components/Tab/tab';
import stylesheet from './styles';

export class TabHeader extends PureComponent {
  TabItems = () => {
    const { data, sticky, classes } = this.props;
    const sample = data.map((tabId, key) => (
      <Tab
        key={tabId}
        tabId={tabId}
        className={classNames(classes.tabItem, {
          [classes.tabItemNoColor]: sticky,
          [classes.firstTabItem]: key === 0,
        })}
      />
    ));
    sample.splice(
      2,
      0,
      <PlainTab
        label="Maps"
        className={classNames(classes.tabItem, {
          [classes.tabItemNoColor]: sticky,
        })}
      />,
    );

    return sample;
  };

  render() {
    const {
      data,
      classes,
      sticky,
      activeTab,
      onHandleTabChange,
      onHandleStateChange,
    } = this.props;
    if (!data || !data.length) return <div>loading..</div>;
    const tabItems = this.TabItems();

    return (
      <Sticky
        id="tabHeader"
        enabled
        innerZ={99}
        onStateChange={onHandleStateChange}
      >
        <AppBar position="static" color="inherit" className={classes.appBar}>
          <Container>
            <Toolbar
              className={classNames(classes.toolbar, {
                [classes.toolbarFlexEnd]: !sticky,
              })}
            >
              <Tabs
                value={activeTab}
                onChange={onHandleTabChange}
                textColor="primary"
                className={classes.tabs}
                scrollable
                scrollButtons="auto"
              >
                {tabItems}
              </Tabs>
            </Toolbar>
          </Container>
        </AppBar>
      </Sticky>
    );
  }
}

TabHeader.propTypes = {
  // from hoc
  classes: PropTypes.object.isRequired,
  // from parent
  activeTab: PropTypes.number,
  data: PropTypes.array,
  sticky: PropTypes.bool,
  onHandleTabChange: PropTypes.func,
  onHandleStateChange: PropTypes.func,
};
TabHeader.defaultProps = {
  data: [],
  activeTab: 0,
};

export default withStyles(stylesheet, { name: 'PublicTabHeader' })(TabHeader);
