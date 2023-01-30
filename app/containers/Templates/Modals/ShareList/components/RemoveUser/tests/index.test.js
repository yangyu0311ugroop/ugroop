import { CONFIRMED } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import {
  INTERESTED_PERSON,
  TOUR_INTERESTED,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import { RemoveUser } from '../index';

describe('<RemoveUser />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const mockUrl = jest.fn();
  const props = {
    classes: {},
    resaga,
    history: { location: mockUrl },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<RemoveUser {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RemoveUser).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('removeUser()', () => {
    it('should call dispatch when removeUser is executed', () => {
      instance.removeUser();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('updateAbility()', () => {
    it('should call dispatch when updateAbility is executed', () => {
      instance.updateAbility();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('abilityUpdateSuccess()', () => {
    it('should call setValue when abilityUpdateSuccess is executed', () => {
      rendered.setProps({ role: INTERESTED_PERSON });
      instance.abilityUpdateSuccess();
      expect(resaga.setValue).toBeCalled();
    });
    it('should call dispatch when abilityUpdateSuccess is executed', () => {
      rendered.setProps({ role: TOUR_PARTICIPANT });
      instance.abilityUpdateSuccess();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('removeUserConfirm()', () => {
    it('Should set openDialogOpen to true when removeUserConfirm is called ', () => {
      instance.removeUserConfirm();
      // expect(history.push).toBeCalled();
      expect(rendered.state().openDialogOpen).toBe(true);
    });
  });

  describe('removeUserSuccess()', () => {
    it('Should set openDialogOpen to true when removeUserSuccess is called ', () => {
      const history = { push: jest.fn() };
      rendered.setProps({ history });
      instance.removeUserSuccess({
        hadRemovedInvite: true,
      });
      expect(rendered.state().openDialogOpen).toBe(false);
    });
    it('updateAbility Should be called when  removeUserSuccess is called ', () => {
      const history = { push: jest.fn() };
      rendered.setProps({ history });
      instance.iAm = jest.fn(() => true);
      instance.updateAbility = jest.fn();
      instance.removeUserSuccess({
        hadRemovedInvite: false,
      });
      expect(instance.updateAbility).toBeCalled();
    });
    it('Should call setValue when removeUserSuccess is called with user', () => {
      rendered.setProps({
        closeDetailDlg: true,
        role: TOUR_PARTICIPANT,
        participantDialog: true,
      });
      const history = { push: jest.fn() };
      const handleParentSuccess = jest.fn(() => true);
      rendered.setProps({ history, handleParentSuccess });
      instance.iAm = jest.fn(() => false);
      instance.removeUserSuccess({ hadRemovedInvite: false });
      expect(resaga.setValue).toBeCalled();
    });
    it('Should call setValue tourConnection to false when needed', () => {
      rendered.setProps({
        closeDetailDlg: true,
        role: TOUR_INTERESTED,
        interestedDialog: true,
      });
      const history = { push: jest.fn() };
      const handleParentSuccess = jest.fn(() => true);
      rendered.setProps({ history, handleParentSuccess });
      instance.iAm = jest.fn(() => false);
      instance.removeUserSuccess({ hadRemovedInvite: false });
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('hadleParentDialog()', () => {
    it('Should call setValue when hadleParentDialog is called', () => {
      rendered.setProps({ interestedDialog: true, participantDialog: true });
      instance.hadleParentDialog();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('renderRemoveUser()', () => {
    it('should render correctly when renderRemoveUser is called', () => {
      rendered.setProps({ status: CONFIRMED });
      instance.canDelete = jest.fn(() => true);
      instance.iAm = jest.fn(() => false);
      const snapshot = shallow(<div>{instance.renderRemoveUser()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly when renderRemoveUser is called with iAm = false', () => {
      rendered.setProps({ status: CONFIRMED });
      instance.canDelete = jest.fn(() => true);
      instance.iAm = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderRemoveUser()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should remove user', () => {
      instance.iAm = jest.fn(() => false);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      instance.iAm = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly for icon variant', () => {
      rendered.setProps({ variant: VARIANTS.ICON });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
