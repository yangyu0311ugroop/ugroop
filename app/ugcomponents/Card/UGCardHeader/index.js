/**
 * Created by paulcedrick on 6/15/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './styles';

export const UGCardHeader = ({ children, className, classes }) => (
  <div className={classNames(classes.root, className)}>{children}</div>
);

UGCardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

UGCardHeader.defaultProps = {
  className: '',
};

export default withStyles(stylesheet, { name: 'UGCardHeader' })(UGCardHeader);
