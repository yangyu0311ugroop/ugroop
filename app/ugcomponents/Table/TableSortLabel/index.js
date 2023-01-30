import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableSortLabel as MTableSortLabel } from '@material-ui/core';
import Icon from 'viewComponents/Icon';
import Loading from 'react-loading';
import PropTypes from 'prop-types';
import styles from './styles';

export const TableSortLabel = ({
  classes,
  children,
  showIcon,
  sort,
  isLoading,
  ...props
}) => {
  const sortIcon =
    sort === 'asc' ? (
      <Icon icon="chevron-down" className={classes.ownIcon} size="extraSmall" />
    ) : (
      <Icon icon="chevron-up" className={classes.ownIcon} />
    );
  const iconWithLoading = isLoading ? (
    <Loading type="spin" width={16} height={24} className={classes.ownIcon} />
  ) : (
    sortIcon
  );
  const iconToBeShowed = showIcon ? iconWithLoading : '';
  return (
    <MTableSortLabel
      classes={{
        icon: classes.icon,
      }}
      {...props}
    >
      {children}
      {iconToBeShowed}
    </MTableSortLabel>
  );
};

TableSortLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  sort: PropTypes.string,
  showIcon: PropTypes.bool,
  isLoading: PropTypes.bool,
};

TableSortLabel.defaultProps = {
  sort: 'asc',
  showIcon: false,
  children: '',
  isLoading: false,
};

export default withStyles(styles, { name: 'TableSortLabel' })(TableSortLabel);
