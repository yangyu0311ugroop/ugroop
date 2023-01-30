import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

const stylesheet = {
  pageHeaderFixed: {
    marginTop: 75,
  },
  pageContainer: {
    margin: 0,
    padding: 0,
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'table',
    },
    '&:after': {
      content: '""',
      display: 'table',
      clear: 'both',
    },
  },
};

const AdminContainer = props => (
  <div
    className={classNames(
      props.classes.pageHeaderFixed,
      props.classes.pageContainer,
    )}
  >
    {props.children}
  </div>
);

AdminContainer.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
};

export default withStyles(stylesheet, { name: 'AdminContainer' })(
  AdminContainer,
);
