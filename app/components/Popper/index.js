import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import resaga from 'resaga';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  ClickAwayListener,
  makeStyles,
  Popper as MuiPopper,
} from 'components/material-ui/index';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import isFunction from 'lodash/isFunction';
import { CONFIG } from './config';
import styles from './styles';
import { useGlobalContext } from '../../containers/App/globalStateContext';
export PopperMenuItem from './components/MenuItem';

const useStyles = makeStyles(styles);
export function Popper(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    menuEl: null,
    blockOpening: false,
  });
  let blockOpeningTimeout = null;
  const {
    children,
    quarterPadding,
    stopPropagation,
    onClick,
    onClose,
    onExit,
    closeOnClickAway,
    menuHeader,
    halfPadding,
    noPadding,
    className,
    placement,
    disablePortal,
    fullWidth,
    open,
    debounceMs,
    anchorEl,
    onOpenPortal,
  } = props;

  const [, globalDispatch] = useGlobalContext();
  const anchorElFn = () => anchorEl || state.menuEl;
  const anchor = anchorElFn();
  const handleClickOutside = () => {
    hideIntercom(false);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return function cleanup() {
      clearTimeout(blockOpeningTimeout);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, []);

  const hideIntercom = status => {
    globalDispatch.setIntercomButtonHide(status);
  };

  const openMenu = event => {
    const { blockOpening } = state;
    if (stopPropagation) {
      event.stopPropagation();
    }

    if (!blockOpening) {
      setState({ menuEl: event.currentTarget });
      LOGIC_HELPERS.ifFunction(onClick, [{ open: true }]);
    }
  };

  const closeMenu = (event = null) => {
    // support legacy code
    if (typeof onClose === 'function') {
      return onClose(event);
    }

    if (event) {
      event.stopPropagation();
    }

    blockOpeningTimeout = setTimeout(
      () => setState({ blockOpening: false }),
      300,
    );

    LOGIC_HELPERS.ifFunction(onClick, [{ open: false }]);
    LOGIC_HELPERS.ifFunction(onExit);
    return setState({ menuEl: null, blockOpening: true });
  };

  const handleClickAway = event => {
    if (closeOnClickAway) {
      return setTimeout(() => closeMenu(event), 100);
    }

    return DO_NOTHING;
  };

  const openDialog = () => {
    hideIntercom(true);
    const portalId = PORTAL_HELPERS.openPopperDialog({ renderPopper }, props);
    if (isFunction(onOpenPortal)) {
      onOpenPortal(portalId);
    }
  };

  const renderButtonFn = () => {
    // eslint-disable-next-line no-shadow
    const {
      renderButton: rb,
      smDown,
      disableFullScreen,
      dark,
      ...rest
    } = props;
    const anchorOpen = Boolean(anchorElFn());
    const button = LOGIC_HELPERS.ifFunction(rb, [
      {
        debounceMs,
        ...rest,
        openMenu: smDown && !disableFullScreen ? openDialog : openMenu,
        closeMenu,
        open: anchorOpen,
        isDialog: smDown && !disableFullScreen,
      },
    ]);
    return (
      <span
        className={classnames(
          anchorOpen && classes.buttonActive,
          LOGIC_HELPERS.ifElse([dark, anchorOpen], classes.buttonActiveDark),
        )}
      >
        {button}
      </span>
    );
  };

  const renderMenuHeader = () => {
    if (!menuHeader) return null;

    return (
      <GridItem>
        <div
          className={classnames(
            classes.menuHeader,
            LOGIC_HELPERS.ifElse(halfPadding, classes.menuHeaderHalfPadding),
            LOGIC_HELPERS.ifElse(noPadding, classes.menuHeaderNoPadding),
          )}
        >
          {menuHeader}
        </div>
      </GridItem>
    );
  };

  const renderPopper = ({ closeMenu: closeMenuPri } = {}) => {
    const {
      className: cn,
      children: cl,
      halfPadding: hp,
      noPadding: np,
      quarterPadding: qp,
      smDown,
      disableFullScreen,
      ...rest
    } = props;
    const popper = LOGIC_HELPERS.ifFunction(
      children,
      [
        {
          classes,
          debounceMs,
          ...rest,
          closeMenu: closeMenuPri || closeMenu,
        },
      ],
      children,
    );
    return (
      <div
        className={classnames(classes.root, classes.popper, className, {
          [classes.halfPadding]: halfPadding,
          [classes.noPadding]: noPadding,
          [classes.quarterPadding]: quarterPadding,
          [classes.dialog]: smDown && !disableFullScreen,
          // [classes.placementBottom]: placement === 'bottom',
        })}
      >
        <GridContainer direction="column" spacing={0}>
          {renderMenuHeader()}
          <GridItem
            className={classnames(
              smDown && !disableFullScreen && classes.mobilePopper,
            )}
          >
            {popper}
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  if (props.smDown && !props.disableFullScreen) {
    return renderButtonFn();
  }

  return (
    <Fragment>
      {renderButtonFn()}
      <MuiPopper
        open={open && Boolean(anchor)}
        anchorEl={anchor}
        onClose={closeMenu}
        className={classnames(className, classes.topIndex)}
        placement={placement}
        disablePortal={disablePortal}
        style={
          fullWidth &&
          anchor && {
            width: anchor.clientWidth,
          }
        }
      >
        <ClickAwayListener
          onClickAway={handleClickAway}
          mouseEvent="onMouseDown"
        >
          {renderPopper()}
        </ClickAwayListener>
      </MuiPopper>
    </Fragment>
  );
}

Popper.propTypes = {
  // hoc props
  smDown: PropTypes.bool,
  anchorEl: PropTypes.any,
  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  renderButton: PropTypes.func,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  onExit: PropTypes.func,
  onOpenPortal: PropTypes.func,

  // rendering
  children: PropTypes.any,
  menuHeader: PropTypes.any,

  // customisable props
  placement: PropTypes.string,
  className: PropTypes.string,
  closeOnClickAway: PropTypes.bool,
  halfPadding: PropTypes.bool,
  quarterPadding: PropTypes.bool,
  noPadding: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  disablePortal: PropTypes.bool,
  disableFullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  open: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  dark: PropTypes.bool,
  debounceMs: PropTypes.number,
};

Popper.defaultProps = {
  placement: 'bottom',
  closeOnClickAway: true,
  open: true,
  debounceMs: 100,
  disableFullScreen: false,
};

export default compose(
  resaga(CONFIG),
  withSMDown,
)(Popper);
