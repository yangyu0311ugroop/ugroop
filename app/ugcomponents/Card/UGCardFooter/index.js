/**
 * Created by paulcedrick on 6/16/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './styles';

export const UGCardFooter = ({ classes, children, className }) => (
  <div className={classNames(classes.cardFooter, className)}>{children}</div>
);
UGCardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

UGCardFooter.defaultProps = {
  className: '',
};

export default withStyles(stylesheet, { name: 'UGCardFooter' })(UGCardFooter);
