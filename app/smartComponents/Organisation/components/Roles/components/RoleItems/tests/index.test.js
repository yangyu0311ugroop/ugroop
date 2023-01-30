import { shallow } from 'enzyme';
import { DO_NOTHING } from 'appConstants';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { OWNER } from 'utils/orgRoleConstants';
import { ORGANISATION_ACTION_VARIANT } from 'smartComponents/Organisation/components/Roles/constants';
import { RoleItems } from '../index';

describe('<RoleItems />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    allActivatedIds: [],
  };

  beforeEach(() => {
    rendered = shallow(<RoleItems {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RoleItems).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderRows()', () => {
    it('should render renderRows correctly', () => {
      rendered.setProps({ isMobile: true });
      const snapshot = shallow(<div>{instance.renderRows()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render read-only user==me correctly', () => {
      rendered.setProps({ me: 2 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render read-only role===OWNER correctly', () => {
      rendered.setProps({
        me: 2,
        id: 1,
        ownerId: 1,
        role: OWNER,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render read-only correctly not owner or user', () => {
      rendered.setProps({ me: 2, id: 1, ownerId: 2 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly when editable', () => {
      instance.isEditable = () => true;
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('changeRole()', () => {
    it('should do nothing if no role', () => {
      expect(instance.changeRole('')).toBe(DO_NOTHING);
    });
    it('should call dispatchTo', () => {
      rendered.setProps({ role: 'tour_collaborator' });
      instance.changeRole('tour_viewer');
      expect(resaga.dispatchTo).toBeCalled();
    });
    it('should call dispatchTo when role is general', () => {
      rendered.setProps({ role: 'general' });
      instance.changeRole('tour_viewer');
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('changeRoleSuccess()', () => {
    it('should set state', () => {
      instance.changeRoleSuccess();

      expect(rendered.state().changingRole).toBe(false);
      expect(rendered.state().changeRoleFailed).toBe(false);
    });
  });

  describe('changeRoleError()', () => {
    it('should set state', () => {
      instance.changeRoleError('something wrong');

      expect(rendered.state().changingRole).toBe(false);
      expect(rendered.state().changeRoleFailed).toBe(true);
    });
  });
  describe('Activate/Deactivate()', () => {
    it('onActivateDeactivate should set state', () => {
      // TODO: Role edit
      instance.onActivateDeactivate(true);
      expect(rendered.state().dialogProp.value).toBe(true);
      // TODO: Role edit
      instance.onActivateDeactivate(false);
      expect(rendered.state().dialogProp.value).toBe(false);
    });
    it('activateDeactivate should call dispatchTo', () => {
      // TODO: Role edit
      instance.activateDeactivate(true);
      expect(resaga.dispatchTo).toBeCalled();
      // TODO: Role edit
      instance.activateDeactivate(false);
      expect(resaga.dispatchTo).toBeCalled();
    });
    it('onDeactivateSuccess should call dispatchTo', () => {
      instance.onDeactivateSuccess();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('Edit/Delete()', () => {
    it('onDelete should set state', () => {
      // TODO: Role edit
      instance.onDelete(1);
      expect(rendered.state().dialogProp.open).toBe(true);
    });
    it('deleteMember should  should call dispatchTo', () => {
      // TODO: Role edit
      instance.deleteMember();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('renderLastCell()', () => {
    it('onDelete should set state', () => {
      instance.isEditable = jest.fn(() => true);
      // TODO: Role edit
      instance.renderRowsMobile();
    });
  });
  describe('Dialog()', () => {
    it('onDialogClose should set state', () => {
      // TODO: Role edit
      instance.onDialogClose();
      expect(rendered.state().dialogProp.open).toBe(false);
    });
    it('onDelete should set state', () => {
      // TODO: Role edit
      instance.onRequestSuccess();
      expect(rendered.state().dialogProp.open).toBe(false);
    });
    it('onConfirmDialog should  should call dispatchTo', () => {
      // TODO: Role edit
      rendered.setState({
        dialogProp: { requestType: ORGANISATION_ACTION_VARIANT.REMOVE },
      });
      instance.deleteMember = jest.fn();
      instance.onConfirmDialog();
      expect(instance.deleteMember).toBeCalled();
      rendered.setState({
        dialogProp: { requestType: ORGANISATION_ACTION_VARIANT.ACTIVATE },
      });
      instance.activateDeactivate = jest.fn();
      instance.onConfirmDialog();
      expect(instance.activateDeactivate).toHaveBeenCalled();
      rendered.setState({
        dialogProp: { requestType: '' },
      });
      instance.onConfirmDialog();
    });
  });
});
