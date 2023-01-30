import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EditableSeat } from 'smartComponents/Node/components/Seats';

import { CONFIG } from './config';
import styles from './styles';

export class Seat extends PureComponent {
  renderRow = () => {
    const { id } = this.props;
    return <EditableSeat id={id} />;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderRow,
    });
  };
}

Seat.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,

  // resaga props
};

Seat.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Seat' }),
  resaga(CONFIG),
)(Seat);
