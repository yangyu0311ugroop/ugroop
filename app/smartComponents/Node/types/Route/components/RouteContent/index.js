import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { CONFIG } from './config';
import styles from './styles';

export class RouteContent extends PureComponent {
  render = () => {
    const {
      classes,
      originIndex,
      destinationIndex,
      distance,
      className,
    } = this.props;

    return (
      <div className={classnames(classes.subtitle, className)}>
        #{originIndex + 1} to #{destinationIndex + 1}:{' '}
        {destinationIndex - originIndex + 1} days
        {distance > 0 && <>, {ROUTE_HELPERS.renderDistance(distance)}</>}
      </div>
    );
  };
}

RouteContent.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  originIndex: PropTypes.number,
  destinationIndex: PropTypes.number,
  distance: PropTypes.number,
  className: PropTypes.string,

  // resaga props
};

RouteContent.defaultProps = {
  originIndex: 0,
  destinationIndex: 0,
};

export default compose(
  withStyles(styles, { name: 'RouteContent' }),
  resaga(CONFIG),
)(RouteContent);
