import React from 'react';
import { shallow } from 'enzyme';
import Ownership from 'smartComponents/Person/components/Passports/parts/Ownership';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { CreatePassport } from '../index';

describe('CreatePassport', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<CreatePassport />);
    instance = rendered.instance();
  });

  describe('componentDidUpdate', () => {
    it('should call handleOpen', () => {
      const prevProps = { open: false };
      rendered.setProps({
        open: true,
      });
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toHaveBeenCalled();
    });
    it('should not call handleOpen', () => {
      const prevProps = { open: false };
      rendered.setProps({
        open: false,
      });
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).not.toHaveBeenCalled();
    });
  });

  describe('handleCreateSuccess', () => {
    it('should call setState', () => {
      instance.handleCreateSuccess({ passports: jest.fn() });
      expect(rendered.state().dispatching).toBe(false);
    });
  });

  describe('handleCreateError', () => {
    it('should setState', () => {
      instance.handleCreateError();
      expect(rendered.state().dispatching).toBe(false);
    });
  });

  describe('handleFormValidSubmit', () => {
    it('should call addPersonPassport', () => {
      PERSON_DETAIL_HELPER.addPersonPassport = jest.fn();
      instance.handleFormValidSubmit({ model: 1 });
      expect(rendered.state().dispatching).toBe(true);
      expect(PERSON_DETAIL_HELPER.addPersonPassport).toHaveBeenCalled();
    });
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderPart(Ownership, 'variant', {}),
      );
    });
  });

  describe('renderHeading', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeading);
    });
  });

  describe('renderHeadingBackground', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeadingBackground);
    });
  });

  describe('renderSubheading', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSubheading);
    });
  });

  describe('renderHeader', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderHeader({ renderCloseButton: jest.fn(() => 'btn') }),
      );
    });
  });
});
