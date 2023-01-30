import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import { ability } from 'apis/components/Ability/ability';
import { Can } from 'apis/components/Ability/components/Can';
import classNames from 'classnames';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { MOVE_NODE_AFTER, MOVE_NODE_BEFORE, NODE_API } from 'apis/constants';
import { DAY_TAB_INDEX } from 'containers/Templates/TemplateManagement/constants';
import { ABILITY_HELPERS } from 'apis/components/Ability/helpers';
import tabHelper from 'datastore/templateManagementStore/helpers/tabs';
import { get, last } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon/index';
import Tab from 'ugcomponents/Tab';
import Tabs from 'ugcomponents/Tabs';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { TAB_OTHER } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import DeleteTab from './components/DeleteTab';
import EditTab from './components/EditTab';
import HelpTab from './components/HelpTab';
import StickyToolbar from './components/StickyToolbar';
import { USER_NODES_CONFIG, ROLES_CONFIG, USER_ID_CONFIG } from './config';
import { FIXED_TABS_OFFSET } from './constants';
import styles from './styles';

export class Header extends PureComponent {
  state = {
    addTab: false,
    deleteTab: false,
    editTab: false,
    helpTab: false,
    isSticky: false,
  };

  componentWillMount = () => {
    this.dialogProps = {
      template: 'add',
      dialogTitle: 'Add Tab',
      headlineTitle: 'Add Tab',
      headlineIcon: 'lnr-new-tab',
      headlineText: 'Please provide a name for your new tab',
    };
  };

  // When a new Tab is created, we select that tab
  // componentDidUpdate = prevProps => {
  // if (prevProps.tabIds.length < this.props.tabIds.length) {
  //   this.handleTabChange(null, this.props.tabIds.length - 1);
  // }
  // };

  onDragEnd = ({ source, destination, reason }) => {
    const sourceIndex = get(source, 'index', -1);
    const destinationIndex = get(destination, 'index', -1);

    if (destinationIndex === -1 || reason === 'CANCEL') return false;

    const actualDestination = destinationIndex + FIXED_TABS_OFFSET;

    if (sourceIndex === actualDestination) return false;

    this.updateServer(sourceIndex, actualDestination);
    this.updateStore(sourceIndex, actualDestination);

    return true;
  };

  handleViewChange = value => () => {
    const { location, history } = this.props;
    const parsedQuery = parseQueryParam(location.search);

    if (Number(parsedQuery.tab) !== DAY_TAB_INDEX) {
      parsedQuery.tab = DAY_TAB_INDEX;
      parsedQuery.dayView = value;
      const stringified = stringifyParam(parsedQuery);
      history.replace(`${location.pathname}?${stringified}`);
    } else if (parsedQuery.dayView !== value) {
      parsedQuery.dayView = value;
      const param = stringifyParam(parsedQuery);
      history.replace(`${location.pathname}?${param}`);
    }

    this.props.resaga.setValue({ layout: value });
  };

  updateServer = (source, destination) => {
    const { templateId, tabIds } = this.props;

    const ACTION = destination < source ? MOVE_NODE_BEFORE : MOVE_NODE_AFTER;

    this.props.resaga.dispatchTo(NODE_API, ACTION, {
      payload: {
        id: get(tabIds, destination),
        toBeMovedId: get(tabIds, source),
        tabId: templateId,
        children: tabIds, // for revert purpose if something goes wrong
        destination,
        store: 'templates',
      },
      onSuccess: this.updateSuccess,
    });
  };

  updateStore = (source, destination) => {
    const { templateId } = this.props;

    return this.props.resaga.setValue({
      templates: tabHelper.moveChildren(templateId, source, destination),
    });
  };

  updateSuccess = (result, { destination }) => {
    this.handleTabChange({}, destination);
  };

  deleteSuccess = () => this.handleTabChange();

  handleTabChange = (event, index = 0) => {
    const { history, pathname, tabIds } = this.props;

    if (index > tabIds.length - 1) {
      return false;
    }

    return history.push(`${pathname}?tab=${index}`);
  };

  addNewTab = () => this.setState({ addTab: true });

  openDeleteTab = () => {
    const { activeTab } = this.props;

    if (activeTab < FIXED_TABS_OFFSET) {
      return alert("This tab can't be deleted.");
    }

    return this.setState({ deleteTab: true });
  };

  closeDialog = key => this.setState({ [key]: false });

  renameTab = () => {
    const { activeTab } = this.props;
    if (activeTab < FIXED_TABS_OFFSET) {
      return alert("This tab can't be edited.");
    }

    return this.setState({ editTab: true });
  };

  showHelp = () => this.setState({ helpTab: true });

  // canDoSomething = () => ability.can('update', 'tabother') || ability.can('delete', 'tabother') || ability.can('update', { type: 'link' });

