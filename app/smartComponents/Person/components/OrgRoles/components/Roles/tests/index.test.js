import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Roles } from '../index';

describe('<Roles />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    isMobile: false,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Roles {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Roles).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderListItem()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        selectedOrgId: 1,
        id: 1,
      });
      const snapshot = shallow(<div>{instance.renderListItem()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly when onclick is not a function', () => {
      rendered.setProps({
        onClick: jest.fn(() => true),
        showAvatar: true,
      });
      const snapshot = shallow(<div>{instance.renderListItem()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly when onclick is a function', () => {
      rendered.setProps({
        onClick: jest.fn(() => true),
        selectedOrgId: 1,
        id: 1,
      });
      const snapshot = shallow(<div>{instance.renderListItem()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRow()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderRowMobile render correctly if redirect is not a function', () => {
      rendered.setProps({ isMobile: true });
      const snapshot = shallow(<div>{instance.renderRowMobile()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderRowMobile render correctly if redirect is function', () => {
      rendered.setProps({ isMobile: true, redirectToUrl: jest.fn() });
      const snapshot = shallow(<div>{instance.renderRowMobile()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
