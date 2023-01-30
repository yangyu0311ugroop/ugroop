import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import { StudentDetails } from '../index';

describe('<StudentDetails />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<StudentDetails />);
    instance = rendered.instance();
  });

  describe('getValue', () => {
    it('should return userValues and nodeValues', () => {
      rendered.setProps({
        userValues: [1],
        nodeValues: [2],
      });
      expect(instance.getValue()).toEqual([1, 2]);
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      instance.getProps = jest.fn(() => {});
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });
});
