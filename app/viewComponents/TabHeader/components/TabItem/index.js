import omit from 'lodash/omit';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';

import styles from './styles';

export const TabItem = ({
  classes,
  label,
  className,
  noBackgroundColor,
  hideItem,
  ...props
}) => {
  const otherProps = omit(props, ['tabId', 'classes']);
  const customClasses = {
    root: classes.rootPrimarySelected,
    textColorPrimary: classes.label,
    selected: classes.selected,
  };
  return (
    <Tab
      classes={customClasses}
      label={label}
      className={classnames(
        classes.tabItem,
        { [classes.tabItemNoColor]: noBackgroundColor },
        { [classes.hidden]: hideItem },
        className,
      )}
      {...otherProps}
    />
  );
};

TabItem.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  noBackgroundColor: PropTypes.bool,
  hideItem: PropTypes.bool,
};

TabItem.defaultProps = {
  label: '',
  className: '',
  noBackgroundColor: false,
  hideItem: false,
};

export default withStyles(styles, { name: 'TabItem' })(TabItem);
