import { DO_NOTHING } from 'appConstants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ALL_CHECKLISTS, CHECKITEMS_STATUS } from './config';

export class RemainingTasks extends PureComponent {
  componentDidMount = () => {
    const { percentage } = this.props;

    this.updatePercentage(percentage);
  };

  componentWillReceiveProps = nextProps => {
    const { percentage } = this.props;

    if (percentage !== nextProps.percentage) {
      this.updatePercentage(nextProps.percentage);
    }
  };

  updatePercentage = percentage => {
    const { id } = this.props;

    if (!Array.isArray(id)) {
      return this.props.resaga.setValue({ percentage });
    }

    return DO_NOTHING;
  };

  render = () => {
    const {
      children,
      remaining,
      completed,
      percentage,
      total,
      status,
    } = this.props;

    return children({
      remaining,
      completed,
      percentage,
      total,
      status,
    });
  };
}

RemainingTasks.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  children: PropTypes.func.isRequired,

  // resaga props
  remaining: PropTypes.number,
  completed: PropTypes.number,
  percentage: PropTypes.number,
  total: PropTypes.number,
  status: PropTypes.string,
};

RemainingTasks.defaultProps = {
  id: 0,
  remaining: 0,
  completed: 0,
  percentage: 0,
  total: 0,
};

export default compose(
  resaga(ALL_CHECKLISTS), // step 1: get all checkitem IDs
  resaga(CHECKITEMS_STATUS), // step 2: get all statuses then count outstanding and completed
)(RemainingTasks);
