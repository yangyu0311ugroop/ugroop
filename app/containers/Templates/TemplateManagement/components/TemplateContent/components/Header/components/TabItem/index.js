import { DEFAULT, MENU_ITEM, TAB } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import MenuButton from 'components/Popper/components/MenuButton';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TAB_GALLERY, TAB_PEOPLE, TAB_TIMELINE } from 'utils/modelConstants';
import { Tab } from '@material-ui/core';
import {
  ONLY_ME,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import truncate from 'lodash/truncate';
import { CONFIG, TEMPLATE_ID_CONFIG } from './config';
import styles from './styles';

export class TabItem extends PureComponent {
  renderLayout = () => {
    const { classes, isPublic } = this.props;

    return (
      <GridItem>
        <div className={classes.smallSubtitle}>
          <LayoutSelect isPublic={isPublic} simple />
        </div>
      </GridItem>
    );
  };

  renderTabTimeLine = () => (
    <GridContainer alignItems="center" wrap="nowrap">
      <GridItem>{this.renderContent()}</GridItem>
      {this.renderLayout()}
    </GridContainer>
  );

  renderGallery = () => {
    const { classes, ids } = this.props;

    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        wrap="nowrap"
        justify="space-between"
      >
        <GridItem>{this.renderContent()}</GridItem>
        {ids.length > 0 && (
          <GridItem>
            <div className={classes.badge}>{ids.length}</div>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderValue = (value = '') => {
    const maxLength = 25;
    if (value.length < maxLength) return value;
    const content = truncate(value, {
      length: maxLength,
    });
    return content; // `${content}...`;
  };

  renderContent = () => {
    const {
      classes,
      content: value,
      variant,
      active,
      isMobile,
      first,
      last,
    } = this.props;

    const toolTip = LOGIC_HELPERS.ifElse(
      this.isOnlyOrgTab(),
      'Organisers Only',
      'Only Me',
    );
    const icon = LOGIC_HELPERS.ifElse(
      this.isOnlyMeTab(),
      'lnr-lock',
      'lnr-users',
    );
    const iconProps = {
      icon,
      bold: true,
      size: 'xsmall',
      color: LOGIC_HELPERS.ifElse(this.isOnlyOrgTab(), 'blue', 'danger'),
    };
    const wrapItem = isMobile || variant === MENU_ITEM;
    const content = wrapItem || active ? value : this.renderValue(value);

    if (this.isOnlyMeTab() || this.isOnlyOrgTab()) {
      return (
        <GridContainer spacing={0} noWrap>
          {variant !== MENU_ITEM && (
            <GridItem>
              <div title={toolTip}>
                <Icon
                  {...iconProps}
                  className={classnames(
                    classes.halfPaddingRight,
                    this.isOnlyOrgTab() && classes.rBlue,
                  )}
                />
              </div>
            </GridItem>
          )}
          <GridItem>
            <JText
              ellipsis={wrapItem}
              className={classnames(
                LOGIC_HELPERS.ifElse(variant !== TAB, classes.maxWidth),
                LOGIC_HELPERS.ifElse(
                  [isMobile, last, first],
                  classes.noMaxWidth,
                ),
              )}
            >
              {content}
            </JText>
          </GridItem>
          {variant === MENU_ITEM && (
            <GridItem>
              <div title={toolTip}>
                <Icon
                  {...iconProps}
                  paddingLeft
                  className={classnames(this.isOnlyOrgTab() && classes.rBlue)}
                />
              </div>
            </GridItem>
          )}
        </GridContainer>
      );
    }

    return (
      <JText
        ellipsis={wrapItem}
        className={classnames(
          LOGIC_HELPERS.ifElse(variant !== TAB, classes.maxWidth),
          LOGIC_HELPERS.ifElse([isMobile, last, first], classes.noMaxWidth),
        )}
      >
        {content}
      </JText>
    );
  };

  renderPeople = () => {
    const { calculatedPeopleCount, classes } = this.props;

    return (
      <GridContainer alignItems="center" spacing={0} wrap="nowrap">
        <GridItem xs>{this.renderContent()}</GridItem>
        {LOGIC_HELPERS.ifElse(
          calculatedPeopleCount > 0,
          <GridItem>
            <div className={classes.badge}>{calculatedPeopleCount}</div>
          </GridItem>,
          null,
        )}
      </GridContainer>
    );
  };

  renderTab = () => {
    const { type, children, subtype } = this.props;

    if (children) return children;

    if (subtype === TAB_PEOPLE) {
      return this.renderPeople();
    }

    if (type === TAB_TIMELINE) {
      return this.renderTabTimeLine();
    }

    if (type === TAB_GALLERY) {
      return this.renderGallery();
    }

    return this.renderContent();
  };

  renderTabItem = () => {
    const {
      classes,
      active,
      onClick,
      hover,
      customClassName,
      last,
      isMobile,
      first,
    } = this.props;
    return (
      <Tab
        label={
          <MenuButton
            className={classnames(
              classes.root,
              classes.noPadding,
              active && classes.activeTab,
            )}
          >
            {this.renderTab()}
          </MenuButton>
        }
        className={classnames(
          classes.nowrap,
          classes.tabItem,
          LOGIC_HELPERS.ifElse(active, classes.active),
          LOGIC_HELPERS.ifElse([!active, hover], classes.hover),
          LOGIC_HELPERS.ifElse(last, classes.lastTab),
          LOGIC_HELPERS.ifElse([isMobile, last, first], classes.noMaxWidth),
          customClassName,
        )}
        onClick={onClick}
      />
    );
    /* return (
      <GridContainer
        alignItems="center"
        onClick={onClick}
        spacing={0}
        className={classnames(last && classes.fullWidth, classes.tabItem)}
        justify="center"
      >
        <GridItem>
          <Tab
            label={label}
            className={classnames(
              classes.nowrap,
              // classes.tabItem,
              LOGIC_HELPERS.ifElse(active, classes.active),
              LOGIC_HELPERS.ifElse([!active, hover], classes.hover),
              LOGIC_HELPERS.ifElse(last, classes.lastTab),
              customClassName,
            )}
          />
        </GridItem>
      </GridContainer>
    ); */
  };

  isOnlyMeTab = () => this.props.sharedWith === ONLY_ME;

  isOnlyOrgTab = () => this.props.sharedWith === ORGANISERS;

  renderDefault = () => {
    const {
      classes,
      first,
      last,
      active,
      dense,
      onClick,
      popper,
      hover,
      customClassName,
    } = this.props;
    return (
      <GridContainer alignItems="center" onClick={onClick} spacing={0}>
        <GridItem>
          <MenuButton
            className={classnames(
              classes.root,
              classes.nowrap,
              LOGIC_HELPERS.ifElse(first, classes.first),
              LOGIC_HELPERS.ifElse(last, classes.last),
              LOGIC_HELPERS.ifElse(active, classes.active),
              LOGIC_HELPERS.ifElse(dense, classes.dense),
              LOGIC_HELPERS.ifElse([!active, hover], classes.hover),
              customClassName,
            )}
          >
            <GridContainer alignItems="center" spacing={0}>
              <GridItem xs>{this.renderTab()}</GridItem>
              {popper && (
                <GridItem>
                  <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
                </GridItem>
              )}
            </GridContainer>
          </MenuButton>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    if (variant === MENU_ITEM) {
      return this.renderTab();
    }

    return LOGIC_HELPERS.switchCase(variant, {
      [MENU_ITEM]: this.renderTab,
      [TAB]: this.renderTabItem,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TabItem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.node,
  first: PropTypes.bool,
  last: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,

  // resaga props
  ids: PropTypes.array,
  content: PropTypes.string,
  type: PropTypes.string,
  calculatedPeopleCount: PropTypes.number,
  subtype: PropTypes.string,

  // custom
  variant: PropTypes.string,
  dense: PropTypes.bool,
  popper: PropTypes.bool,
  hover: PropTypes.bool,
  isPublic: PropTypes.bool,
  customClassName: PropTypes.string,
  sharedWith: PropTypes.string,
  isMobile: PropTypes.bool,
};

TabItem.defaultProps = {
  ids: [],
  hover: true,
  calculatedPeopleCount: 0,
};

export default compose(
  withStyles(styles, { name: 'TabItem' }),
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG),
)(TabItem);
