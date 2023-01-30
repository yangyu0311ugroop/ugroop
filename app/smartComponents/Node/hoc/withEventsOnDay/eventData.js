import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EventData extends PureComponent {
  componentDidMount() {
    if (this.props.type && this.props.subType) {
      this.props.collectData();
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.type !== this.props.type) {
      this.props.collectData();
    } else if (prevProps.subType !== this.props.subType) {
      this.props.collectData();
    } else if (prevProps.mode !== this.props.mode) {
      this.props.collectData();
    } else if (prevProps.timeZoneId !== this.props.timeZoneId) {
      this.props.collectData();
    } else if (prevProps.value !== this.props.value) {
      this.props.collectData();
    } else if (prevProps.position !== this.props.position) {
      this.props.collectData();
    } else if (prevProps.real !== this.props.real) {
      this.props.collectData();
    } else if (prevProps.dayCount !== this.props.dayCount) {
      this.props.collectData();
    } else if (prevProps.cancellation !== this.props.cancellation) {
      this.props.collectData();
    }
  }

  render() {
    return null;
  }
}

EventData.propTypes = {
  collectData: PropTypes.func,
  type: PropTypes.string,
  subType: PropTypes.string,
  mode: PropTypes.string,
  timeZoneId: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.string,
  real: PropTypes.bool,
  dayCount: PropTypes.number,
  cancellation: PropTypes.any,
};

export default EventData;
