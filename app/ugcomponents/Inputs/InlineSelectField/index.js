/**
 * Created by stephenkarpinskyj on 24/5/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from 'ugcomponents/Inputs/SelectField';

const style = {
  select: {
    paddingTop: 0,
    paddingBottom: 0,
    margin: '0px 4px',
    color: '#47943c',
  },
};

export class InlineSelectField extends PureComponent {
  render = () => {
    const {
      classes,
      type,
      helperText,
      label, // eslint-disable-line react/prop-types
      fullWidth, // eslint-disable-line react/prop-types
      ...props
    } = this.props;
    const hidden = type === 'hidden';
    return (
      <span>
        {!hidden && helperText}
        <Select
          type={type}
          fullWidth={false}
          disableUnderline
          selectClassName={classes.select}
          {...props}
        />
      </span>
    );
  };
}

InlineSelectField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  helperText: PropTypes.any,
  disabled: PropTypes.bool,
};

InlineSelectField.defaultProps = {
  type: null,
  value: '',
  onChange: null,
  helperText: '',
  disabled: false,
};

export default withStyles(style, { name: 'InlineSelectField' })(
  InlineSelectField,
);
