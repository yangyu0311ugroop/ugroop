import { Hidden } from '@material-ui/core';
import JText from 'components/JText';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { ability } from 'apis/components/Ability/ability';
import {
  CONTENT,
  MENU_ITEM,
  DO_NOTHING,
  TAB,
  HELP_DIALOG_ATTRIBUTES,
  HELP_DIALOG_KEYS,
} from 'appConstants';
import classnames from 'classnames';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import TabItem from 'containers/Templates/TemplateManagement/components/TemplateContent/components/Header/components/TabItem';
import EditTab from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/components/EditTab';
import TemplateActionButtons from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/TemplateActionButtons';
import { last } from 'lodash';
import isEqual from 'lodash/isEqual';
import set from 'lodash/set';
import without from 'lodash/without';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { withRouter } from 'react-router-dom';
import { scroller } from 'react-scroll/modules';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Star from 'smartComponents/Node/components/Star';
import {
  ACCESS_LEVEL,
  ONLY_ME,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import Icon from 'ugcomponents/Icon';
import { scrollOptions } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY, TAB_OTHER } from 'utils/modelConstants';
import compact from 'lodash/compact';
import JButton from 'viewComponents/Button/variants/JButton';
import FloatingActions from 'ugcomponents/Layout/PublicLayout/components/FloatingActions';
// import Tab from 'ugcomponents/Tab';
import Tabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import Item from './components/Item';
import { CONFIG } from './config';
import styles from './styles';
import HelpTab from './components/HelpTab';
import Button from '../../../../../../../viewComponents/Button';

const PENCIL_WIDTH = 46;
const MORE_WIDTH = 110;
const HELP_WIDTH = 50;
// const DEFAULT_TAB_MINIMUM_WIDTH = 85;
// const CUSTOM_WIDTH_ADD_MORE_TAB = 76;

