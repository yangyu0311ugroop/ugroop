import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ChangeDueDatePopper } from '../index';

describe('<ChangeDueDatePopper />', () => {
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
    rendered = shallow(<ChangeDueDatePopper {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChangeDueDatePopper).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('closeOnClickAway()', () => {
    it('should closeOnClickAway true', () => {
      global.setTimeout = jest.fn(cb => cb());
      instance.closeOnClickAway('closeOnClickAway');

      expect(rendered.state().closeOnClickAway).toBe('closeOnClickAway');
    });
    it('should closeOnClickAway false', () => {
      instance.closeOnClickAway(false);
      expect(rendered.state().closeOnClickAway).toBe(false);
    });
  });

  describe('handleClose()', () => {
    it('should call onClose', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });
      rendered.setState({ closeOnClickAway: true });

      instance.handleClose('event');

      expect(onClose).toBeCalledWith('event');
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ onClose: undefined });

      expect(instance.handleClose('event')).toBe(DO_NOTHING);
    });
  });

  describe('stopPropagation()', () => {
    it('should return falsy #1', () => {
      expect(instance.stopPropagation()).toBe(undefined);
    });

    it('should return falsy #2', () => {
      expect(instance.stopPropagation({})).toBe(undefined);
    });

    it('should return stopPropagation', () => {
      const stopPropagation = jest.fn(() => 'stopPropagation');
      expect(instance.stopPropagation({ stopPropagation })).toBe(
        'stopPropagation',
      );
    });
  });

  describe('renderHeading()', () => {
    it('should return null', () => {
      rendered.setProps({ heading: null });

      expect(instance.renderHeading()).toBe(null);
    });

    it('should renderHeading', () => {
      rendered.setProps({ heading: 'heading' });

      const snapshot = shallow(<div>{instance.renderHeading()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFooter()', () => {
    it('should return null', () => {
      rendered.setProps({ footer: null });

      expect(instance.renderFooter()).toBe(null);
    });

    it('should renderFooter', () => {
      rendered.setProps({ footer: 'footer' });

      const snapshot = shallow(<div>{instance.renderFooter()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      instance.renderHeading = jest.fn(() => 'renderHeading');
      instance.renderFooter = jest.fn(() => 'renderFooter');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('componentWillUnmount', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.componentWillUnmount();
      expect(global.clearTimeout).toHaveBeenCalled();
    });
  });
  describe('render()', () => {
    it('should renderDefault', () => {
      instance.renderDefault = jest.fn(() => 'renderDefault');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
