import { withStyles } from 'components/material-ui';
import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class GridItem extends PureComponent {
  render = () => {
    const {
      classes,
      item,
      children,
      grow,
      className,
      clickable,
      ...rest
    } = this.props;

    return (
      <Grid
        item
        className={classnames(
          LOGIC_HELPERS.ifElse(grow, classes.grow),
          LOGIC_HELPERS.ifElse(clickable, classes.clickable),
          className,
        )}
        {...rest}
      >
        {children}
      </Grid>
    );
  };
}

GridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  grow: PropTypes.bool,
  item: PropTypes.bool,
  className: PropTypes.string,
  clickable: PropTypes.bool,
};
export default withStyles(styles, { name: 'GridItem' })(GridItem);
