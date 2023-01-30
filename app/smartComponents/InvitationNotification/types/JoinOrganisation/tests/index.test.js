import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { JoinOrganisation } from '../index';

describe('<JoinOrganisation />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
    history,
  };

  beforeEach(() => {
    rendered = shallow(<JoinOrganisation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(JoinOrganisation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('goToOrganisationPage()', () => {
    it('should goToOrganisationPage', () => {
      instance.goToOrganisationPage({ orgUser: { orgId: 2233 } });

      expect(history.push).toBeCalled();
      expect(history.push.mock.calls).toMatchSnapshot();
    });
  });

  describe('acceptOrgInvitation()', () => {
    it('should acceptOrgInvitation', () => {
      instance.acceptOrgInvitation('some token')();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('declineOrgInvitation()', () => {
    it('should declineOrgInvitation', () => {
      instance.declineOrgInvitation('some token')();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onError()', () => {
    it('should onError', () => {
      instance.onError('some error');
      expect(rendered.state().error).toBe('some error');
    });
  });

  describe('renderButtons()', () => {
    it('should renderButtons', () => {
      rendered.setProps({ id: 22321 });

      const snapshot = shallow(<div>{instance.renderButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({ id: 22321 });
      instance.renderButtons = jest.fn(() => 'renderButtons');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render show error', () => {
      rendered.setProps({ id: 22321 });
      instance.renderButtons = jest.fn(() => 'renderButtons');
      rendered.setState({ error: 'some error' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
