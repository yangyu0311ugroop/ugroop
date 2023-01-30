/**
 * Created by stephenkarpinskyj on 14/4/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DragDropContext } from '..';

describe('<DragDropContext />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const dragStart = {
    draggableId: 1,
    source: { droppableId: 2, index: 3 },
    type: 'TYPE',
  };
  const dropResult = {
    draggableId: 1,
    source: { droppableId: 2, index: 3 },
    destination: { droppableId: 4, index: 5 },
    type: 'TYPE',
  };

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
  });

  beforeEach(() => {
    wrapper = shallow(
      <DragDropContext {...makeProps()}>
        <div />
      </DragDropContext>,
    );
    instance = wrapper.instance();
    doResagaSnapshot = true;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DragDropContext).toBeDefined();
  });

  describe('#convertDragStart()', () => {
    it('converts dragStart', () => {
      expect(instance.convertDragStart(dragStart)).toEqual({
        dragStartDraggableId: dragStart.draggableId,
        dragStartDroppableId: dragStart.source.droppableId,
        dragStartIndex: dragStart.source.index,
        dragStartType: dragStart.type,
      });
    });
  });

  describe('#handleDragStart()', () => {
    it('still matches snapshot', () => {
      instance.handleDragStart(dragStart);
    });
  });

  describe('#convertDropResult()', () => {
    it('converts dropResult', () => {
      expect(instance.convertDropResult(dropResult)).toEqual({
        dropDraggableId: dropResult.draggableId,
        dropSourceDroppableId: dropResult.source.droppableId,
        dropSourceIndex: dropResult.source.index,
        dropDestinationDroppableId: dropResult.destination.droppableId,
        dropDestinationIndex: dropResult.destination.index,
        dropType: dropResult.type,
      });
    });
  });

  describe('#dropHadEffect()', () => {
    it('returns true if dropped somewhere not where it was dragged from', () => {
      expect(instance.dropHadEffect(dropResult)).toEqual(true);
    });
    it('returns false if no drop has no destination', () => {
      const result = {
        draggableId: 1,
        source: { droppableId: 2, index: 3 },
        type: 'TYPE',
      };
      expect(instance.dropHadEffect(result)).toEqual(false);
    });
    it('returns false if dropped at same place it was dragged from', () => {
      const result = {
        draggableId: 1,
        source: { droppableId: 2, index: 3 },
        destination: { droppableId: 2, index: 3 },
        type: 'TYPE',
      };
      expect(instance.dropHadEffect(result)).toEqual(false);
    });
  });

  describe('#handleDragEnd()', () => {
    it('still matches snapshot if drop had effect', () => {
      instance.handleDragEnd(dropResult);
    });
    it('still matches snapshot if drop had no effect', () => {
      const result = {
        draggableId: 1,
        source: { droppableId: 2, index: 3 },
        destination: { droppableId: 2, index: 3 },
        type: 'TYPE',
      };
      instance.handleDragEnd(result);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
