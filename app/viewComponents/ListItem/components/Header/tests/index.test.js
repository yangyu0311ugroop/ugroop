import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;
  let instance;

  const props = {
    title: 'title',
    icon: 'folder',
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  describe('renderIcon', () => {
    it('should return null if there is no icon', () => {
      rendered.setProps({
        icon: null,
      });
      expect(instance.renderIcon()).toEqual(null);
    });
    it('should match snapshot if there is an icon', () => {
      const snapshot = shallow(<div>{instance.renderIcon()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      instance.renderIcon = jest.fn(() => 'renderIcon');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
