import React from 'react';
import H5 from 'components/H5';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const stylesheet = {
  root: {
    display: 'flex',
  },
  text: {
    fontWeight: 600,
  },
};

export const SuggestItem = ({ mainText, secondaryText, classes }) => (
  <div className={classes.root}>
    <H5 className={classes.text}>
      {mainText} <small>{secondaryText}</small>
    </H5>
  </div>
);

SuggestItem.propTypes = {
  classes: PropTypes.object.isRequired,
  mainText: PropTypes.string,
  secondaryText: PropTypes.string,
};

export default withStyles(stylesheet, { name: 'SuggestItem' })(SuggestItem);
