import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { ACTIVE } from 'appConstants';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { CONFIG } from './config';

export class TourStatus extends PureComponent {
  componentDidMount = () => {
    const { intervalMs } = this.props;

    this.getTreeAndTimes();
    this.updateTime = setInterval(this.updateTimeHandler, intervalMs);
  };

  componentWillReceiveProps = nextProps => {
    const { id, startTime, children, layoutRecheck } = this.props;

    if (!id && nextProps.id) {
      this.getTreeAndTimes(nextProps);
    } else if (
      id !== nextProps.id ||
      layoutRecheck !== nextProps.layoutRecheck ||
      (startTime && !nextProps.startTime) ||
      (!startTime && nextProps.startTime) ||
      momentjs(startTime).diff(nextProps.startTime) ||
      nextProps.children.length !== children.length
    ) {
      this.updateStatus(nextProps);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.updateTime);
  };

  getTreeAndTimes = (props = this.props) => {
    const { id, onSuccess } = props;

    NODE_API_HELPERS.getTreeAndTimes(
      { id, onSuccess },
      { resaga: this.props.resaga },
    );
  };

  updateTimeHandler = () => {
    this.updateStatus(this.props);
  };

  status = ({ startTime, children }) => {
    const duration = children && children.length ? children.length - 1 : 0;

    const endTime = momentjs(startTime)
      .add(duration, 'day')
      .hour(23)
      .minute(59)
      .second(59);

    return MOMENT_HELPERS.tourStatus(startTime, endTime);
  };

  updateStatus = props => {
    const { layout, status: currentStatus } = this.props;

    const status = this.status(props);
    const ongoing = status === ACTIVE;

    if (status === currentStatus && layout) return null;

    let setValue = { ongoing, status };

    if (!layout && props.layoutRecheck) {
      setValue = {
        ...setValue,
        layout: LOGIC_HELPERS.ifElse(ongoing, 'day', 'list'),
      };
    }

    return this.props.resaga.setValue(setValue);
  };

  render = () => null;
}

TourStatus.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number, // tab timeline id
  intervalMs: PropTypes.number,

  // resaga props
  layoutRecheck: PropTypes.number,
  children: PropTypes.array,
  startTime: PropTypes.string,
  layout: PropTypes.string,
  status: PropTypes.string,
};

TourStatus.defaultProps = {
  children: [],
  intervalMs: 30 * 1000, // update every 30s for now, could be smarter
};

export default compose(resaga(CONFIG))(TourStatus);
