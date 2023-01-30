import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PENDING, CONFIRMED } from 'appConstants';
import { DeclineInvitation } from '../index';

describe('<DeclineInvitation />', () => {
  let rendered;
  let instance;

  const mockResaga = {
    dispatchTo: jest.fn(),
  };

  const mockHistory = {
    push: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(
      <DeclineInvitation
        classes={{}}
        resaga={mockResaga}
        history={mockHistory}
      />,
    );
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DeclineInvitation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render properly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render error', () => {
    rendered.setState({ error: 'ERROR MESSAGE' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render Decline Invitation Page', () => {
    rendered.setState({ success: true });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('onSuccess()', () => {
    it('should set error no longer active', () => {
      instance.onSuccess({ status: CONFIRMED });
      expect(instance.state.error).toBeDefined();
    });
    it('should set success true', () => {
      instance.onSuccess({ status: PENDING });
      expect(instance.state.success).toBe(true);
    });
  });

  describe('onHandleSubmit()', () => {
    it('should call dispatchTo', () => {
      instance.onHandleSubmit({ content: 'test' });
      expect(mockResaga.dispatchTo).toBeCalled();
    });
  });

  describe('redirectToHome()', () => {
    it('should call history.push', () => {
      rendered.setState({ reasonSent: true });
      instance.redirectToHome();
      expect(instance.state.reasonSent).toBe(true);
    });
  });
});
