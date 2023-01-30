import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NavLink } from '../index';

describe('<NavLink />', () => {
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
    rendered = shallow(<NavLink {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(NavLink).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderContent()', () => {
    it('should renderContent alwaysShow = true', () => {
      rendered.setProps({ alwaysShow: true, fullWidth: true });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderContent alwaysShow = false', () => {
      rendered.setProps({ alwaysShow: false, ellipsis: true });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLink()', () => {
    it('should renderLink', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
  });

  describe('render()', () => {
    it('should render children function', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render children node', () => {
      rendered.setProps({ children: 'children' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render correctly', () => {
      rendered.setProps({ hover: true });
      instance.renderLink = jest.fn(() => 'renderLink');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
