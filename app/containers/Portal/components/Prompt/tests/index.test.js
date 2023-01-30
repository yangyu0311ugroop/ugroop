import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Prompt } from '../index';

describe('<Prompt />', () => {
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
    rendered = shallow(<Prompt {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Prompt).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should return null', () => {
      instance.componentWillUnmount();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleConfirm()', () => {
    it('should NOT call PORTAL_HELPERS.close', () => {
      PORTAL_HELPERS.close = jest.fn();
      rendered.setProps({ closeOnConfirm: false });

      instance.handleConfirm();

      expect(PORTAL_HELPERS.close).not.toBeCalled();
    });

    it('should call PORTAL_HELPERS.close', () => {
      PORTAL_HELPERS.close = jest.fn();
      rendered.setProps({ closeOnConfirm: true });

      instance.handleConfirm();

      expect(PORTAL_HELPERS.close).toBeCalled();
    });
  });

  describe('handleClose()', () => {
    it('should return null', () => {
      rendered.setState({ loading: true });

      expect(instance.handleClose()).toBe(null);
    });

    it('should handleClose', () => {
      rendered.setState({ loading: false });
      PORTAL_HELPERS.close = jest.fn(() => 'PORTAL_HELPERS.close');

      expect(instance.handleClose()).toBe('PORTAL_HELPERS.close');
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
