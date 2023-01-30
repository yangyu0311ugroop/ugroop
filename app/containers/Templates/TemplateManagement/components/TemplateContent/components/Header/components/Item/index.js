import { MENU_ITEM, TAB } from 'appConstants';
import { withStyles } from 'components/material-ui';
import MenuItem from 'components/Popper/components/MenuItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TabItem from '../TabItem';
import { CONFIG } from './config';
import styles from './styles';

export class Item extends PureComponent {
  handleResize = width => {
    const { id, onResize } = this.props;

    LOGIC_HELPERS.ifFunction(onResize, [id, width]);
  };

  renderContent = (params = {}) => {
    const {
      id,
      first,
      last,
      active,
      hover,
      dense,
      popper,
      onClick,
      variant,
      isPublic,
      isMobile,
    } = this.props;

    return (
      <TabItem
        id={id}
        first={first}
        last={last}
        active={active}
        onClick={onClick}
        dense={dense}
        popper={popper}
        hover={hover}
        variant={variant}
        isPublic={isPublic}
        isMobile={isMobile}
        {...params}
      />
    );
  };

  renderMenuItem = () => {
    const { closeMenu, onClick, active } = this.props;

    return (
      <MenuItem closeMenu={closeMenu} onClick={onClick} selected={active}>
        {this.renderContent({ first: true, dense: true, hover: false })}
      </MenuItem>
    );
  };

  renderTab = () => this.renderContent();

  render = () => {
    const { variant } = this.props;

    // if (status === HIDDEN) {
    //   return null;
    // }

    if (variant === MENU_ITEM) {
      return this.renderMenuItem();
    }
    if (variant === TAB) {
      return this.renderTab();
    }

    return (
      <div>
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
        {this.renderContent()}
      </div>
    );
  };
}

Item.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  onResize: PropTypes.func,
  closeMenu: PropTypes.func,
  onClick: PropTypes.func,
  variant: PropTypes.string,

  // resaga props
  id: PropTypes.number,
  status: PropTypes.string,

  // custom
  first: PropTypes.bool,
  last: PropTypes.bool,
  active: PropTypes.bool,
  dense: PropTypes.bool,
  popper: PropTypes.bool,
  hover: PropTypes.bool,
  isPublic: PropTypes.bool,
  isMobile: PropTypes.bool,
};

Item.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Item' }),
  resaga(CONFIG),
)(Item);
