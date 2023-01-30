import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField';

// inspiration from reddit text field
const useStylesOutline = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fff',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:hover': {
      backgroundColor: '#fff',
    },

    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `rgba(131,192,253,.5) 0 0 0 2px`,
      borderColor: '#0070c9',
    },
  },
  focused: {},
  disabled: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
}));

export function FilledVTextField(props) {
  const { InputProps, ...rest } = props;

  const classes = useStylesOutline();

  return (
    <ValidationTextField
      InputProps={{ ...InputProps, classes, disableUnderline: true }}
      variant="filled"
      {...rest}
    />
  );
}

FilledVTextField.propTypes = {
  // hoc props

  // parent props
  InputProps: PropTypes.object,

  // resaga props
};

FilledVTextField.defaultProps = {
  InputProps: {},
};

export function FilledTextField(props) {
  const { InputProps, ...rest } = props;

  const classes = useStylesOutline();

  return (
    <TextField
      InputProps={{ ...InputProps, classes, disableUnderline: true }}
      variant="filled"
      fullWidth
      {...rest}
    />
  );
}

FilledTextField.propTypes = {
  // hoc props

  // parent props
  InputProps: PropTypes.object,

  // resaga props
};

FilledTextField.defaultProps = {
  InputProps: {},
};
