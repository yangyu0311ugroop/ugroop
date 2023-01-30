import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { InsuranceEditableMenu } from '../index';
import { PORTAL_HELPERS } from '../../../../../../../containers/Portal/helpers';
import inputs from '../inputs';

describe('<InsuranceEditableMenu />', () => {
  let rendered;
  let instance;

  const intl = { formatMessage: msgDescriptor => msgDescriptor.id };
  const resaga = { dispatchTo: jest.fn() };

  beforeEach(() => {
    rendered = shallow(<InsuranceEditableMenu intl={intl} resaga={resaga} />);
    instance = rendered.instance();
  });

  describe('getUserInsurance', () => {
    it('should call getUserInsurance', () => {
      NODE_STORE_HELPERS.pathToNodeInputName = jest.fn();
      instance.getUserInsurance();
      expect(NODE_STORE_HELPERS.pathToNodeInputName).toHaveBeenCalled();
    });
  });

  describe('handlePickerOpen', () => {
    it('should return prop', () => {
      instance.handlePickerOpen();
    });
  });
  describe('handlePickerClose', () => {
    it('should return handlePickerClose', () => {
      instance.handlePickerClose();
    });
  });

  describe('getMenuItemProps', () => {
    it('should return getMenuItemProps', () => {
      expect(instance.getMenuItemProps()).toEqual({ disabled: false });
    });
  });

  describe('renderEditable', () => {
    it('should render InsuranceEditableMenu', () => {
      rendered.setProps({
        userConnected: true,
        userInsurancePolicy: '0yes',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
    it('should render EditableTextForm', () => {
      rendered.setProps({
        userConnected: false,
        userInsurancePolicy: '0yes',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('getCloseOnClickAway', () => {
    it('should return getCloseOnClickAway', () => {
      expect(instance.getCloseOnClickAway()).toEqual(true);
    });
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('patchNode', () => {
    it('should return patchNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.patchNode({}, {});
      expect(NODE_API_HELPERS.updateNode).toBeCalled();
    });
  });

  describe('handleUserSelect', () => {
    it('should return handleUserSelect', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleUserSelect({}, {})();
      expect(NODE_API_HELPERS.updateNode).toBeCalled();
    });
  });

  describe('handleClearValue', () => {
    it('should return handleClearValue', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleClearValue({}, {})();
      expect(NODE_API_HELPERS.updateNode).toBeCalled();
    });
  });

  describe('onCreateSuccess', () => {
    it('should return onCreateSuccess', () => {
      instance.onCreateSuccess({ addResult: { id: 1 } });
    });
  });

  describe('handleViewClick', () => {
    it('should return handleViewClick', () => {
      PORTAL_HELPERS.showAddEditInsurance = jest.fn();
      instance.handleViewClick(1)();
      expect(PORTAL_HELPERS.showAddEditInsurance).toBeCalled();
    });
  });

  describe('createInsurancePolicy', () => {
    it('should return createInsurancePolicy', () => {
      PORTAL_HELPERS.showAddEditInsurance = jest.fn();
      instance.createInsurancePolicy();
      expect(PORTAL_HELPERS.showAddEditInsurance).toBeCalled();
    });
  });

  describe('renderMenuItemInput', () => {
    it('should return renderMenuItemInput', () => {
      rendered.setProps({ userInsurancePolicy: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemInput);
    });

    it('should return editable', () => {
      rendered.setProps({ userInsurancePolicy: 0 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemInput);
    });
  });

  describe('renderMenu', () => {
    it('should return renderMenu', () => {
      instance.getValues = jest.fn(() => [1]);
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [{}]);
    });
  });

  describe('renderValue', () => {
    it('should return renderValue', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue, [{}]);
    });
  });

  describe('getId', () => {
    it('should return getId', () => {
      rendered.setProps({ value: '1', userInsurancePolicy: 1 });
      instance.getValues = jest.fn(() => [1, 2, 3]);
      expect(instance.getId()).toEqual(1);
    });
    it('should return getId', () => {
      rendered.setProps({
        value: '1',
        userInsurancePolicy: 1,
        mode: inputs.mode.cleared,
      });
      instance.getValues = jest.fn(() => [1, 2, 3]);
      expect(instance.getId()).toEqual(1);
    });
    it('should return getId', () => {
      rendered.setProps({
        value: '0',
        userInsurancePolicy: 1,
        userInsurancePolicies: [1],
        mode: 'something',
        userConnected: true,
      });
      instance.getValues = jest.fn(() => [1, 2, 3]);
      expect(instance.getId()).toEqual(1);
    });
  });

  describe('renderActionButton', () => {
    it('should return renderActionButton', () => {
      instance.getId = jest.fn(() => 1);
      TEST_HELPERS.expectMatchSnapshot(instance.renderActionButton);
    });
    it('should return renderActionButton null', () => {
      instance.getId = jest.fn(() => 0);
      TEST_HELPERS.expectMatchSnapshot(instance.renderActionButton);
    });
  });

  describe('renderMenuSubmit', () => {
    it('should return renderMenuSubmit', () => {
      expect(
        instance.renderMenuSubmit({ values: { insurancePolicy: 1 } }),
      ).toBeDefined();
    });
    it('should return renderMenuSubmit', () => {
      expect(instance.renderMenuSubmit({ values: {} })).toEqual(null);
    });
    it('should return renderMenuSubmit', () => {
      expect(instance.renderMenuSubmit({})).toEqual(null);
    });
  });

  describe('renderMenuItemSubmit', () => {
    it('should return renderMenuItemSubmit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemSubmit, [{}]);
    });
  });

  describe('renderMenuItemClear', () => {
    it('should return renderMenuItemClear', () => {
      instance.getId = jest.fn(() => 1);
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemClear, [{}]);
    });
  });

  describe('handleSubmit', () => {
    it('should return handleSubmit', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmit({}, {});
      expect(NODE_API_HELPERS.updateNode).toBeCalled();
    });
  });

  describe('handleUpdateNodeError', () => {
    it('should return handleUpdateNodeError', () => {
      instance.handleUpdateNodeError();
      expect(rendered.state().saving).toEqual(false);
    });
  });

  describe('handleUpdateNodeSuccess', () => {
    it('should return handleUpdateNodeSuccess', () => {
      instance.handleUpdateNodeSuccess({})();
    });
    it('should return handleUpdateNodeSuccess and closemen', () => {
      const closeMenu = jest.fn;
      instance.handleUpdateNodeSuccess({ closeMenu })();
    });
  });

  describe('renderValueInput', () => {
    it('should match snapshot', () => {
      instance.getValueName = jest.fn(() => 'bloop');
      instance.getValue = jest.fn(() => 'mlep');
      TEST_HELPERS.expectMatchSnapshot(instance.renderValueInput);
    });
  });

  describe('renderTextField', () => {
    it('should match snapshot', () => {
      instance.renderValueInput = jest.fn(() => 'renderValueInput');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
  });
});
