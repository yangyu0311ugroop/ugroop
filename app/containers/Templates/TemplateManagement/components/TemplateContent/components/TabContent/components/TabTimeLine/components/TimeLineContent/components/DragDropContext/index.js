/**
 * Created by stephenkarpinskyj on 5/4/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragDropContext as DDContext } from 'react-beautiful-dnd';
import resaga from 'resaga';

import { ON_DRAG_START, ON_DRAG_END } from 'appConstants';
import upsertHelpers from 'utils/helpers/upsertStore';
import { CONFIG } from './config';

export class DragDropContext extends PureComponent {
  convertDragStart = ({ draggableId, source, type }) => ({
    dragStartDraggableId: draggableId,
    dragStartDroppableId: source.droppableId,
    dragStartIndex: source.index,
    dragStartType: type,
  });

  handleDragStart = dragStart => {
    const startObj = { [dragStart.type]: this.convertDragStart(dragStart) };
    this.props.resaga.setValue({
      [ON_DRAG_START]: upsertHelpers.object(startObj, true),
    });
  };

  convertDropResult = ({ draggableId, source, destination, type }) => ({
    dropDraggableId: draggableId,
    dropSourceDroppableId: Number(source.droppableId),
    dropSourceIndex: source.index,
    dropDestinationDroppableId: Number(destination.droppableId),
    dropDestinationIndex: destination.index,
    dropType: type,
  });

  dropHadEffect = dropResult =>
    !!dropResult.destination &&
    (dropResult.source.index !== dropResult.destination.index ||
      dropResult.source.droppableId !== dropResult.destination.droppableId);

  handleDragEnd = dropResult => {
    const setValueObj = {};

    const startObj = { [dropResult.type]: null };
    setValueObj[ON_DRAG_START] = upsertHelpers.object(startObj, true);

    if (this.dropHadEffect(dropResult)) {
      const endObj = { [dropResult.type]: this.convertDropResult(dropResult) };
      setValueObj[ON_DRAG_END] = upsertHelpers.object(endObj, true);
    }

    this.props.resaga.setValue({ ...setValueObj });
  };

  render = () => {
    const { children } = this.props;
    return (
      <DDContext
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >
        {children}
      </DDContext>
    );
  };
}

DragDropContext.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  children: PropTypes.node.isRequired,

  // resaga value
};

export default compose(resaga(CONFIG))(DragDropContext);
