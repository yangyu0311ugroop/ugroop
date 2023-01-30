import { ability } from 'apis/components/Ability/ability';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';

export class DraggableNode extends PureComponent {
  componentWillMount = () => {
    const { type, createdBy } = this.props;

    this.node = { type, createdBy };
  };

  isDragDisabled = () => {
    const { editing, editable, isDragDisabled } = this.props;

    if (typeof isDragDisabled === 'function') {
      return isDragDisabled(this.props);
    }

    // return !(editing && editable) || !ability.can('update', this.node);
    return (
      isDragDisabled ||
      !(editing || editable) ||
      !ability.can('update', this.node)
    );
  };

  renderChildren = props => (provided, snapshot) => {
    const { children } = this.props;

    return LOGIC_HELPERS.ifFunction(
      children,
      [provided, props, snapshot],
      children,
    );
  };

  render = () => {
    const { id, index, type } = this.props;

    return (
      <Draggable
        draggableId={id}
        type={type}
        index={index}
        isDragDisabled={this.isDragDisabled()}
      >
        {this.renderChildren({
          ...this.props,
          draggable: !this.isDragDisabled(),
        })}
      </Draggable>
    );
  };
}

DraggableNode.propTypes = {
  // hoc props
  // resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.any,
  isDragDisabled: PropTypes.any,
  editing: PropTypes.bool,
  editable: PropTypes.bool,

  // resaga props
  type: PropTypes.string,
  createdBy: PropTypes.number,
};

DraggableNode.defaultProps = {};

export default compose(resaga(CONFIG))(DraggableNode);
