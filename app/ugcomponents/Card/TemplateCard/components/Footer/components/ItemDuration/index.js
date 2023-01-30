/**
 * Created by paulcedrick on 6/21/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './styles';

export const ItemDuration = ({ classes, duration }) => {
  const durationSuffix = duration > 1 ? 'Days' : 'Day';

  return (
    <div className={classes.ugDuration}>
      <p className={classes.text}>
        {duration} {durationSuffix}
      </p>
    </div>
  );
};

ItemDuration.propTypes = {
  duration: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

ItemDuration.defaultProps = {
  duration: null,
};

export default withStyles(stylesheet, { name: 'ItemDuration' })(ItemDuration);
