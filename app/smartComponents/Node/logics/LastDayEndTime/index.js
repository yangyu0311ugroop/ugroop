import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import momentjs from 'moment';
import { CONFIG } from './config';

export class LastDayEndTime extends PureComponent {
  componentWillMount = () => {
    this.updateLastDayEndTime(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const { id, endTime } = this.props;

    if (id !== nextProps.id || this.timeChanged(endTime, nextProps.endTime)) {
      this.updateLastDayEndTime(nextProps);
    }
  };

  timeChanged = (time, nextTime) =>
    (time || nextTime) &&
    ((!time && nextTime) ||
      (time && !nextTime) ||
      !momentjs(time).isSame(nextTime));

  updateLastDayEndTime = ({ endTime }) => {
    if (!endTime) {
      return this.props.resaga.setValue({ endTime: null });
    }

    return this.props.resaga.setValue({
      endTime: momentjs(endTime).toISOString(),
    });
  };

  render = () => null;
}

LastDayEndTime.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  endTime: PropTypes.any,
};

LastDayEndTime.defaultProps = {
  endTime: '',
};

export default compose(resaga(CONFIG))(LastDayEndTime);
