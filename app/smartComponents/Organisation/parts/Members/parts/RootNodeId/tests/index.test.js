import { DO_NOTHING, INVALID_ROOT_NODE_ID } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import theme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { RootNodeId } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('DateFormat', styles, theme);

describe('<RootNodeId />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(),
  };

  const props = {
    classes: mockStyles,
    resaga,
    intl,
    history: { push: () => {} },
  };

  beforeEach(() => {
    rendered = shallow(<RootNodeId {...props}>Node</RootNodeId>);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(RootNodeId).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('setupPersonalTours()', () => {
    it('should call dispatchTo', () => {
      rendered.setProps({ rootNodeId: 0 });

      instance.setupPersonalTours();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ rootNodeId: 2323 });

      expect(instance.setupPersonalTours()).toBe(DO_NOTHING);
    });
  });

  describe('getStrippedOwnProps()', () => {
    it('should toMatchSnapshot', () => {
      expect(instance.getStrippedOwnProps()).toMatchSnapshot();
    });
  });

  describe('redirectToRootNodeId()', () => {
    it('should call history.push', () => {
      const history = { push: jest.fn() };
      rendered.setProps({ url: '/some/url/', history });

      instance.redirectToRootNodeId({ rootNodeId: 2233 });

      expect(history.push).toBeCalled();
      expect(history.push.mock.calls).toMatchSnapshot();
    });

    it('should DO_NOTHING', () => {
      expect(instance.redirectToRootNodeId({ rootNodeId: 0 })).toBe(DO_NOTHING);
    });
  });

  describe('redirectToAccessDenied()', () => {
    it('should call history.push, passing in an invalid root node ID', () => {
      const history = { push: jest.fn() };
      rendered.setProps({ url: '/some/url/', history });

      instance.redirectToAccessDenied();

      expect(history.push).toBeCalledWith(`/some/url/${INVALID_ROOT_NODE_ID}`);
      expect(history.push.mock.calls).toMatchSnapshot();
    });

    it('should DO_NOTHING', () => {
      expect(instance.redirectToRootNodeId({ rootNodeId: 0 })).toBe(DO_NOTHING);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderDefault', () => {
      rendered.setProps({ rootNodeId: 232 });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should render active', () => {
      rendered.setProps({ current: 232, rootNodeId: 232 });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render link', () => {
      rendered.setProps({ current: 231, rootNodeId: 232 });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderButtonForNoRootNodeId', () => {
    it('should render button under normal circumstances', () => {
      rendered.setProps({
        current: 232,
        rootNodeId: 232,
        activePaddingClassName: 'active',
        classes: {},
      });

      const snapshot = shallow(
        <div>{instance.renderButtonForNoRootNodeId()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should still render button if the current root node ID is INVALID_ROOT_NODE_ID', () => {
      rendered.setProps({
        current: INVALID_ROOT_NODE_ID,
        rootNodeId: 232,
        activePaddingClassName: 'active',
        classes: { link: 'link', active: 'active' },
      });

      const snapshot = shallow(
        <div>{instance.renderButtonForNoRootNodeId()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
