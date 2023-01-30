import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';

import SeatForm from '../SeatForm';
import { CONFIG } from './config';
import styles from './styles';

export class SeatDialog extends PureComponent {
  renderHeading = ({ renderCloseButton }) => {
    const { mode } = this.props;

    if (mode === 'add') {
      return (
        <>
          <Title heading="Add Seat" headingBackground="Seat" />
          {renderCloseButton()}
        </>
      );
    }

    return (
      <>
        <Title heading="Edit Seat" headingBackground="Seat" />
        {renderCloseButton()}
      </>
    );
  };

  render = () => (
    <DialogForm
      open={this.props.open}
      renderHeader={this.renderHeading}
      onClose={this.props.onClose}
      onCancel={this.props.onClose}
      onSubmit={this.props.onSubmit}
      loading={this.props.loading}
      renderFooter={this.props.renderFooter}
      size={SIZE_CONSTANTS.SM}
    >
      <SeatForm
        seatNodeId={this.props.seatNodeId}
        eventNodeId={this.props.eventNodeId}
        mode={this.props.mode}
      />
    </DialogForm>
  );
}

SeatDialog.propTypes = {
  // hoc props

  // parent props
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  mode: PropTypes.string,
  eventNodeId: PropTypes.number,
  seatNodeId: PropTypes.number,
  renderFooter: PropTypes.func,

  // resaga props
};

SeatDialog.defaultProps = {
  open: false,
  loading: false,
  mode: 'add',
  renderFooter: null,
};

export default compose(
  withStyles(styles, { name: 'SeatDialog' }),
  resaga(CONFIG),
)(SeatDialog);
