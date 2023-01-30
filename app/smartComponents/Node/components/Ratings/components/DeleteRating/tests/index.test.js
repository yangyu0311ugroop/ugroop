import { NODE_API, REMOVE_NODE_AND_LINKS } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RATINGS } from 'utils/modelConstants';
import { DeleteRating } from '../index';

describe('<DeleteRating />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<DeleteRating {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DeleteRating).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleRemoveSuccess', () => {
    it('should call onClose', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });

      instance.handleRemoveSuccess();

      expect(onClose).toBeCalled();
    });
  });

  describe('handleClick', () => {
    it('should call dispatch to', () => {
      rendered.setProps({
        id: 1,
        participantId: 2,
        parentNodeId: 3,
      });
      instance.handleRemoveSuccess = 'handleRemoveSuccess';
      instance.handleClick();

      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_API,
        REMOVE_NODE_AND_LINKS,
        {
          payload: {
            id: 1,
            fk: 2,
            parentNodeId: 3,
            childKey: RATINGS,
            nextNodeChildKey: RATINGS,
          },
          onSuccess: 'handleRemoveSuccess',
        },
      );
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
