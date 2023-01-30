import { NODE_API, UPDATE_NODE } from 'apis/constants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TEMPLATE } from 'utils/modelConstants';
import { CONFIG } from './config';

export class CalculatedDuration extends PureComponent {
  componentDidMount = () => {
    const { childrenCount, duration } = this.props;

    if (childrenCount !== duration) {
      this.updateDuration(childrenCount);
    }
  };

  componentWillReceiveProps = nextProps => {
    const { childrenCount, duration } = nextProps;

    if (
      childrenCount !== this.props.childrenCount &&
      childrenCount !== duration
    ) {
      this.updateDuration(childrenCount);
    }
  };

  updateDuration = duration => {
    const { templateId, updatingNode } = this.props;

    if (!updatingNode) {
      this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
        payload: {
          nodeId: templateId,
          node: { type: TEMPLATE, customData: { duration } },
        },
      });
    }
  };

  render = () => null;
}

CalculatedDuration.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,

  // resaga props
  childrenCount: PropTypes.number,
  duration: PropTypes.number,
  updatingNode: PropTypes.bool,
};

CalculatedDuration.defaultProps = {};

export default compose(resaga(CONFIG))(CalculatedDuration);
