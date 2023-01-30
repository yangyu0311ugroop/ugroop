import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import { DateOfBirthEditableDate } from '../index';

describe('<DateOfBirthEditableDate />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<DateOfBirthEditableDate />);
    instance = rendered.instance();
  });

  describe('handleSubmit', () => {
    it('should call updatePerson', () => {
      PERSON_DETAIL_HELPER.updatePerson = jest.fn();
      instance.handleSubmit({});
      expect(PERSON_DETAIL_HELPER.updatePerson).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
