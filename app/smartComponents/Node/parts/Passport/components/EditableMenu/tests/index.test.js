import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { PassportEditableMenu } from '../index';

describe('PassportEditableMenu', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<PassportEditableMenu />);
    instance = rendered.instance();
  });

  describe('getMenuItemProps', () => {
    it('should return disabled as saving', () => {
      rendered.setProps({
        saving: true,
      });
      expect(instance.getMenuItemProps()).toEqual({ disabled: true });
    });
    it('should return disabled as disabled', () => {
      rendered.setProps({
        saving: null,
      });
      expect(instance.getMenuItemProps()).toEqual({ disabled: false });
    });
  });

  describe('selectPassport', () => {
    it('should call defaultProps', () => {
      instance.selectPassport(1, {});
    });
    it('should call onPassportSelect', () => {
      const onPassportSelect = jest.fn();
      rendered.setProps({
        onPassportSelect,
      });
      instance.selectPassport(1, {});
      expect(onPassportSelect).toHaveBeenCalled();
    });
  });

  describe('openPassportView', () => {
    it('should setState', () => {
      instance.openPassportView(1, {});
      expect(rendered.state().viewing).toBe(true);
    });
  });

  describe('handlePassportClose', () => {
    it('should setState and call closeMenu', () => {
      const closeMenu = jest.fn();
      instance.handlePassportClose({ closeMenu })(1);
      expect(closeMenu).toHaveBeenCalled();
      expect(rendered.state().viewing).toBe(false);
    });
    it('should not call closeMenu', () => {
      const closeMenu = jest.fn();
      instance.handlePassportClose({ closeMenu })(false);
      expect(closeMenu).not.toHaveBeenCalled();
      expect(rendered.state().viewing).toBe(false);
    });
  });

  describe('handlePassportSelectSuccess', () => {
    it('should call closeMenu', () => {
      const closeMenu = jest.fn();
      instance.handlePassportSelectSuccess({ closeMenu })();
      expect(closeMenu).toHaveBeenCalled();
    });
  });

  describe('handleValueClick', () => {
    it('should call openPassportView', () => {
      instance.openPassportView = jest.fn();
      instance.handleValueClick(1)();
      expect(instance.openPassportView).toHaveBeenCalledWith(1);
    });
  });

  describe('handleValueSelect', () => {
    it('should call selectPassport with id', () => {
      instance.selectPassport = jest.fn();
      instance.handleValueSelect(1, {})(true);
      expect(instance.selectPassport).toHaveBeenCalledWith(1, {});
    });
    it('should call selectPassport with null', () => {
      instance.selectPassport = jest.fn();
      instance.handleValueSelect(1, {})(false);
      expect(instance.selectPassport).toHaveBeenCalledWith(null, {});
    });
  });

  describe('handleNodeValueCreateClick', () => {
    it('should openPassportView', () => {
      instance.openPassportView = jest.fn();
      instance.handleNodeValueCreateClick({})();
      expect(instance.openPassportView).toHaveBeenCalledWith(null, {});
    });
  });

  describe('renderNonInputValue', () => {
    it('should call renderValue', () => {
      instance.renderNonInputValue(1);
    });
    it('should call renderValue that is not default', () => {
      const renderValue = jest.fn();
      rendered.setProps({
        renderValue,
      });
      instance.renderNonInputValue(1);
      expect(renderValue).toHaveBeenCalledWith(1);
    });
  });

  describe('renderMenuItemValue', () => {
    it('should match snapshot', () => {
      instance.getMenuItemProps = jest.fn(() => {});
      instance.renderNonInputValue = jest.fn(() => 'renderNonInputValue');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemValue);
    });
  });

  describe('renderIsDefault', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIsDefault(1)());
    });
  });

  describe('renderMenuItem', () => {
    it('should match snapshot', () => {
      instance.renderMenuItemValue = jest.fn(() => 'renderMenuItemValue');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem({})(1));
    });
  });

  describe('renderSortedMenuItemUserValues', () => {
    it('should match snapshot', () => {
      const sortedIds = [1];
      instance.renderMenuItem = jest.fn(() => jest.fn(() => 'boop'));
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSortedMenuItemUserValues({})({ sortedIds }),
      );
    });
  });

  describe('renderMenuItemUserValues', () => {
    it('should match snapshot', () => {
      instance.renderSortedMenuItemUserValues = jest.fn(() => 'oof');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemUserValues);
    });
  });

  describe('renderMenuItemNodeValues', () => {
    it('should match snapshot', () => {
      instance.renderMenuItemValue = jest.fn(() => 'item');
      rendered.setProps({
        nodeValues: [1],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemNodeValues({}));
    });
  });

  describe('renderMenuItemNodeValueCreate', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        nodeValues: [],
      });
      instance.getMenuItemProps = jest.fn(() => {});
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderMenuItemNodeValueCreate({}),
      );
    });
  });

  describe('renderMenuItemHeading', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemHeading);
    });
  });

  describe('renderMenu', () => {
    it('should match snapshot', () => {
      instance.renderMenuItemHeading = jest.fn(() => 'renderMenuItemHeading');
      instance.renderMenuItemUserValues = jest.fn(
        () => 'renderMenuItemUserValues',
      );
      instance.renderMenuItemNodeValues = jest.fn(
        () => 'renderMenuItemNodeValues',
      );
      instance.renderMenuItemNodeValueCreate = jest.fn(
        () => 'renderMenuItemNodeValueCreate',
      );

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu()({}));
    });
  });

  describe('renderValue', () => {
    it('should call renderValue', () => {
      const renderValue = jest.fn();
      rendered.setProps({
        renderValue,
      });
      instance.renderValue();
      expect(renderValue).toHaveBeenCalled();
    });
  });

  describe('defaultProps', () => {
    it('should call renderActions', () => {
      rendered.props().renderActions();
    });
  });
});