  stickyChange = status => {
    this.setState({ isSticky: status.status === Sticky.STATUS_FIXED });
  };

  viewIconFromValue = value => {
    switch (value) {
      case 'day':
        return 'lnr-calendar-31';
      case 'card':
        return 'lnr-grid';
      case 'timeline':
        return 'lnr-calendar-full';
      case 'title':
        return 'lnr-menu-square';
      case 'map':
        return 'lnr-map-marker';
      default:
        return 'lnr-list4';
    }
  };

  canSeeMoreButton = () =>
    ability.can('create', TAB_OTHER) ||
    ability.can('update', TAB_OTHER) ||
    ability.can('delete', TAB_OTHER);

  renderViewButton = ({ openMenu }) => {
    const { classes } = this.props;

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        className={classes.actionButton}
        onClick={openMenu}
      >
        <Icon icon="lnr-chevron-down" size="xsmall" />
      </Button>
    );
  };

  renderViewPopper = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem
          icon="lnr-list"
          closeMenu={closeMenu}
          onClick={this.handleViewChange('list')}
        >
          List View
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          icon="lnr-calendar-31"
          closeMenu={closeMenu}
          onClick={this.handleViewChange('day')}
        >
          Day View
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          icon="lnr-grid"
          closeMenu={closeMenu}
          onClick={this.handleViewChange('card')}
        >
          Card View
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          icon="lnr-calendar-full"
          closeMenu={closeMenu}
          onClick={this.handleViewChange('timeline')}
        >
          Timeline View
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          icon="lnr-map-marker"
          closeMenu={closeMenu}
          onClick={this.handleViewChange('map')}
        >
          Map View
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  renderSwitchView = () => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderViewButton}
      stopPropagation
    >
      {this.renderViewPopper}
    </Popper>
  );

  renderMoreButton = ({ openMenu }) => {
    const { classes } = this.props;

    if (!this.canSeeMoreButton()) return null;

    return (
      <MuiTab
        key="more"
        label={<Icon size="small" icon="lnr-ellipsis" />}
        className={classNames(classes.tab, classes.lastTab)}
        onClick={openMenu}
      />
    );
  };

  renderMorePopper = ({ closeMenu }) => {
    const { tabType, editable } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <Can do="create" on={TAB_OTHER}>
          <GridItem>
            <MenuItem
              icon="lnr-plus"
              closeMenu={closeMenu}
              onClick={this.addNewTab}
            >
              New Tab
            </MenuItem>
          </GridItem>
        </Can>
        {tabType === TAB_OTHER && editable && (
          <React.Fragment>
            <Can do="update" on={TAB_OTHER}>
              <GridItem>
                <MenuItem
                  icon="lnr-register"
                  closeMenu={closeMenu}
                  onClick={this.renameTab}
                >
                  Edit Tab
                </MenuItem>
              </GridItem>
            </Can>
            <Can do="delete" on={TAB_OTHER}>
              <GridItem>
                <MenuItem
                  icon="lnr-trash2"
                  closeMenu={closeMenu}
                  onClick={this.openDeleteTab}
                >
                  Delete Tab
                </MenuItem>
              </GridItem>
            </Can>
          </React.Fragment>
        )}
        <Can do="update" on={TAB_OTHER}>
          <GridItem>
            <MenuItem
              icon="lnr-question"
              closeMenu={closeMenu}
              onClick={this.showHelp}
            >
              Help
            </MenuItem>
          </GridItem>
        </Can>
      </GridContainer>
    );
  };

  renderMoreMenu = () => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderMoreButton}
      value={this.canSeeMoreButton()}
    >
      {this.renderMorePopper}
    </Popper>
  );

  renderSwitchViewPopper = label => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderTabTimeLine(label)}
      stopPropagation
    >
      {this.renderViewPopper}
    </Popper>
  );

  renderTabTimeLine = label => ({ openMenu }) => {
    const { classes, layout } = this.props;

    return (
      <GridContainer
        alignItems="center"
        wrap="nowrap"
        className={classes.tabTimeLine}
        onClick={openMenu}
      >
        <GridItem>
          <Icon icon={this.viewIconFromValue(layout)} size="small" />
        </GridItem>
        <GridItem>
          <span title={label}>{label}</span>
        </GridItem>
        <GridItem>
          <Icon icon="lnr-chevron-down" size="xsmall" />
        </GridItem>
      </GridContainer>
    );
  };

  renderLabel = ({ index, active, label, privateTab }) => {
    const { classes, layout } = this.props;

    if (label === 'Days & Events' && index === 0) {
      if (active) {
        return this.renderSwitchViewPopper(label);
      }

      return (
        <GridContainer
          onClick={this.handleViewChange(layout)}
          alignItems="center"
          wrap="nowrap"
          className={classes.tabTimeLine}
        >
          <GridItem>
            <Icon icon={this.viewIconFromValue(layout)} size="xsmall" />
          </GridItem>
          <GridItem>
            <span title={label}>{label}</span>
          </GridItem>
          <GridItem>{this.renderSwitchView()}</GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer className={classes.tabContent}>
        <GridItem className={classes.tabGrid}>
          {privateTab && (
            <Icon className={classes.lock} size="xsmall" icon="lnr-lock" />
          )}
          <span title={label}>{label}</span>
        </GridItem>
      </GridContainer>
    );
  };

  renderTabItems = () => {
    const { classes, tabIds, activeTab, layout } = this.props;

    const calculatedTabIds = tabIds || [];

    const tabObjects = calculatedTabIds.map((tabId, index) => (
      <Tab
        key={tabId}
        active={index === activeTab}
        tabId={tabId}
        index={index}
        renderLabel={this.renderLabel}
        layout={layout}
        className={classNames(
          classes.tab,
          index === activeTab && classes.selectedTab,
        )}
      />
    ));
    return tabObjects;
  };

  renderTabs = () => {
    const { isSticky } = this.state;
    const { classes, activeTab, title, isPublicView } = this.props;

    return (
      <Sticky
        id="tabHeader"
        enabled
        innerZ={99}
        enableTransforms={false}
        onStateChange={this.stickyChange}
      >
        <AppBar
          position="static"
          color="inherit"
          className={classNames(classes.appBar)}
        >
          <Container
            className={classNames(
              !isSticky && classes.flex,
              isPublicView && classes.publicViewContainer,
            )}
          >
            {isSticky && (
              <StickyToolbar
                id={this.props.templateId}
                activeTabId={this.props.activeTab}
                tourTitle={title}
              />
            )}
            <Toolbar className={classNames(classes.toolbar)}>
              <Tabs
                className={classes.tabs}
                value={activeTab}
                onChange={this.handleTabChange}
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                {this.renderTabItems()}
              </Tabs>

              {this.renderMoreMenu()}
            </Toolbar>
          </Container>
        </AppBar>
      </Sticky>
    );
  };

  renderDroppable = () => provided => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {this.renderTabs()}
      {provided.placeholder}
    </div>
  );

  renderContent = () => (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="tabHeader" type="tabItem" direction="horizontal">
        {this.renderDroppable()}
      </Droppable>
    </DragDropContext>
  );

  renderDialogs = () => {
    const {
      tabIds,
      templateId,
      activeTab,
      userIdRelatedIds,
      accountId,
    } = this.props;

    const { addTab, editTab, deleteTab, helpTab } = this.state;

    const role = ABILITY_HELPERS.getRoleUsingRelatedIds(
      userIdRelatedIds,
      accountId,
    );

    const parentId = last(tabIds);
    const tabId = tabIds[activeTab];

    if (!tabId) {
      return null;
    }

    return (
      <span>
        <HelpTab open={helpTab} onClose={this.closeDialog} />
        <EditTab
          parentId={parentId}
          templateId={templateId}
          open={addTab}
          onClose={this.closeDialog}
          dialogProps={this.dialogProps}
          tourRole={role}
        />
        <EditTab
          tabId={tabId}
          tourRole={role}
          open={editTab}
          onClose={this.closeDialog}
        />
        <DeleteTab
          tabId={tabId}
          templateId={templateId}
          open={deleteTab}
          onClose={this.closeDialog}
          tourRole={role}
          onSuccess={this.deleteSuccess}
        />
      </span>
    );
  };

  render = () => {
    const { classes, title } = this.props;
    return (
      <div className={classes.root}>
        <Helmet
          title={title}
          meta={[{ name: 'description', content: 'Description of Template' }]}
        />
        {this.renderContent()}
        {this.renderDialogs()}
      </div>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  pathname: PropTypes.string,
  tabId: PropTypes.number,
  isPublicView: PropTypes.bool,
  // resaga props
  templateId: PropTypes.number,
  activeTab: PropTypes.number,
  tabIds: PropTypes.array,
  title: PropTypes.string,
  layout: PropTypes.string,
  editable: PropTypes.bool,
  tabType: PropTypes.string,
  roleRelatedIds: PropTypes.array,
  accountId: PropTypes.number,
  tourRole: PropTypes.string,
  userIdRelatedIds: PropTypes.array,

  // withRouter props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

Header.defaultProps = {
  activeTab: 0,
  tabIds: [],
  pathname: '',
  title: '',
  roleRelatedIds: [],
  isPublicView: false,
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  withRouter,
  resaga(USER_NODES_CONFIG),
  resaga(ROLES_CONFIG),
  resaga(USER_ID_CONFIG),
)(withRouter(Header));
