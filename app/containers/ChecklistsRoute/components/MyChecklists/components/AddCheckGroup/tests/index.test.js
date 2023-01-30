import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AddCheckGroup } from '../index';

describe('<AddCheckGroup />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<AddCheckGroup {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddCheckGroup).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('addCheckGroup()', () => {
    it('should return DO_NOTHING', () => {
      expect(instance.addCheckGroup({ content: null })).toBe(DO_NOTHING);
    });

    it('should call NODE_API_HELPERS.createNode', () => {
      global.prompt = jest.fn(() => 'content');
      NODE_API_HELPERS.createNode = jest.fn(() => 'createNode');
      rendered.setProps({ parentNodeId: 12, lastNodeId: 223 });

      expect(instance.addCheckGroup({ content: 'some input' })).toBe(
        'createNode',
      );

      expect(NODE_API_HELPERS.createNode).toBeCalled();
      expect(NODE_API_HELPERS.createNode.mock.calls).toMatchSnapshot();
    });
    it('should call NODE_API_HELPERS.update', () => {
      global.prompt = jest.fn(() => 'content');
      NODE_API_HELPERS.updateNode = jest.fn(() => 'updateNode');
      rendered.setProps({ parentNodeId: 12, lastNodeId: 223, id: 1 });

      expect(instance.addCheckGroup({ content: 'some input' })).toBe(
        'updateNode',
      );

      expect(NODE_API_HELPERS.updateNode).toBeCalled();
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
  });
  describe('Open/Cloase Dialog()', () => {
    it('openDialog should return true when openAddDialog is called', () => {
      instance.openAddDialog({ stopPropagation: jest.fn() });
      expect(rendered.state().openDialog).toBe(true);
    });

    it('openDialog should return false when handleClose is called', () => {
      instance.handleClose();
      expect(rendered.state().openDialog).toBe(false);
    });
  });
  describe('onSuccessAdd', () => {
    it('resaga.setvalue is called', () => {
      instance.onSuccessAdd({});
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ simple: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render edit checklist group correctly', () => {
      rendered.setProps({ id: 1 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
