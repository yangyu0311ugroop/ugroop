import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Invitation } from '../index';
import { PORTAL_HELPERS } from '../../../../../../../../../../../../../../../Portal/helpers';

describe('<Invitation />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    inviteFromOrg: false,
  };

  beforeEach(() => {
    rendered = shallow(<Invitation {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Invitation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('orgMenuClick', () => {
    it('should call resaga setValue', () => {
      instance.orgMenuClick(1)();

      expect(resaga.setValue).toBeCalledWith({
        selectedOrgId: 1,
      });
    });
  });
  describe('handleClick', () => {
    it('should call resaga setValue', () => {
      instance.handleClick();
      expect(rendered.state().open).toBe(true);
    });
  });
  describe('handleClose', () => {
    it('should call resaga setValue', () => {
      instance.handleClose();
      expect(rendered.state().open).toBe(false);
    });
  });
  describe('showHelp', () => {
    it('PORTAL_HELPERS.openHelpDialog to be called', () => {
      PORTAL_HELPERS.openHelpDialog = jest.fn();
      instance.showHelp();
      expect(PORTAL_HELPERS.openHelpDialog).toBeCalled();
    });
  });

  describe('inviteFromOrg', () => {
    it('should set inviteFromOrg state', () => {
      instance.inviteFromOrg(true)();

      expect(rendered.state().inviteFromOrg).toBe(false);
      expect(resaga.setValue).toBeCalledWith({
        inviteeId: null,
        inviteeToken: '',
        inviteeEmail: null,
        currentProcessId: null,
      });
    });
  });

  describe('render()', () => {
    it('should render correctly if inviteFromOrg is true', () => {
      rendered.setState({
        inviteFromOrg: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
