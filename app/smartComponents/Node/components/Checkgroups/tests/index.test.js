import { OPTION, CHECK_INPUT } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Checkgroups } from '../index';

describe('<Checkgroups />', () => {
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
    rendered = shallow(<Checkgroups {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checkgroups).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      const params = {
        variant: OPTION,
        id: 123,
        index: 22,
        content: 'some node',
        nodeContent: 'Organisation Tours',
      };
      const snapshot = shallow(<div>{instance.renderBody(params)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderBody if personal', () => {
      const params = {
        variant: OPTION,
        id: 123,
        index: 22,
        content: 'some node',
        nodeContent: 'Person Root Folder',
      };
      const snapshot = shallow(<div>{instance.renderBody(params)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderBody if personal', () => {
      const params = {
        variant: OPTION,
        id: 123,
        index: 22,
        nodeContent: 'Person Root Folder',
      };
      const snapshot = shallow(<div>{instance.renderBody(params)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should return no data', () => {
      rendered.setProps({ parentChecklists: [] });
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderContent', () => {
      const params = {
        variant: OPTION,
        parentChecklists: [1],
        parentNodeId: 9922,
      };
      rendered.setProps(params);
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderContent blank', () => {
      const params = {
        variant: OPTION,
        parentChecklists: [],
        parentNodeId: 9922,
      };
      rendered.setProps(params);
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderContent blank', () => {
      const params = {
        variant: CHECK_INPUT,
        parentChecklists: [],
        parentNodeId: 9922,
      };
      rendered.setProps(params);
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('stickyChange()', () => {
    it('state should return true', () => {
      instance.stickyChange('');
      expect(rendered.state().isSticky).toEqual(false);
    });
  });
  describe('handleChange()', () => {
    it('state should return true', () => {
      instance.handleChange(true)();
      expect(rendered.state().showAll).toEqual(true);
    });
  });
  describe('renderHeaderOption()', () => {
    it('should render correctly', () => {
      rendered.setProps({ parentChecklists: [1], showOption: true });
      rendered.setState({ showAll: false });
      const snapshot = shallow(<div>{instance.renderHeaderOption()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ parentChecklists: [3, 2, 1], selectedId: 999 });
      rendered.setState({ isSticky: true });
      const snapshot = shallow(<div>{instance.renderHeaderOption()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.render()).toBe('renderContent');
    });
    it('should render correctly', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.render()).toBe('renderContent');
    });
  });
});
