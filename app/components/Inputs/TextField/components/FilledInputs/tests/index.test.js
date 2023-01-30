import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FilledTextField, FilledVTextField } from '../index';

describe('<FilledTextField />', () => {
  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(shallow(<FilledTextField />));
    });
  });
});

describe('<FilledVTextField />', () => {
  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(
        shallow(<FilledVTextField name="name" />),
      );
    });
  });
});
