import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { StudentDetailClass } from '../index';

describe('<StudentDetailClass />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<StudentDetailClass />);
    instance = rendered.instance();
  });

  describe('renderTextOnly', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });

  describe('renderTextField', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
  });
});
