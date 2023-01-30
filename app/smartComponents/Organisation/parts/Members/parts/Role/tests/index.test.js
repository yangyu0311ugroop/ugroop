import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import { ORGANISATION_HELPER } from 'datastore/orgStore/helpers/orgHelper';
import { ASSIGNABLE_ORG_ROLES } from 'datastore/invitationStore/constants';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import Form from 'ugcomponents/Form';
import styles from '../styles';
import { Role } from '../index';

const mockStyles = mockStylesheet('DateFormat', styles, theme);

describe('<Role />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(),
  };

  const props = {
    classes: mockStyles,
    resaga,
    intl,
    role: 'admin',
  };

  beforeEach(() => {
    rendered = shallow(<Role {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Role).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderText()', () => {
    it('should render correctly #2', () => {
      rendered.setProps({ role: 'invalid role' });

      expect(instance.renderText()).toBe('');
    });

    it('should render correctly #1', () => {
      rendered.setProps({ role: 'guest' });

      expect(instance.renderText()).toBe('Guest');
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly when role is General', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_FIELD,
        role: 'general',
      });
      ORGANISATION_HELPER.getAssignableRole = () => ASSIGNABLE_ORG_ROLES;
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text only variant', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
        role: 'guest',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is text field', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is editing', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_EDITING,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is editing and role is general', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_EDITING,
        role: 'general',
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render owner text if variant is for owner', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_OWNER,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is readonly', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_READ_ONLY,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is readonly and inviteStatus is pending', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_READ_ONLY,
        inviteStatus: 'pending',
        role: 'general',
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is readonly and role is null', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_READ_ONLY,
        inviteStatus: 'pending',
        role: null,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is readonly and inviteStatus is pending', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_READ_ONLY,
        inviteStatus: 'pending',
      });
      rendered.setState({
        resend: true,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is readonly and inviteStatus is cancelled', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_READ_ONLY,
        inviteStatus: 'cancelled',
      });
      rendered.setState({
        resend: true,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is readonly and inviteStatus is cancelled', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_WITH_LABEL,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('resendInvitation', () => {
    it('dispatchTo should called', () => {
      instance.resendInvitation('1as23')();
      expect(resaga.dispatchTo).toBeCalled();
    });
    it('On resend invite Success resend should be true', () => {
      instance.resendInvitationSuccess();
      expect(rendered.state().resend).toBe(true);
    });
    it('should render invitation sent', () => {
      rendered.setProps({
        inviteStatus: 'pending',
      });
      rendered.setState({ resend: true, resendSuccess: true });

      const snapshot = shallow(<div>{instance.renderInvitationStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render invitation send failed', () => {
      rendered.setState({ resend: true, resendSuccess: false });

      const snapshot = shallow(<div>{instance.renderInvitationStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('resendInvitationError()', () => {
    it('should call dispatchTo', () => {
      instance.resendInvitationError();

      expect(rendered.state().resendSuccess).toBe(false);
    });
  });
});
