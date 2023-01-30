import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { CHECKLISTS } from 'utils/modelConstants';
import { ConvertNextNode } from '../index';

describe('<ConvertNextNode />', () => {
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
    rendered = shallow(<ConvertNextNode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ConvertNextNode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillMount()', () => {
    it('should call convertNextNode and updateSelected', () => {
      rendered.setProps({ nextNodeId: 2233 });
      instance.convertNextNode = jest.fn();

      instance.componentWillMount();

      expect(instance.convertNextNode).toBeCalledWith({ nextNodeId: 2233 });
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call convertNextNode', () => {
      rendered.setProps({ status: '1', nextNodeId: 2 });
      const nextProps = { status: '1', nextNodeId: 3 };

      instance.convertNextNode = jest.fn();

      instance.componentWillReceiveProps(nextProps);

      expect(instance.convertNextNode).toBeCalledWith(nextProps);
    });

    it('should call updateSelected', () => {
      rendered.setProps({ status: '1', nextNodeId: 2 });
      const nextProps = { status: '2', nextNodeId: 2 };

      instance.convertNextNode = jest.fn();

      instance.componentWillReceiveProps(nextProps);

      expect(instance.convertNextNode).not.toBeCalled();
    });
  });

  describe('convertNextNode()', () => {
    it('should call convertNextNode', () => {
      NODE_API_HELPERS.convertNextNode = jest.fn(() => 'convertNextNode');

      expect(instance.convertNextNode({ nextNodeId: 123 })).toBe(
        'convertNextNode',
      );

      expect(NODE_API_HELPERS.convertNextNode).toBeCalledWith(
        { nextNodeId: 123, childKey: CHECKLISTS },
        instance.props,
      );
    });
  });

  describe('render()', () => {
    it('should render null', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
