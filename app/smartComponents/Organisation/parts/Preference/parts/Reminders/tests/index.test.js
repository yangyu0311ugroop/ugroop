import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { Reminders } from '../index';

describe('<Reminders />', () => {
  let rendered;
  let instance;

  const resaga = {
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Reminders resaga={resaga} classes={{}} />);
    instance = rendered.instance();
  });

  describe('openPopperFreq', () => {
    it('should setState', () => {
      const event = { currentTarget: 1 };
      rendered.setState({ anchorElFreq: 1 });
      instance.openPopperFreq(event);
      expect(rendered.state().anchorElFreq).toEqual(null);
    });
    it('should setState to currentTarget', () => {
      const event = { currentTarget: 1 };
      rendered.setState({ anchorElFreq: false });
      instance.openPopperFreq(event);
      expect(rendered.state().anchorElFreq).toEqual(1);
    });
  });

  describe('openPopperAtmps', () => {
    it('should setState', () => {
      const event = { currentTarget: 1 };
      rendered.setState({ anchorElAtmps: 1 });
      instance.openPopperAtmps(event);
      expect(rendered.state().anchorElAtmps).toEqual(null);
    });
    it('should setState to currentTarget', () => {
      const event = { currentTarget: 1 };
      rendered.setState({ anchorElAtmps: false });
      instance.openPopperAtmps(event);
      expect(rendered.state().anchorElAtmps).toEqual(1);
    });
  });

  describe('handlePopperClickAwayFreq', () => {
    it('should call closePopperFreq', () => {
      instance.closePopperFreq = jest.fn();
      rendered.setState({ clickAwayFreq: true });
      instance.handlePopperClickAwayFreq();
      expect(instance.closePopperFreq).toHaveBeenCalled();
    });
    it('should not call closePopperFreq', () => {
      instance.closePopperFreq = jest.fn();
      rendered.setState({ clickAwayFreq: false });
      instance.handlePopperClickAwayFreq();
      expect(instance.closePopperFreq).not.toHaveBeenCalled();
    });
  });

  describe('handlePopperClickAwayAtmps', () => {
    it('should call closePopperAtmps', () => {
      instance.closePopperAtmps = jest.fn();
      rendered.setState({ clickAwayAtmps: true });
      instance.handlePopperClickAwayAtmps();
      expect(instance.closePopperAtmps).toHaveBeenCalled();
    });
    it('should not call closePopperAtmps', () => {
      instance.closePopperAtmps = jest.fn();
      rendered.setState({ clickAwayAtmps: false });
      instance.handlePopperClickAwayAtmps();
      expect(instance.closePopperAtmps).not.toHaveBeenCalled();
    });
  });

  describe('closePopperFreq', () => {
    it('should setState', () => {
      instance.closePopperFreq();
      expect(rendered.state().anchorElFreq).toEqual(null);
    });
  });

  describe('closePopperAtmps', () => {
    it('should setState', () => {
      instance.closePopperAtmps();
      expect(rendered.state().anchorElAtmps).toEqual(null);
    });
  });

  describe('handleSwitchChange', () => {
    it('should call dispatchTo', () => {
      instance.handleSwitchChange('value');
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('toggleReminder', () => {
    it('should call handleSwitchChange', () => {
      instance.handleSwitchChange = jest.fn();
      instance.toggleReminder('value');
      expect(instance.handleSwitchChange).toHaveBeenCalled();
    });
  });

  describe('renderSwitch', () => {
    it('should match snapshot', () => {
      rendered.setProps({ reminderDisabled: '0' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitch);
    });
    it('should match snapshot if no reminderDisabled', () => {
      rendered.setProps({ reminderDisabled: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitch);
    });
    it('should match snapshot if no reminderDisabled', () => {
      rendered.setProps({ reminderDisabled: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitch);
    });
  });
});
