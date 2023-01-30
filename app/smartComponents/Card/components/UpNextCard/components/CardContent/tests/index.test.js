import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UpNextCardRenderer } from '../index';

describe('<UpNextCardRenderer />', () => {
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
    rendered = shallow(<UpNextCardRenderer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UpNextCardRenderer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderHeader', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmpty', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEmpty()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLoading', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLoading()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTImes', () => {
    it('should render loading if data needed are still being fetched', () => {
      rendered.setProps({
        fetchUserRelatedTemplates: true,
      });

      instance.renderLoading = jest.fn(() => 'renderLoading');

      expect(instance.renderTimes()).toBe('renderLoading');
    });

    it('should render empty if times is empty', () => {
      rendered.setProps({
        times: [],
      });

      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.renderTimes()).toBe('renderEmpty');
    });

    it('should match snapshot if times has items', () => {
      rendered.setProps({
        times: ['1', '2', '3'],
      });

      const snapshot = shallow(<div>{instance.renderTimes()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ showHeader: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render children', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
