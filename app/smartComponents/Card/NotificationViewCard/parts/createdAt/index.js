import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { moment } from 'utils';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

export class CreatedAt extends PureComponent {
  render = () => {
    const { classes, createdAt } = this.props;
    return (
      <div className={classnames(classes.time)}>
        {moment.renderTime(createdAt)}
      </div>
    );
  };
}

CreatedAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  createdAt: PropTypes.string,
};

CreatedAt.defaultProps = {
  createdAt: '',
};

export default compose(
  withStyles(styles, { name: 'CreatedAt' }),
  resaga(CONFIG),
)(CreatedAt);
