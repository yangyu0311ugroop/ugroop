import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Text, Select } from 'smartComponents/Inputs';
import inputs from 'smartComponents/Node/components/Seats/components/AddSeat/inputs';

import ParticipantSeats from 'smartComponents/Node/logics/ParticipantSeats';

import { CONFIG } from './config';
import styles from './styles';

export class SeatForm extends PureComponent {
  getValue = (targetValue, defaultValue = 0) => {
    const { mode } = this.props;
    if (mode === 'edit') return this.props[targetValue];

    return defaultValue;
  };

  render = () => {
    const { eventNodeId } = this.props;
    const participantId = this.getValue('participantId');

    return (
      <GridContainer alignItems="flex-end">
        <GridItem xs={12} md={4}>
          <Text
            value={this.getValue('seatNumber', undefined)}
            {...inputs.seatNumber}
          />
        </GridItem>
        <GridItem xs={12} md={8}>
          <ParticipantSeats eventNodeId={eventNodeId} selected={participantId}>
            {participants => (
              <Select
                value={participantId}
                options={participants}
                {...inputs.participant}
              />
            )}
          </ParticipantSeats>
        </GridItem>
      </GridContainer>
    );
  };
}

SeatForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  mode: PropTypes.string,
  eventNodeId: PropTypes.number,
  seatNodeId: PropTypes.number,

  // resaga props
  seatNumber: PropTypes.string,
  participantId: PropTypes.number,
};

SeatForm.defaultProps = {
  mode: 'add',
  seatNumber: '',
  participantId: 0,
};

export default compose(
  withStyles(styles, { name: 'SeatForm' }),
  resaga(CONFIG),
)(SeatForm);
