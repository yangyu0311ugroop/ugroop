import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  withStyles,
} from 'components/material-ui';
import styles from './styles';

export class PlanHeader extends PureComponent {
  render() {
    const { classes, interval, onChange } = this.props;
    return (
      <FormControl component="fieldset" className={classes.root}>
        <RadioGroup
          aria-label="interval"
          name="interval"
          value={interval}
          onChange={onChange}
          className={classes.radioGroup}
        >
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="Pay Monthly"
            className={classes.label}
          />
          <FormControlLabel
            value="year"
            control={<Radio />}
            label="Pay Yearly"
            className={classes.label}
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

PlanHeader.propTypes = {
  classes: PropTypes.object.isRequired,

  onChange: PropTypes.func,
  interval: PropTypes.string,
};

PlanHeader.defaultProps = {
  interval: 'month',
};

export default withStyles(styles, { name: 'PlanHeader' })(PlanHeader);
