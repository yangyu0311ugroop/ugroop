import React from 'react';
import { shallow } from 'enzyme';
import Ownership from 'smartComponents/Person/components/Passports/parts/Ownership';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ViewPassport } from '../index';

describe('ViewPassport', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<ViewPassport />);
    instance = rendered.instance();
  });

  describe('getButtonProps', () => {
    it('should return button props', () => {
      expect(instance.getButtonProps()).toEqual({
        size: 'small',
        square: false,
      });
    });
  });

  describe('handleDeleteClick', () => {
    it('should call removePersonPassport', () => {
      PERSON_DETAIL_HELPER.removePersonPassport = jest.fn();
      instance.handleDeleteClick({ onLoad: jest.fn(), onClose: jest.fn() });
      expect(PERSON_DETAIL_HELPER.removePersonPassport).toHaveBeenCalled();
    });
  });

  describe('handleDeleteSuccess', () => {
    it('should call LOGIC_HELPERS', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const onClose = jest.fn();
      const onLoad = jest.fn();
      const passportId = 1;
      instance.handleDeleteSuccess({ passportId, onLoad, onClose })();
      expect(LOGIC_HELPERS.ifFunction).toHaveBeenCalledWith(onLoad);
      expect(LOGIC_HELPERS.ifFunction).toHaveBeenCalledWith(onClose);
    });
  });

  describe('handleDeleteError', () => {
    it('should call LOGIC_HELPERS', () => {
      const onLoad = jest.fn();
      LOGIC_HELPERS.ifFunction = jest.fn();
      instance.handleDeleteError({ onLoad })();
      expect(LOGIC_HELPERS.ifFunction).toHaveBeenCalledWith(onLoad);
    });
  });

  describe('handleSubmit', () => {
    it('should call updatePersonPassport', () => {
      PERSON_DETAIL_HELPER.updatePersonPassport = jest.fn();
      instance.handleSubmit({
        model: 1,
        onSuccess: jest.fn,
        onError: jest.fn(),
      });
      expect(PERSON_DETAIL_HELPER.updatePersonPassport).toHaveBeenCalled();
    });
  });

  describe('handleSubmitPhoto', () => {
    it('should call updatePersonPassport', () => {
      PERSON_DETAIL_HELPER.updatePersonPassportPhoto = jest.fn();
      instance.handleSubmitPhoto('url', {});
      expect(PERSON_DETAIL_HELPER.updatePersonPassportPhoto).toHaveBeenCalled();
    });
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderPart(Ownership, 'variant'),
      );
    });
  });
});
