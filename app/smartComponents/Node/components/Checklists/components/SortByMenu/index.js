import { withStyles } from '@material-ui/core/styles';
import { ASC, CREATED_AT, DESC, DUE_DATE, PERCENTAGE } from 'appConstants';
import classnames from 'classnames';
import GridItem from 'components/GridItem/index';
import { Divider, MenuItem } from 'components/material-ui';
import Popper from 'components/Popper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class SortByMenu extends PureComponent {
  state = {
    anchorEl: null,
    blockOpening: false,
  };

  componentWillUnmount = () => {
    clearTimeout(this.blockOpening);
  };

  openMoreMenu = event => {
    const { blockOpening } = this.state;
    this.stopPropagation(event);

    if (!blockOpening) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  closeMoreMenu = event => {
    this.stopPropagation(event);
    this.setState({ anchorEl: null });

    this.blockOpening = setTimeout(
      () => this.setState({ blockOpening: false }),
      100,
    );
    return this.setState({ blockOpening: true });
  };

  stopPropagation = event => event.stopPropagation();

  handleSortBy = (sortBy, order) => event => {
    this.closeMoreMenu(event);

    this.props.resaga.setValue({ sortBy, order });
  };

  renderMenuItem = (sortBy, order) => {
    const { classes, currentSortBy, currentOrder } = this.props;

    const selected = LOGIC_HELPERS.ifElse(
      [currentSortBy === sortBy, currentOrder === order],
      true,
      false,
    );
    const text = this.renderSortByText(sortBy, order);

    return (
      <MenuItem
        className={classnames(
          classes.menuItem,
          LOGIC_HELPERS.ifElse(selected, classes.menuItemSelected),
        )}
        onClick={this.handleSortBy(sortBy, order)}
      >
        <span
          className={classnames(
            classes.menuItemText,
            LOGIC_HELPERS.ifElse(selected, classes.menuItemTextSelected),
          )}
        >
          {text}
        </span>
      </MenuItem>
    );
  };

  renderSortByText = (sortBy, order) => {
    switch (sortBy) {
      case CREATED_AT:
        return order === DESC ? 'Newest' : 'Oldest';
      case DUE_DATE:
        return order === DESC ? 'Last due' : 'Earliest due';
      case PERCENTAGE:
        return order === DESC ? 'Highest completion %' : 'Lowest completion %';
      default:
        return '';
    }
  };

  renderOtherItem = () => (
    <React.Fragment>
      {this.renderMenuItem(DUE_DATE, ASC)}
      {this.renderMenuItem(DUE_DATE, DESC)}
      {this.renderMenuItem(PERCENTAGE, DESC)}
      {this.renderMenuItem(PERCENTAGE, ASC)}
    </React.Fragment>
  );

  render = () => {
    const {
      classes,
      currentSortBy,
      currentOrder,
      showList,
      isTemplate,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <GridItem>
        <InlineButton
          padding="md"
          color="secondary"
          onClick={this.openMoreMenu}
        >
          Sort {LOGIC_HELPERS.ifElse(showList, ':', ' ')}{' '}
          <b>
            {showList && this.renderSortByText(currentSortBy, currentOrder)}
          </b>{' '}
          <Icon size="xsmall" icon="lnr-chevron-down" />
        </InlineButton>
        <Popper
          noPadding
          anchorEl={anchorEl}
          placement="bottom-end"
          onClose={this.closeMoreMenu}
        >
          <div>
            <MenuItem
              disableRipple
              onClick={this.stopPropagation}
              className={classes.menuItemHeader}
            >
              <div className={classes.menuHeader}>Sort by</div>
            </MenuItem>
            <Divider />
            {this.renderMenuItem(CREATED_AT, DESC)}
            {this.renderMenuItem(CREATED_AT, ASC)}
            {isTemplate && this.renderOtherItem()}
          </div>
        </Popper>
      </GridItem>
    );
  };
}

SortByMenu.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  showList: PropTypes.bool,

  // parent props
  isTemplate: PropTypes.bool,

  // resaga props
  currentSortBy: PropTypes.string,
  currentOrder: PropTypes.string,

  // customisable props
};

SortByMenu.defaultProps = {
  showList: true,
  isTemplate: true,
};

export default compose(
  withStyles(styles, { name: 'SortByMenu' }),
  resaga(CONFIG),
)(SortByMenu);
