import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { EditPreferencesForm } from '../index';
import { URL_HELPERS } from '../../../../../appConstants';

describe('<EditPreferencesForm />', () => {
  let rendered;
  let instance;

  const resaga = {
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    match: {},
    history: {},
    location: { pathname: '/1/2/3' },
    id: 1,
  };

  beforeEach(() => {
    rendered = shallow(<EditPreferencesForm {...props} />);
    instance = rendered.instance();
    SnackbarHelpers.openSuccessSnackbar = jest.fn();
    SnackbarHelpers.openErrorSnackbar = jest.fn();
    jest.clearAllMocks();
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

    describe('toggleReminder', () => {
      it('should call handleSwitchChange', () => {
        instance.handleSwitchChange = jest.fn();
        instance.toggleReminder('value');
        expect(instance.handleSwitchChange).toHaveBeenCalled();
      });
    });

    describe('toggleReminderSeeMore', () => {
      it('should call handleSwitchChangeSeeMore', () => {
        instance.handleSwitchChangeSeeMore = jest.fn();
        instance.toggleReminderSeeMore('value');
        expect(instance.handleSwitchChangeSeeMore).toHaveBeenCalled();
      });
    });

    describe('updatePreferenceSuccess', () => {
      it('should open snackbar', () => {
        instance.updatePreferenceSuccess();
        expect(SnackbarHelpers.openSuccessSnackbar).toHaveBeenCalled();
      });
    });

    describe('updatePreferencesNoChanges', () => {
      it('should open snackbar', () => {
        instance.updatePreferencesNoChanges();
        expect(SnackbarHelpers.openErrorSnackbar).toHaveBeenCalled();
      });
    });

    describe('updatePreferencesInvalidInput', () => {
      it('should open snackbar', () => {
        instance.updatePreferencesInvalidInput();
        expect(SnackbarHelpers.openErrorSnackbar).toHaveBeenCalled();
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
      it('should match snapshot if disabled', () => {
        rendered.setProps({ reminderDisabled: 1 });
        TEST_HELPERS.expectMatchSnapshot(instance.renderSwitch);
      });
    });
  });

  describe('renderSwitchSeeMore', () => {
    it('should match snapshot', () => {
      rendered.setProps({ seeMoreDisabled: '0' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitchSeeMore);
    });
    it('should match snapshot if no reminderDisabled', () => {
      rendered.setProps({ seeMoreDisabled: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitchSeeMore);
    });
    it('should match snapshot if disabled', () => {
      rendered.setProps({ seeMoreDisabled: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitchSeeMore);
    });
  });

  describe('handleValidSubmit', () => {
    it('should return undefined', () => {
      const data = {
        reminderFrequency: '1',
        reminderNumberOfAttempts: '1',
      };
      rendered.setProps({
        reminderAttempts: '1',
        reminderFrequencyDays: '1',
      });

      rendered.setState({ isChanged: undefined });

      expect(instance.handleValidSubmit(data)).toBe(null);
    });
    it('should return null', () => {
      const data = {
        reminderFrequency: '1',
        reminderNumberOfAttempts: '1',
      };
      rendered.setProps({
        reminderAttempts: '1',
        reminderFrequencyDays: '1',
      });

      rendered.setState({ isChanged: false });

      expect(instance.handleValidSubmit(data)).toBe(null);
    });
    it('should call updatePreferencesNoChanges', () => {
      instance.updatePreferencesNoChanges = jest.fn();
      const data = {
        reminderFrequency: '1',
        reminderNumberOfAttempts: '1',
      };
      rendered.setProps({
        reminderAttempts: '1',
        reminderFrequencyDays: '1',
      });
      rendered.setState({ isChanged: true });
      instance.handleValidSubmit(data);
      expect(instance.updatePreferencesNoChanges).toHaveBeenCalled();
    });
    it('should call updatePreferencesInvalidInput', () => {
      const data = {
        reminderFrequency: -1,
        reminderNumberOfAttempts: -1,
      };
      instance.updatePreferencesInvalidInput = jest.fn();

      rendered.setState({ isChanged: true });
      instance.handleValidSubmit(data);
      expect(instance.updatePreferencesInvalidInput).toHaveBeenCalled();
    });
    it('should call dispatchTo', () => {
      const data = {
        reminderFrequency: '0',
        reminderNumberOfAttempts: '0',
      };

      rendered.setState({ isChanged: true });
      instance.handleValidSubmit(data);
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('renderSeeMoreSwitch', () => {
    it('should match snapshot', () => {
      rendered.setProps({ seeMoreDisabled: '0' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSeeMoreSwitch);
    });
    it('should match snapshot if no seeMoreDisabled', () => {
      rendered.setProps({ seeMoreDisabled: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSeeMoreSwitch);
    });
    it('should match snapshot if disabled', () => {
      rendered.setProps({ seeMoreDisabled: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSeeMoreSwitch);
    });
  });

  describe('handleSwitchChangeSeeMore', () => {
    it('should call dispatchTo', () => {
      instance.handleSwitchChangeSeeMore('value');
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });
  describe('logicWording', () => {
    it('should call logicWording', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.logicWording(1, 5));
    });
  });

  describe('handleChange()', () => {
    it('should return true', () => {
      instance.handleChange({}, true);

      expect(rendered.state().isChanged).toBe(true);
    });

    it('should return false', () => {
      instance.handleChange({}, false);

      expect(rendered.state().isChanged).toBe(false);
    });
  });

  describe('handleDiscard()', () => {
    it('should return null', () => {
      rendered.setState({ isChanged: true });
      window.confirm = jest.fn(() => undefined);

      expect(instance.handleDiscard()).toBe(null);
    });

    it('should handleDiscard', () => {
      rendered.setState({ isChanged: false });
      instance.goPersonalPreference = jest.fn(() => 'goPersonalInfo');

      expect(instance.handleDiscard()).toBe('goPersonalInfo');
    });
  });

  describe('goPersonalPreference()', () => {
    it('should goPersonalPreference()', () => {
      URL_HELPERS.goToUrl = jest.fn(() => () => 'URL_HELPERS.goToUrl');

      instance.goPersonalPreference();

      TEST_HELPERS.expectCalled(URL_HELPERS.goToUrl);
    });
  });

  describe('renderReadOnly()', () => {
    it('should renderReadOnly()', () => {
      instance.renderReadOnly();

      TEST_HELPERS.expectMatchSnapshot(instance.renderReadOnly);
    });
  });
});
