import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { ConsentedAt } from '../index';

describe('<ConsentedAt />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<ConsentedAt />);
    instance = rendered.instance();
  });

  describe('renderTextOnly', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });
});
