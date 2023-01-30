import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import RouteCard from './components/RouteCard';
import { CONFIG } from './config';
import styles from './styles';

export class Routes extends PureComponent {
  render = () => <RouteCard {...this.props} />;
}

Routes.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
};

Routes.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Routes' }),
  resaga(CONFIG),
)(Routes);
