import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ResetEventData extends PureComponent {
  componentDidMount() {
    if (this.props.eventIds && this.props.eventIds.length === 0) {
      this.props.setEvents([]);
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.eventIds.length === 0) {
      this.props.setEvents([]);
    }
  }

  render() {
    return null;
  }
}

ResetEventData.propTypes = {
  setEvents: PropTypes.func,
  eventIds: PropTypes.array,
};

export default ResetEventData;
