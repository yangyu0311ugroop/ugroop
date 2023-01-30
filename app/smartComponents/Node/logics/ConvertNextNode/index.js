import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING } from 'appConstants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CHECKLISTS } from 'utils/modelConstants';
import { CONFIG } from './config';

export class ConvertNextNode extends PureComponent {
  componentWillMount = () => {
    const { nextNodeId } = this.props;

    // first count, + 1 if checked
    this.convertNextNode({ nextNodeId });
  };

  componentWillReceiveProps = nextProps => {
    const { nextNodeId } = this.props;

    // if it's unchecked then we need to do selected count - 1
    if (nextNodeId !== nextProps.nextNodeId) {
      return this.convertNextNode(nextProps);
    }

    return DO_NOTHING;
  };

  // { nextNodeId }
  convertNextNode = ({ nextNodeId }) =>
    NODE_API_HELPERS.convertNextNode(
      { nextNodeId, childKey: CHECKLISTS },
      this.props,
    );

  render = () => null;
}

ConvertNextNode.propTypes = {
  // hoc props

  // parent props

  // resaga props
  nextNodeId: PropTypes.number,
};

ConvertNextNode.defaultProps = {
  nextNodeId: 0,
};

export default compose(resaga(CONFIG))(ConvertNextNode);
