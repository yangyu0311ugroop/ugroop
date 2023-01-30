import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import style from './style';

export class ListRow extends React.PureComponent {
  render = () => {
    const { classes, children } = this.props;
    return children && <div className={classes.root}>{children}</div>;
  };
}

ListRow.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

ListRow.defaultProps = {
  children: null,
};

export default withStyles(style, { name: 'viewComponents/People/ListRow' })(
  ListRow,
);
