import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AddCheckitem } from '../index';

describe('<AddCheckitem />', () => {
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

    rendered = shallow(<AddCheckitem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddCheckitem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleTextChange()', () => {
    it('should setState content', () => {
      instance.handleTextChange('some content');

      expect(rendered.state().content).toBe('some content');
    });
  });

  describe('createNode()', () => {
    it('should DO_NOTHING if no content', () => {
      instance.discardAddItem = jest.fn();

      expect(instance.createNode({})).toBe(DO_NOTHING);
      expect(instance.discardAddItem).toBeCalledWith();
    });
    it('should DO_NOTHING if no content', () => {
      // instance.discardAddItem = jest.fn();
      instance.setState({ loading: true });
      expect(instance.createNode({ content: 'some value' })).toBe(DO_NOTHING);
    });

    it('should DO_NOTHING if creatingNode', () => {
      instance.creatingNode = jest.fn(() => true);

      expect(instance.createNode({ content: 'some content' })).toBe(DO_NOTHING);
    });

    it('should call NODE_API_HELPERS.createNode', () => {
      NODE_API_HELPERS.createNode = jest.fn(() => 'createNode');
      instance.creatingNode = jest.fn(() => false);
      rendered.setProps({ parentNodeId: 12, lastNodeId: 23 });

      expect(instance.createNode({ content: 'content' })).toBe('createNode');
      expect(NODE_API_HELPERS.createNode).toBeCalled();
      expect(NODE_API_HELPERS.createNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('createNodeSuccess()', () => {
    it('should resetForm', () => {
      const resetForm = jest.fn();
      instance.content = { focus: jest.fn() };

      instance.createNodeSuccess(resetForm)();

      expect(resetForm).toBeCalledWith();
      expect(instance.content.focus).toBeCalledWith();
    });

    it('should call NODE_API_HELPERS.deleteTempNode if there is a hashkey', () => {
      NODE_API_HELPERS.deleteTempNode = jest.fn(() => 'deleteTempNode');
      instance.content = { focus: jest.fn() };
      const resetForm = jest.fn();

      instance.createNodeSuccess(resetForm, 1, 'hashkey')();
      expect(NODE_API_HELPERS.deleteTempNode).toBeCalled();
    });

    it('should call NODE_API_HELPERS.deleteTempNode with DO_NOTHING as onSuccess if there is no hashkey', () => {
      NODE_API_HELPERS.deleteTempNode = jest.fn(() => 'deleteTempNode');
      instance.content = { focus: jest.fn() };
      const resetForm = jest.fn();

      instance.createNodeSuccess(resetForm, 1, null)();
      expect(NODE_API_HELPERS.deleteTempNode).not.toBeCalled();
    });
  });

  describe('creatingNode()', () => {
    it('should return true #1', () => {
      rendered.setProps({ creatingChild: true });
      expect(instance.creatingNode()).toBe(true);
    });

    it('should return true #2', () => {
      rendered.setProps({ creatingNext: true });
      expect(instance.creatingNode()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ creatingChild: false, creatingNext: false });
      expect(instance.creatingNode()).toBe(false);
    });
  });

  describe('focusAddItem()', () => {
    it('should setState', () => {
      instance.focusAddItem();

      expect(rendered.state().focusAddItem).toBe(true);
    });
  });

  describe('onErrorHandle()', () => {
    it('should setState', () => {
      instance.onErrorHandle();

      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('discardAddItem()', () => {
    it('should setState', () => {
      // instance.form = { resetForm: 1 };
      instance.form = { resetForm: () => 1 };
      instance.content = { blur: jest.fn() };
      instance.discardAddItem();

      expect(rendered.state().focusAddItem).toBe(false);
    });

    it('should call NODE_API_HELPERS.deleteTempNode if there is a hashkey', () => {
      NODE_API_HELPERS.deleteTempNode = jest.fn(() => 'deleteTempNode');
      instance.form = { resetForm: () => 1 };
      instance.content = { blur: jest.fn() };
      rendered.setProps({
        hashkey: 'hashkey',
        parentNodeId: 1,
      });

      instance.discardAddItem();
      expect(NODE_API_HELPERS.deleteTempNode).toBeCalled();
    });
  });

  describe('clickAwayAddItem()', () => {
    it('should DO_NOTHING', () => {
      rendered.setState({ content: 'someContent' });
      expect(instance.clickAwayAddItem()).toBe(DO_NOTHING);
    });

    it('should discardAddItem', () => {
      instance.discardAddItem = jest.fn(() => 'discardAddItem');
      rendered.setState({ content: '' });

      expect(instance.clickAwayAddItem()).toBe('discardAddItem');
      expect(instance.discardAddItem).toBeCalledWith();
    });
  });

  describe('handleRef()', () => {
    it('should set to this', () => {
      instance.handleRef('hi')(123);

      expect(instance.hi).toBe(123);
    });
  });

  describe('mouseEnterAddItem()', () => {
    it('should setState', () => {
      instance.mouseEnterAddItem();

      expect(rendered.state().addItemHover).toBe(true);
    });
  });

  describe('mouseLeaveAddItem()', () => {
    it('should setState', () => {
      instance.mouseLeaveAddItem();

      expect(rendered.state().addItemHover).toBe(false);
    });
  });

  describe('renderAddCheckButtons()', () => {
    it('should return null #1', () => {
      rendered.setState({ focusAddItem: false });

      expect(instance.renderAddCheckButtons()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setState({ focusAddItem: true, content: false });

      expect(instance.renderAddCheckButtons()).toBe(null);
    });

    it('should return null #3', () => {
      rendered.setState({ content: false });

      expect(instance.renderAddCheckButtons()).toBe(null);
    });

    it('should renderAddCheckButtons', () => {
      rendered.setState({ focusAddItem: true, content: 'content' });

      const snapshot = shallow(<div>{instance.renderAddCheckButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderAddCheckButtons = jest.fn(() => 'renderAddCheckButtons');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
