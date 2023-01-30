import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import momentjs from 'moment';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import { withEventsOnDay } from 'smartComponents/Node/hoc';
import { CONFIG } from './config';

export class FirstDayStartTime extends PureComponent {
  componentWillMount = () => {
    this.updateFirstDayStartTime(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const { id, startTime, firstEventTime } = this.props;

    if (
      id !== nextProps.id ||
      this.timeChanged(startTime, nextProps.startTime) ||
      this.timeChanged(firstEventTime, nextProps.firstEventTime)
    ) {
      this.updateFirstDayStartTime(nextProps);
    }
  };

  timeChanged = (time, nextTime) =>
    (time || nextTime) &&
    ((!time && nextTime) ||
      (time && !nextTime) ||
      !momentjs(time).isSame(nextTime));

  updateFirstDayStartTime = ({ startTime, firstEventId, firstEventTime }) => {
    if (!startTime) {
      return this.props.resaga.setValue({
        startTime: null,
        firstEventId: null,
      });
    }

    if (firstEventTime) {
      return this.props.resaga.setValue({
        startTime: momentjs(firstEventTime).toISOString(),
        firstEventId,
      });
    }

    return this.props.resaga.setValue({
      startTime: momentjs(startTime).toISOString(),
      firstEventId: null,
    });
  };

  render = () => null;
}

FirstDayStartTime.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  startTime: PropTypes.any,
  firstEventTime: PropTypes.any,
};

FirstDayStartTime.defaultProps = {
  startTime: '',
  firstEventTime: '',
};

export default compose(
  withEventsOnDay({ hasTime: NODE_HAS_TIMES.withTime }),
  resaga(CONFIG),
)(FirstDayStartTime);
