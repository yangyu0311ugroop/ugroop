import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Buttons } from '../index';

describe('<Buttons />', () => {
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
    rendered = shallow(<Buttons {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Buttons).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('showResetButton()', () => {
    it('should showResetButton', () => {
      rendered.setProps({ exist: true, shared: false, loading: false });

      expect(instance.showResetButton()).toBe(true);
    });
  });

  describe('handleReset()', () => {
    it('should handleReset', () => {
      const onReset = jest.fn();
      rendered.setProps({ onReset });

      instance.handleReset();

      expect(onReset).toBeCalled();
    });

    it('should not do anything', () => {
      rendered.setProps({ onReset: undefined });

      instance.handleReset();
    });
  });

  describe('renderSubmitButton()', () => {
    it('should renderSubmitButton Send Invitation', () => {
      rendered.setProps({ exist: true });

      const snapshot = shallow(<div>{instance.renderSubmitButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderSubmitButton Find', () => {
      rendered.setProps({ exist: false });

      const snapshot = shallow(<div>{instance.renderSubmitButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderResetText()', () => {
    it('should return InviteSomeone pending: true', () => {
      rendered.setProps({ pending: true });

      expect(instance.renderResetText()).toBe('Invite someone else');
    });

    it('should return InviteSomeone accepted: true', () => {
      rendered.setProps({ accepted: true });

      expect(instance.renderResetText()).toBe('Invite someone else');
    });

    it('should return Cancel', () => {
      rendered.setProps({ pending: false, accepted: false });

      expect(instance.renderResetText()).toBe('Cancel');
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
