import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { OrganisationCard } from '../index';

describe('<OrganisationCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<OrganisationCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OrganisationCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('goToOrganisationPage()', () => {
    it('should call history.push', () => {
      const history = { push: jest.fn() };

      rendered.setProps({ history });

      instance.goToOrganisationPage({ orgUser: { orgId: 2233 } });

      expect(history.push).toBeCalled();
      expect(history.push.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderPersonal()', () => {
    it('should renderPersonal', () => {
      const snapshot = shallow(<div>{instance.renderPersonal()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrganisations()', () => {
    it('should return null', () => {
      rendered.setProps({ organisations: [] });

      expect(instance.renderOrganisations()).toBe(null);
    });

    it('should renderOrganisations', () => {
      rendered.setProps({ organisations: [1, 2] });

      const snapshot = shallow(<div>{instance.renderOrganisations()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrgInvitations()', () => {
    it('should return null', () => {
      rendered.setProps({ orgInvitations: [] });

      expect(instance.renderOrgInvitations()).toBe(null);
    });

    it('should renderOrgInvitations', () => {
      rendered.setProps({ orgInvitations: [1, 2] });

      const snapshot = shallow(<div>{instance.renderOrgInvitations()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPendingInvitations()', () => {
    it('should return null', () => {
      rendered.setProps({ orgInvitations: [] });

      expect(instance.renderPendingInvitations()).toBe(null);
    });

    it('should renderPendingInvitations', () => {
      rendered.setProps({ orgInvitations: [1, 2] });
      instance.renderOrgInvitations = jest.fn(() => 'renderOrgInvitations');

      const snapshot = shallow(
        <div>{instance.renderPendingInvitations()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderPersonal = jest.fn(() => 'renderPersonal');
      instance.renderOrganisations = jest.fn(() => 'renderOrganisations');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render children', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
