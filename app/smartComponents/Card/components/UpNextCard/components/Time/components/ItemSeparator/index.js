import { withStyles } from '@material-ui/core/styles';
import Hr from 'components/Hr';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { moment } from 'utils';
import { CONFIG } from './config';
import styles from './styles';

export class ItemSeparator extends PureComponent {
  isSameDay = () => {
    const { createdAt, previousCreatedAt } = this.props;

    if (!previousCreatedAt) {
      return false;
    }

    return moment.isSameDay(createdAt, previousCreatedAt);
  };

  render = () => {
    const { index } = this.props;

    return index !== 0 || this.isSameDay() ? <Hr /> : null;
  };
}

ItemSeparator.propTypes = {
  // hoc props

  // parent props
  index: PropTypes.number,
  createdAt: PropTypes.string,
  previousCreatedAt: PropTypes.string,

  // resaga props
};

ItemSeparator.defaultProps = {
  index: 0,
  createdAt: '',
  previousCreatedAt: '',
};

export default compose(
  withStyles(styles, { name: 'ItemSeparator' }),
  resaga(CONFIG),
)(ItemSeparator);
