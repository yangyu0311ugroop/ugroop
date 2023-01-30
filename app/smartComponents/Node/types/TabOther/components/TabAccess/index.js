import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import MenuButton from 'components/Popper/components/MenuButton';
import MenuItem from 'components/Popper/components/MenuItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  ACCESS_LEVEL,
  ONLY_ME,
  ORGANISERS,
  PUBLIC,
  ACCESS_VARIANTS,
  SHOW,
  HIDE,
  PRINT_MODE,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT } from 'appConstants';
import Tooltip, { DEFAULT_ENTER_DELAY } from 'viewComponents/Tooltip';
import { get } from 'lodash';
import { CONFIG } from './config';
import styles from './styles';

export class TabAccess extends PureComponent {
  changeTabAccess = value => () => {
    const {
      id,
      type,
      me,
      createdBy,
      sharedWith,
      variant,
      printMode,
    } = this.props;

    if (
      LOGIC_HELPERS.ifElse(this.isPrint(), printMode, sharedWith) === value &&
      createdBy === me
    )
      return null;

    const node = {
      type,
      [ACCESS_VARIANTS[variant]]: value,
      createdBy: me,
    };

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node,
      },
      onSuccess: this.changeAccessSuccess,
    });
  };

  changeAccessSuccess = (result, payload) => {
    const { history, location } = this.props;
    const { pathname } = location;

    const {
      nodeId,
      node: { sharedWith },
    } = payload;

    if (sharedWith !== PUBLIC) {
      history.push(`${pathname}?tabId=${nodeId}`);
    }
  };

  getValue = () => {
    const { sharedWith, printMode } = this.props;
    return LOGIC_HELPERS.ifElse(this.isPrint(), printMode, sharedWith);
  };

  renderButton = ({ open, openMenu }) => {
    const {
      showPublic,
      sharedWith,
      simple,
      component: Component,
      editable,
      classes,
    } = this.props;

    const value = this.getValue();

    const disabled = this.isPrint() && sharedWith !== PUBLIC && sharedWith;
    const iconHide = this.getProp('icon', HIDE, PRINT_MODE);
    const icon = disabled ? iconHide : this.getProp('icon', value);
    const label = this.getProp('title', value);
    const title = this.getProp('label', value);
    const iconColor =
      sharedWith === PUBLIC || !sharedWith
        ? null
        : LOGIC_HELPERS.ifElse(
            sharedWith === ORGANISERS,
            classes.iconOrg,
            classes.iconPrivate,
          );

    if (simple) {
      if (!showPublic && sharedWith === PUBLIC) {
        return null;
      }

      const privateButton = (
        <Tooltip
          title={classnames(!open && title)}
          isLight
          enterDelay={DEFAULT_ENTER_DELAY}
          placement="top"
        >
          <GridContainer
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={0}
            wrap="nowrap"
            className={classes.noWrap}
          >
            <GridItem>
              <Icon icon={icon} size="xsmall" className={iconColor} />
            </GridItem>
            {editable && (
              <GridItem>
                <Icon icon="lnr-chevron-down" size="xxsmall" paddingLeft />
              </GridItem>
            )}
          </GridContainer>
        </Tooltip>
      );

      if (!editable) {
        return <Component>{privateButton}</Component>;
      }

      return (
        <Component>
          <MenuButton onClick={openMenu} disabled={disabled}>
            {privateButton}
          </MenuButton>
        </Component>
      );
    }

    if (!editable) {
      return (
        <Component>
          <Tooltip title={`Shared with: ${label}`} isLight>
            <Icon icon={icon} size="small" />
          </Tooltip>
        </Component>
      );
    }

    return (
      <Component>
        <MenuButton onClick={openMenu} disabled={disabled}>
          <Tooltip
            title={classnames(!open && title)}
            isLight
            enterDelay={DEFAULT_ENTER_DELAY}
            placement="top"
          >
            <GridContainer
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={0}
              wrap="nowrap"
              className={classes.noWrap}
            >
              <GridItem>
                <Icon icon={icon} size="small" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-chevron-down" size="xxsmall" paddingLeft />
              </GridItem>
            </GridContainer>
          </Tooltip>
        </MenuButton>
      </Component>
    );
  };

  renderPrivateMenu = ({ closeMenu, sharedWith }) => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={LOGIC_HELPERS.ifElse(
              [!sharedWith, sharedWith === PUBLIC],
              true,
              false,
              true,
            )}
            alignItems="baseline"
            icon="lnr-earth"
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.changeTabAccess(PUBLIC)}
          >
            <GridContainer direction="column" spacing={0} wrap="nowrap">
              <GridItem>
                <span className={classes.menuHeading}>
                  {ACCESS_LEVEL[PUBLIC].title}
                </span>
              </GridItem>
              <GridItem>
                <span className={classes.menuSubtitle}>
                  {ACCESS_LEVEL[PUBLIC].description}
                </span>
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={sharedWith === ORGANISERS}
            alignItems="baseline"
            icon="lnr-users2"
            iconClassName={classnames(classes.menuIcon, classes.iconOrg)}
            closeMenu={closeMenu}
            onClick={this.changeTabAccess(ORGANISERS)}
          >
            <GridContainer direction="column" spacing={0} wrap="nowrap">
              <GridItem>
                <div className={classes.menuHeading}>
                  {ACCESS_LEVEL[ORGANISERS].title}
                </div>
              </GridItem>
              <GridItem>
                <div className={classes.menuSubtitle}>
                  {ACCESS_LEVEL[ORGANISERS].description}
                </div>
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={sharedWith === ONLY_ME}
            alignItems="baseline"
            icon="lnr-lock"
            iconClassName={classnames(classes.menuIcon, classes.iconPrivate)}
            closeMenu={closeMenu}
            onClick={this.changeTabAccess(ONLY_ME)}
          >
            <GridContainer direction="column" spacing={0} wrap="nowrap">
              <GridItem>
                <span className={classes.menuHeading}>
                  {ACCESS_LEVEL[ONLY_ME].title}
                </span>
              </GridItem>
              <GridItem>
                <span className={classes.menuSubtitle}>
                  {ACCESS_LEVEL[ONLY_ME].description}
                </span>
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  isPrint = () => this.props.variant === ACCESS_VARIANTS.printMode;

  getProp = (prop, value, grp) => {
    const groupArr =
      grp || LOGIC_HELPERS.ifElse(this.isPrint(), PRINT_MODE, ACCESS_LEVEL);
    const defaultLabel = LOGIC_HELPERS.ifElse(
      this.isPrint(),
      'Print mode',
      'Shared with',
      'Shared with',
    );
    if (prop === 'label') {
      return `${defaultLabel}: ${get(groupArr[value], 'title')}`;
    }
    return get(groupArr[value], prop);
  };

  renderPrintModeMenu = ({ closeMenu }) => {
    const { classes, printMode } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={LOGIC_HELPERS.ifElse(
              [!printMode, printMode === SHOW],
              true,
              false,
              true,
            )}
            alignItems="baseline"
            icon={PRINT_MODE[SHOW].icon}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.changeTabAccess(SHOW)}
          >
            <GridContainer direction="column" spacing={0} wrap="nowrap">
              <GridItem>
                <span className={classes.menuHeading}>
                  {PRINT_MODE[SHOW].title}
                </span>
              </GridItem>
              <GridItem>
                <span className={classes.menuSubtitle}>
                  {PRINT_MODE[SHOW].description}
                </span>
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={printMode === HIDE}
            alignItems="baseline"
            icon={PRINT_MODE[HIDE].icon}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.changeTabAccess(HIDE)}
          >
            <GridContainer direction="column" spacing={0} wrap="nowrap">
              <GridItem>
                <span className={classes.menuHeading}>
                  {PRINT_MODE[HIDE].title}
                </span>
              </GridItem>
              <GridItem>
                <span className={classes.menuSubtitle}>
                  {PRINT_MODE[HIDE].description}
                </span>
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderPrintMode = () => {
    const { classes, printMode, sharedWith } = this.props;

    return (
      <Popper
        noPadding
        renderButton={this.renderButton}
        printMode={printMode}
        sharedWith={sharedWith}
        stopPropagation
        className={classes.privateMenu}
        menuHeader="Print view option"
      >
        {this.renderPrintModeMenu}
      </Popper>
    );
  };

  renderDefault = () => {
    const { classes, sharedWith, smDown } = this.props;

    return (
      <Popper
        noPadding
        renderButton={this.renderButton}
        sharedWith={sharedWith}
        stopPropagation
        className={smDown ? classes.privateMenuSmDown : classes.privateMenu}
        menuHeader="Who can see this tab?"
      >
        {this.renderPrivateMenu}
      </Popper>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ACCESS_VARIANTS.sharedWith]: this.renderDefault,
      [ACCESS_VARIANTS.printMode]: this.renderPrintMode,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TabAccess.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  simple: PropTypes.bool,
  editable: PropTypes.bool,
  component: PropTypes.any,
  variant: PropTypes.string,

  // resaga props
  me: PropTypes.number,
  createdBy: PropTypes.number,
  type: PropTypes.string,
  sharedWith: PropTypes.string,
  printMode: PropTypes.string,

  // custom props
  showPublic: PropTypes.bool,
};

TabAccess.defaultProps = {
  component: 'span',

  sharedWith: PUBLIC, // public by default
  showPublic: false, // hide public icon by default
  variant: ACCESS_VARIANTS.sharedWith,
  printMode: SHOW,
};

export default compose(
  withStyles(styles, { name: 'TabAccess' }),
  withRouter,
  resaga(CONFIG),
  withSMDown,
)(TabAccess);
