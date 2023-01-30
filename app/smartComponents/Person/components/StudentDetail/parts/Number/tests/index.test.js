import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { StudentDetailNumber } from '../index';

describe('<StudentDetailNumber />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<StudentDetailNumber classes={{}} />);
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
