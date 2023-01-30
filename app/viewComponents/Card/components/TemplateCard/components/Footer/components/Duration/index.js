import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { P } from 'viewComponents/Typography';
import styles from './styles';

export class Duration extends PureComponent {
  render = () => {
    const { classes, duration } = this.props;

    return (
      <P className={classNames(classes.text, classes.duration)} dense>
        {duration} {duration > 1 ? 'Days' : 'Day'}
      </P>
    );
  };
}

Duration.propTypes = {
  // parent props
  duration: PropTypes.number,

  // hoc props
  classes: PropTypes.object.isRequired,
};

Duration.defaultProps = {
  duration: null,
};

export default withStyles(styles, { name: 'TemplateDuration' })(Duration);
