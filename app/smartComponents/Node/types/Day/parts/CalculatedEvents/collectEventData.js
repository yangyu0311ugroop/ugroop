import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class CollectEventData extends PureComponent {
  componentDidMount() {
    if (this.props.eventSubType && this.props.eventSubType) {
      this.props.collectData();
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.eventType !== this.props.eventType) {
      this.props.collectData();
    } else if (prevProps.eventSubType !== this.props.eventSubType) {
      this.props.collectData();
    } else if (prevProps.startValue !== this.props.startValue) {
      this.props.collectData();
    } else if (prevProps.startMode !== this.props.startMode) {
      this.props.collectData();
    } else if (prevProps.startTimeZone !== this.props.startTimeZone) {
      this.props.collectData();
    } else if (prevProps.startTimeReal !== this.props.startTimeReal) {
      this.props.collectData();
    } else if (prevProps.endValue !== this.props.endValue) {
      this.props.collectData();
    } else if (prevProps.endMode !== this.props.endMode) {
      this.props.collectData();
    } else if (prevProps.endTimeZone !== this.props.endTimeZone) {
      this.props.collectData();
    } else if (prevProps.endTimeReal !== this.props.endTimeReal) {
      this.props.collectData();
    } else if (prevProps.cancellation !== this.props.cancellation) {
      this.props.collectData();
    }
  }

  render() {
    return null;
  }
}

CollectEventData.propTypes = {
  cancellation: PropTypes.object,
  startValue: PropTypes.string,
  startMode: PropTypes.string,
  startTimeZone: PropTypes.string,
  startTimeReal: PropTypes.bool,
  endValue: PropTypes.string,
  endMode: PropTypes.string,
  endTimeZone: PropTypes.string,
  endTimeReal: PropTypes.bool,
  eventType: PropTypes.string,
  eventSubType: PropTypes.string,
  collectData: PropTypes.func,
};

export default CollectEventData;
