import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RequiresConsent } from '../index';

describe('<RequiresConsent />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<RequiresConsent />);
    instance = rendered.instance();
  });

  describe('renderCheckboxField', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckboxField);
    });
  });
});