export class Header extends PureComponent {
  state = {
    activeWidth: 0,
    parentWidth: 0,
    actionButtonWidth: 0,
    childrenWidths: [],
    hiddenIndex: -1,
    computing: true,
    showHelp: false,
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

  componentDidMount = () => {
    const { children } = this.props;

    for (let i = 0; i < children.length; i += 1) {
      this.setState({ [`hidden_${i}`]: false });
    }
  };

  // componentWillReceiveProps = nextProps => {
  //   const { hiddenIds, privateIds } = this.props;
  //
  //   if (hiddenIds.length < nextProps.hiddenIds.length) {
  //     this.setState({ hasChanged: true });
  //   }
  //   if (privateIds.length < nextProps.privateIds.length) {
  //     this.setState({ hasChanged: true });
  //   }
  // };

  canExecuteTab = () => ability.can('execute', TAB_OTHER);

  doNothing = () => DO_NOTHING;

  canDoSomething = () => ability.can('create', ACTIVITY);

  componentDidUpdate = prevProps => {
    const { tabId, children } = this.props;

    // recompute when active tab changed
    if (tabId !== prevProps.tabId) {
      this.compute();
    }

    // recompute when children changed
    if (!isEqual(children, prevProps.children)) {
      this.compute();
    }
  };

  addNewTab = () => {
    const { id, ids } = this.props;

    const parentId = last(ids);

    PORTAL_HELPERS.openAddTab(
      {
        parentId,
        templateId: id,
      },
      this.props,
    );
  };

  closeDialog = key => {
    this.setState({ [key]: false });
  };

  selectNewTab = () => {
    const { history, location, children } = this.props;
    const { pathname } = location;

    return history.push(`${pathname}?tab=${children.length}`);
  };

  handleClick = ({ id, index, isPrivate }) => () => {
    const { history, location, children } = this.props;
    const { pathname } = location;

    if (isPrivate) {
      return history.push(`${pathname}?tabId=${id}`);
    }

    if (index === -1 || index > children.length - 1) {
      return null;
    }

    return history.push(`${pathname}?tab=${index}`);
  };

  compute = () => {
    const { children, tabId, editable } = this.props;
    const { parentWidth, childrenWidths, actionButtonWidth } = this.state;

    const activeTab = children.indexOf(tabId);

    // waiting for parent
    if (!parentWidth) {
      return null;
    }

    for (let i = 0; i < children.length; i += 1) {
      // waiting for items
      if (!childrenWidths[i]) {
        return null;
      }
    }

    let width = 0;
    let hiddenIndex = -1;

    for (let i = 0; i < children.length; i += 1) {
      if (hiddenIndex !== -1) {
        this.setState({ [`hidden_${i}`]: activeTab !== i });
      } else {
        width += childrenWidths[i];

        const specialCase = LOGIC_HELPERS.ifElse(
          [i === children.length - 2, activeTab === children.length - 1],
          true,
        );

        // if there are more items, we need to consider the width of more button,
        // otherwise the width of edit button
        const hasMore = LOGIC_HELPERS.ifElse(
          [i < children.length - 1, !specialCase],
          MORE_WIDTH,
          PENCIL_WIDTH,
        );

        const hasHelpWidth = LOGIC_HELPERS.ifElse(!editable, HELP_WIDTH, 0);

        // consider the size of selected tab if it hasn't rendered
        const otherActive = LOGIC_HELPERS.ifElse(
          activeTab > i,
          childrenWidths[activeTab],
          0,
        );

        const overflow =
          width >
          parentWidth -
            hasMore -
            otherActive -
            actionButtonWidth -
            hasHelpWidth;

        if (overflow && hiddenIndex === -1) {
          hiddenIndex = i;
        }

        this.setState({
          [`hidden_${i}`]: overflow && activeTab !== i,
        });
      }
    }

    return this.setState({ computing: false, hiddenIndex });
  };

  renderItem = (id, index) => {
    const { classes, children, tabId, isPublic, smDown } = this.props;
    const { hiddenIndex } = this.state;
    const overflow = !!this.state[`hidden_${index}`];
    const isLast = hiddenIndex === -1 && index === children.length - 1;
    // console.log({ propssss: smDown });
    if (smDown) {
      return (
        <Item
          id={id}
          first={index === 0}
          last={isLast}
          active={tabId === id}
          isPublic={isPublic}
          onClick={this.handleClick({ index })}
          variant={TAB}
          isMobile={smDown}
        />
      );
    }

    if (overflow) return null;

    return (
      <GridItem
        key={id}
        className={classnames(LOGIC_HELPERS.ifElse(overflow, classes.hidden))}
      >
        <Item
          id={id}
          first={index === 0}
          last={isLast}
          active={tabId === id}
          onResize={this.handleItemResize}
          isPublic={isPublic}
          onClick={this.handleClick({ index })}
          isMobile={smDown}
        />
      </GridItem>
    );
  };

  renderHiddenItem = closeMenu => (id, index) => {
    const { tabId } = this.props;
    const { hiddenIndex } = this.state;

    if (index < hiddenIndex || tabId === id || hiddenIndex === -1) return null;

    return (
      <GridItem key={id}>
        <Item
          variant={MENU_ITEM}
          id={id}
          closeMenu={closeMenu}
          onClick={this.handleClick({ index })}
        />
      </GridItem>
    );
  };

  handleResize = parentWidth => {
    this.setState({ parentWidth }, this.compute);
  };

  handleResizeActionButtons = actionButtonWidth => {
    this.setState({ actionButtonWidth }, this.compute);
  };

  handleItemResize = (id, width) => {
    const { children } = this.props;
    const { childrenWidths } = this.state;

    const index = children.indexOf(id);

    if (childrenWidths[index] !== width) {
      this.setState(
        {
          childrenWidths: set(
            childrenWidths,
            `${index}`,
            width,
            /*    width >= DEFAULT_TAB_MINIMUM_WIDTH && id !== tabId
              ? DEFAULT_TAB_MINIMUM_WIDTH
              : width, */
          ),
        },
        this.compute,
      );
    } else {
      this.compute();
    }
  };

  openManageTabs = () => {
    const { id, tabId } = this.props;

    PORTAL_HELPERS.openManageTabs({ id, activeId: tabId }, this.props);
  };

  renderButton = ({ openMenu, count }) => {
    const { classes, smDown } = this.props;
    // const { hasChanged } = this.state;

    return (
      <TabItem
        last
        onClick={openMenu}
        customClassName={smDown && classes.xsPaddingMore}
      >
        <GridContainer alignItems="center" spacing={0} wrap="nowrap">
          <GridItem>
            {!!count && <div className={classes.badge}>{count} more</div>}
          </GridItem>
          <GridItem>
            <div className={classes.relative}>
              <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />

              {/* {hasChanged && ( */}
              {/*  <div */}
              {/*    title="A tab has been moved here" */}
              {/*    className={classes.moreBadge} */}
              {/*  /> */}
              {/* )} */}
            </div>
          </GridItem>
        </GridContainer>
      </TabItem>
    );
  };

  renderMobileButton = ({ openMenu }) => {
    const { classes } = this.props;
    return (
      <MuiTab
        key="more"
        label={<Icon size="sm" icon="lnr-ellipsis" />}
        className={classes.buttonPopperXS}
        onClick={openMenu}
      />
    );

    /* return (
      <IconButton onClick={openMenu} tooltip="More" variant={ICON_BUTTON}>
        <Icon icon="lnr-ellipsis" />
      </IconButton>
    ); */
  };

  renderPrivateTabs = ({ closeMenu }) => {
    const { classes, privateIds, hiddenIds, tabId } = this.props;

    // if a private tab is hidden, only render them in hidden list
    const withoutHiddenIds = without(privateIds, ...hiddenIds);

    return (
      withoutHiddenIds.length > 0 && (
        <>
          <GridItem>
            <div className={classes.subheader}>
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <Icon icon={ACCESS_LEVEL[ORGANISERS].icon} size="xsmall" />
                </GridItem>
                <GridItem>
                  Shared with {ACCESS_LEVEL[ORGANISERS].title}
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
          {withoutHiddenIds.map(
            this.renderTabMenu({
              closeMenu,
              isPrivate: true,
              tabId,
            }),
          )}
          <Hr quarter />
        </>
      )
    );
  };

  renderHiddenTabs = ({ closeMenu }) => {
    const { classes, hiddenIds, tabId } = this.props;

    return (
      hiddenIds.length > 0 && (
        <>
          <GridItem>
            <div className={classes.subheader}>
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <Icon icon={ACCESS_LEVEL[ONLY_ME].icon} size="xsmall" />
                </GridItem>
                <GridItem>{ACCESS_LEVEL[ONLY_ME].title}</GridItem>
              </GridContainer>
            </div>
          </GridItem>
          {hiddenIds.map(
            this.renderTabMenu({
              closeMenu,
              isPrivate: true,
              tabId,
            }),
          )}
          <Hr quarter />
        </>
      )
    );
  };

  renderExecuteMenu = ({ closeMenu }) =>
    this.canExecuteTab() && (
      <>
        {this.renderPrivateTabs({ closeMenu })}
        {this.renderHiddenTabs({ closeMenu })}
      </>
    );

  renderMoreMenu = ({ closeMenu }) => {
    const { children } = this.props;
    const renderChildren = children.map(this.renderHiddenItem(closeMenu));

    return (
      <GridContainer direction="column" spacing={0}>
        {renderChildren}

        {this.canExecuteTab() && !!compact(renderChildren).length && (
          <Hr quarter />
        )}

        {this.renderExecuteMenu({ closeMenu })}
      </GridContainer>
    );
  };

  renderMore = () => {
    const { children, tabId, privateIds, hiddenIds, smDown } = this.props;
    const { hiddenIndex } = this.state;

    const allChildren = [
      ...LOGIC_HELPERS.ifElse(hiddenIndex !== -1, children, []),
      ...hiddenIds,
      ...LOGIC_HELPERS.ifElse(this.canExecuteTab(), privateIds, []),
    ];

    const activeIndex = allChildren.indexOf(tabId);
    const isHidden = LOGIC_HELPERS.ifElse(hiddenIndex < activeIndex, 1, 0);
    const count =
      allChildren.length -
      LOGIC_HELPERS.ifElse(hiddenIndex < 0, 0, hiddenIndex) -
      isHidden;

    return (
      <GridItem>
        <Popper
          noPadding
          renderButton={smDown ? this.renderMobileButton : this.renderButton}
          count={count}
          // onExit={this.handleClearBadge}
          privateIds={privateIds}
          hiddenIds={hiddenIds}
        >
          {this.renderMoreMenu}
        </Popper>
      </GridItem>
    );
  };

  // handleClearBadge = () => {
  //   this.setState({ hasChanged: false });
  // };

  renderMenuButton = ({ openMenu }) => {
    const { classes } = this.props;
    // const { hasChanged } = this.state;

    return (
      <TabItem onClick={openMenu}>
        <GridContainer alignItems="center" spacing={0} wrap="nowrap">
          <Hidden smDown>
            <GridItem>More</GridItem>
          </Hidden>
          <GridItem>
            <div className={classes.relative}>
              <Icon icon="lnr-chevron-down" size="xxsmall" paddingLeft />

              {/* {hasChanged && ( */}
              {/*  <Tooltip title="A tab has been moved here" isLight> */}
              {/*    <div className={classes.moreBadge} /> */}
              {/*  </Tooltip> */}
              {/* )} */}
            </div>
          </GridItem>
        </GridContainer>
      </TabItem>
    );
  };

  renderMenuMenu = ({ closeMenu }) => {
    const { editable, smDown } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderPrivateTabs({ closeMenu })}
        {this.renderHiddenTabs({ closeMenu })}
        {smDown && editable ? (
          <React.Fragment>
            <GridItem>
              <MenuItem
                icon="lnr-plus"
                closeMenu={closeMenu}
                onClick={this.addNewTab}
              >
                <JText>New tab</JText>
              </MenuItem>
            </GridItem>
            <GridItem>
              <MenuItem
                icon="lnr-cog"
                closeMenu={closeMenu}
                onClick={this.openManageTabs}
              >
                <JText>Manage tabs</JText>
              </MenuItem>
            </GridItem>
          </React.Fragment>
        ) : null}
      </GridContainer>
    );
  };

  renderMenu = () => {
    const { tabId, privateIds, hiddenIds, smDown } = this.props;

    if (!this.canExecuteTab()) {
      return null;
    }

    if (!privateIds.length && !hiddenIds.length && !smDown) {
      return null;
    }

    return (
      <GridItem>
        <Popper
          noPadding
          renderButton={
            smDown ? this.renderMobileButton : this.renderMenuButton
          }
          tabId={tabId}
          // onExit={this.handleClearBadge}
          privateIds={privateIds}
          hiddenIds={hiddenIds}
        >
          {this.renderMenuMenu}
        </Popper>
      </GridItem>
    );
  };

  renderDialogs = () => {
    const { id, ids } = this.props;
    const { addTab } = this.state;

    const parentId = last(ids);

    return (
      <>
        <HelpTab onClose={this.showHelp(false)} open={this.state.showHelp} />
        <EditTab
          parentId={parentId}
          templateId={id}
          open={addTab}
          onClose={this.closeDialog}
          onSuccess={this.selectNewTab}
          dialogProps={this.dialogProps}
        />
      </>
    );
  };

  stickyChange = status => {
    this.setState({
      isSticky: status.status === Sticky.STATUS_FIXED,
    });
  };

  renderTabsButton = ({ openMenu, id }) => (
    <Item
      id={id}
      first
      onClick={openMenu}
      popper
      isPublic={this.props.isPublic}
    />
  );

  renderTabMenu = ({ closeMenu, tabId, isPrivate }) => (id, index) => (
    <GridItem key={id}>
      <Item
        id={id}
        variant={MENU_ITEM}
        isPublic={this.props.isPublic}
        closeMenu={closeMenu}
        onClick={this.handleClick({ index, id, isPrivate })}
        active={tabId === id}
      />
    </GridItem>
  );

  renderTabsMenu = ({ closeMenu, ids, tabId }) => (
    <GridContainer direction="column" spacing={0}>
      {ids.map(this.renderTabMenu({ closeMenu, tabId }))}

      <Hr quarter />

      {this.renderExecuteMenu({ closeMenu })}
    </GridContainer>
  );

  renderStickyTabs = () => {
    const { tabId, children } = this.props;

    return (
      <Popper
        halfPadding
        renderButton={this.renderTabsButton}
        id={tabId}
        ids={children}
        tabId={tabId}
        hiddenIntercom
      >
        {this.renderTabsMenu}
      </Popper>
    );
  };

  scrollToTop = () => {
    scroller.scrollTo('scrollToTop', scrollOptions);
  };

  renderStickyTourHeader = () => {
    const { classes, id, isPublic, disableRYI, smDown } = this.props;
    const { isSticky } = this.state;
    const hideChangeLayout = isSticky && smDown;
    const actions = LOGIC_HELPERS.ifElse(
      isPublic,
      <GridItem>
        <FloatingActions
          disableRYI={disableRYI}
          hideChangeLayout={hideChangeLayout}
        />
      </GridItem>,
      null,
    );

    return (
      <div
        className={classnames(classes.stickyTab, {
          [classes.publicStickyTab]: isPublic,
        })}
      >
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <Container padding={false}>
              <div>
                <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
                  <Hidden xsDown>
                    <GridItem className={classes.slideDown}>
                      <div className={classes.stickyItem}>
                        <GridContainer alignItems="center" wrap="nowrap">
                          <GridItem>
                            <JButton onClick={this.scrollToTop}>
                              <NodeProp
                                id={id}
                                valueKey={CONTENT}
                                isCustomData={false}
                                editable={false}
                                showEmpty
                                className={classes.content}
                                ellipsis
                                ellipsisClassName={classes.contentEllipsis}
                              />
                            </JButton>
                          </GridItem>
                          <GridItem>
                            <Star id={id} />
                          </GridItem>
                        </GridContainer>
                      </div>
                    </GridItem>
                  </Hidden>
                  <Hidden smUp>
                    <GridItem>
                      <JButton onClick={this.scrollToTop}>
                        <Icon icon="lnr-arrow-up" size="small" />
                      </JButton>
                    </GridItem>
                  </Hidden>
                  <GridItem>
                    <div className={classnames(classes.tabsButton)}>
                      {this.renderStickyTabs()}
                    </div>
                  </GridItem>
                  <GridItem xs />
                  {actions}
                  <GridItem>
                    <TemplateActionButtons
                      templateId={id}
                      buttonClassName={classes.actionButton}
                      spacing={0}
                      isPublic={isPublic}
                      onStiky={isSticky}
                    />
                  </GridItem>
                </GridContainer>
              </div>
            </Container>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  shouldShowMore = () => {
    const { hiddenIds, privateIds } = this.props;
    const { hiddenIndex } = this.state;
    let ids = hiddenIds;
    if (this.canExecuteTab()) {
      ids = ids.concat(privateIds);
    }
    if (!ids.length && hiddenIndex === -1) return false;
    return true;
  };

  // canDoSomething = () => ability.can('create', ACTIVITY);
  showHelp = () => () => {
    PORTAL_HELPERS.openHelpDialog(
      { data: HELP_DIALOG_ATTRIBUTES[HELP_DIALOG_KEYS.TAB_HELP] },
      this.props,
    );
    //  this.setState({ showHelp: val });
  };

  renderTabHelp = () => {
    const {
      editable,
      isPublic,
      smDown,
      classes,
      fetchingTemplate,
    } = this.props;

    if (editable || isPublic || !this.canExecuteTab() || fetchingTemplate)
      return null;
    if (smDown) {
      return (
        <GridItem className={smDown && classes.buttonHelpXs}>
          <Button
            icon="question"
            variant="outline"
            size="xxxs"
            onClick={this.showHelp(true)}
            weight="strong"
            color="#385898"
            iconButton
            tooltipProps={{ title: 'Tab Help' }}
            dense
            className={classes.helpBtn}
          />
        </GridItem>
      );
    }
    return (
      <TabItem
        last
        customClassName={classnames(
          smDown && classes.xsPaddingMore,
          classes.tabHelp,
        )}
      >
        <GridContainer alignItems="center" spacing={0} wrap="nowrap">
          <GridItem className={smDown && classes.buttonHelpXs}>
            <Button
              icon="question"
              variant="outline"
              size="xxxs"
              onClick={this.showHelp(true)}
              weight="strong"
              color="#385898"
              iconButton
              tooltipProps={{ title: 'Tab Help' }}
              dense
              className={classes.helpBtn}
            />
          </GridItem>
        </GridContainer>
      </TabItem>
    );
  };

  renderDefault = () => {
    const { classes, smDown, children, isPublic, editable } = this.props;
    const { computing } = this.state;
    return (
      <React.Fragment>
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          justify="space-between"
        >
          <GridItem>
            <GridContainer
              alignItems="center"
              wrap="nowrap"
              className={classnames(computing && classes.hidden)}
            >
              {children.map(this.renderItem)}

              {this.shouldShowMore() ? this.renderMore() : this.renderMenu()}
              {this.renderTabHelp()}
            </GridContainer>
          </GridItem>

          {!isPublic && (
            <GridItem>
              <ReactResizeDetector
                handleWidth
                onResize={this.handleResizeActionButtons}
              />
              <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
                <GridItem>
                  {editable && this.canDoSomething() && (
                    <GridContainer
                      spacing={0}
                      wrap="nowrap"
                      alignItems="center"
                    >
                      <GridItem>
                        <JButton onClick={this.addNewTab}>
                          <GridContainer
                            alignItems="center"
                            spacing={0}
                            wrap="nowrap"
                          >
                            <GridItem>
                              <Icon icon="lnr-plus" size="small" paddingRight />
                            </GridItem>
                            <GridItem>
                              <JText dark>
                                {LOGIC_HELPERS.ifElse(smDown, 'Tab', 'New tab')}
                              </JText>
                            </GridItem>
                          </GridContainer>
                        </JButton>
                      </GridItem>
                      <GridItem>
                        <JButton onClick={this.openManageTabs}>
                          <GridContainer
                            alignItems="center"
                            spacing={0}
                            wrap="nowrap"
                          >
                            <GridItem>
                              <Icon
                                icon="lnr-cog"
                                size="small"
                                paddingRight={!smDown}
                              />
                            </GridItem>
                            {!smDown && (
                              <GridItem>
                                <JText dark>Manage tabs</JText>
                              </GridItem>
                            )}
                          </GridContainer>
                        </JButton>
                      </GridItem>
                    </GridContainer>
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
          )}
        </GridContainer>
      </React.Fragment>
    );
  };

  renderMobile = () => {
    const {
      classes,
      children,
      tabId,
      isPublic,
      privateIds,
      hiddenIds,
      editable,
    } = this.props;
    const activeTab = children.indexOf(tabId);

    const isPrivateCount = !privateIds.length;
    const isOrganiserCount = !hiddenIds.length;
    const hideMenuMobile = editable || (!isPrivateCount || !isOrganiserCount);
    return (
      <React.Fragment>
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          justify="space-between"
          spacing={0}
          className={classes.marginOverFlow}
        >
          <GridItem xs className={classes.smTabs}>
            <Tabs
              className={classes.tabs}
              value={activeTab}
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {children.map((id, index) => this.renderItem(id, index))}
            </Tabs>
          </GridItem>
          {!isPublic && this.canDoSomething() && (
            <GridItem className={classes.buttonXs}>
              {hideMenuMobile && this.renderMenu()}
            </GridItem>
          )}
          {this.renderTabHelp()}
        </GridContainer>
      </React.Fragment>
    );
  };

  render = () => {
    const { classes, smDown } = this.props;
    const { isSticky } = this.state;

    return (
      <>
        <Sticky
          id="tabHeader"
          onStateChange={this.stickyChange}
          top="#stickyAppBar"
          innerZ={1089}
        >
          {isSticky ? (
            this.renderStickyTourHeader()
          ) : (
            <Container padding={false}>
              <div
                className={classnames(
                  classes.tab,
                  LOGIC_HELPERS.ifElse(smDown, classes.tabXS),
                )}
              >
                {smDown ? this.renderMobile() : this.renderDefault()}
              </div>

              {this.renderDialogs()}
            </Container>
          )}
        </Sticky>
      </>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number, // template id
  tabId: PropTypes.number,
  isPublic: PropTypes.bool,

  // resaga props
  children: PropTypes.array,
  privateIds: PropTypes.array,
  hiddenIds: PropTypes.array,
  ids: PropTypes.array,
  disableRYI: PropTypes.bool,
  editable: PropTypes.bool,
  fetchingTemplate: PropTypes.bool,
};

Header.defaultProps = {
  privateIds: [],
  children: [],
  ids: [],
  hiddenIds: [],
  isPublic: false,
  disableRYI: false,
  editable: false,
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  withRouter,
  resaga(CONFIG),
  withSMDown,
)(Header);
