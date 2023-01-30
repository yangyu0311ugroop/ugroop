import { CREATE_NODE, NODE_API } from 'apis/constants';

/**
 * Created by paulcedrick on 7/7/17.
 */
/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';

import { AddTemplateModalContainer } from '../index';

describe('AddTemplateModalContainer component', () => {
  const props = {
    parentNodeId: 1,
    active: true,
    classes: {},
    closeModal: () => {},
    history: {
      push: jest.fn(),
    },
    intl: {
      formatMessage: jest.fn(),
      formatDate: jest.fn(),
    },
    resaga: {
      setValue: jest.fn(),
      dispatch: jest.fn(),
      analyse: jest.fn(),
      dispatchTo: jest.fn(),
    },
  };
  let rendered;
  let instance;
  beforeEach(() => {
    SnackbarHelper.openErrorSnackbar = jest.fn();
    rendered = shallow(<AddTemplateModalContainer {...props} />);
    instance = rendered.instance();
  });

  describe('onCreateSuccess', () => {
    it('should return false if !tourOwnerAbilities', () => {
      rendered.setProps({ tourOwnerAbilities: [] });

      expect(instance.onCreateSuccess({ id: 1, content: 'qqq' })).toBe(false);

      expect(props.history.push).not.toBeCalled();
    });

    it('should call browserHistory', () => {
      rendered.setProps({ tourOwnerAbilities: [1, 2] });

      instance.onCreateSuccess({ node: { id: 1, content: 'qqq' } });
      expect(props.history.push).toBeCalled();
    });
  });

  describe('onCreateError', () => {
    it('should set the isSaveDisabled button to false', () => {
      rendered.setState({
        isSaveDisabled: true,
      });
      instance.onCreateError({});
      expect(rendered.state().isSaveDisabled).toBe(false);
    });

    it('should call snackbar helper and call with specific parameters', () => {
      instance.onCloseModal = jest.fn();
      rendered.setState({
        isSaveDisabled: true,
      });
      instance.onCreateError({
        status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      });
      expect(rendered.state().isSaveDisabled).toBe(false);
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
      expect(instance.onCloseModal).toBeCalled();
    });
  });
  describe('onDateChange', () => {
    it('updates date without time + timezone', () => {
      instance.onDateChange(
        moment.utc('0001-02-03 21:12:21.121').utcOffset(-10 * 60),
      );
      expect(instance.state).toEqual(
        expect.objectContaining({
          date: '0001-02-03T00:00:00Z',
          isDateValid: true,
          isDateValidText: '',
        }),
      );
    });
  });
  describe('onDayChange', () => {
    it('should change the value of the day state based on the passed value', () => {
      instance.onDayChange({
        target: {
          value: 1,
        },
      });
      expect(rendered.state().day).toBe(1);
      expect(rendered.state().isDateValid).toBe(null);
      expect(rendered.state().isDateValidText).toBe('');
    });
  });
  describe('isValid', () => {
    it('should return true if field is not recognized', () => {
      expect(instance.isValid('qweqwe', 1)).toBe(true);
    });
    describe('validating title', () => {
      it('should return false if title is not blank', () => {
        expect(instance.isValid('title', '')).toBe(false);
      });
      it('should return false if title is null', () => {
        expect(instance.isValid('title', null)).toBe(false);
      });
      it('should return true if title is not null and blank', () => {
        expect(instance.isValid('title', 'qweqwe')).toBe(true);
      });
    });
    describe('validating duration', () => {
      it('should return true if duration is greater than 0 and less than 50', () => {
        expect(instance.isValid('duration', 2)).toBe(true);
      });
      it('should return false if duration is less than or equal 0', () => {
        expect(instance.isValid('duration', 0)).toBe(false);
      });
      it('should return false if duration is greater 50', () => {
        expect(instance.isValid('duration', 51)).toBe(false);
      });
    });
  });
  describe('onValidateInput', () => {
    beforeEach(() => {
      rendered.setState({
        title: 'qqqq',
        description: 'www',
        duration: 5,
      });
    });
    it('should set isSaveDisabledButton to false if all values are filled up', () => {
      instance.onValidateInput();
      expect(rendered.state().isSaveDisabled).toBe(false);
    });
    it('should set isSaveDisabledButton true if one is invalid', () => {
      rendered.setState({
        title: '',
      });
      instance.onValidateInput();
      expect(rendered.state().isSaveDisabled).toBe(true);
    });
    it('should set isSaveDisabledButton true if duration is less than or equal 0', () => {
      rendered.setState({ duration: 0 });
      instance.onValidateInput();
      expect(rendered.state().isSaveDisabled).toBe(true);
    });
    it('should set isSaveDisabledButton true if duration is greater than 50', () => {
      rendered.setState({ duration: -1 });
      instance.onValidateInput();
      expect(rendered.state().isSaveDisabled).toBe(true);
    });
  });
  describe('onCloseModal', () => {
    it('should reset all the value first to its original form', () => {
      const originalState = rendered.state();
      rendered.setState({
        title: 'qweqweqwew',
        description: 'xxxxx',
        duration: 5,
        isSaveDisabled: false,
      });
      instance.onCloseModal();
      expect(originalState).toEqual(rendered.state());
    });
    it('should call the closeModal props as well', () => {
      const mFunc = jest.fn();
      rendered.setProps({
        closeModal: mFunc,
      });
      instance.onCloseModal();
      expect(mFunc).toBeCalled();
    });
  });
  describe('onClearLine', () => {
    it('should reset the value of date and day to its original state', () => {
      const originalState = rendered.state();
      rendered.setState({
        date: '1-2-3',
        day: '2',
        isDateValidText: '22ssss',
        isDateValid: false,
      });
      instance.onClearLine();
      expect(originalState).toEqual(rendered.state());
    });
  });
  describe('onFormSubmit', () => {
    beforeEach(() => {
      rendered.setState({
        title: 'qqqq',
        description: 'www',
        duration: 5,
      });
    });
    it('should dispatch what it needs to dispatch', () => {
      rendered.setProps({
        parentNodeId: 1,
      });
      instance.onFormSubmit();
      const expectedTemplate = {
        content: 'qqqq',
        customData: {
          shortDescription: '',
          displayDate: 'none',
          startDate: null,
          weekDay: null,
          description: 'www',
          duration: 5,
        },
        parentNodeId: 1,
        type: 'template',
      };
      expect(props.resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_NODE, {
        payload: {
          node: expectedTemplate,
          keyPath: `${props.parentNodeId}.children`,
        },
        onSuccess: instance.onCreateSuccess,
        onError: instance.onCreateError,
      });
    });
    it('should set isSaveDisabled to true', () => {
      rendered.setState({
        isSaveDisabled: false,
      });
      instance.onFormSubmit();
      expect(rendered.state().isSaveDisabled).toBe(true);
    });
    it('should make weekDay null if day value is "none"', () => {
      rendered.setProps({
        parentNodeId: 1,
      });
      rendered.setState({
        day: 'none',
      });
      instance.onFormSubmit();
      const expectedTemplate = {
        content: 'qqqq',
        customData: {
          shortDescription: '',
          displayDate: 'none',
          startDate: null,
          weekDay: null,
          description: 'www',
          duration: 5,
        },
        parentNodeId: 1,
        type: 'template',
      };
      expect(props.resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_NODE, {
        payload: {
          node: expectedTemplate,
          keyPath: `${props.parentNodeId}.children`,
        },
        onSuccess: instance.onCreateSuccess,
        onError: instance.onCreateError,
      });
    });
    it('should use the original value of day if its value is not "none"', () => {
      rendered.setProps({
        parentNodeId: 1,
      });
      rendered.setState({
        day: 5,
      });
      instance.onFormSubmit();
      const expectedTemplate = {
        content: 'qqqq',
        customData: {
          shortDescription: '',
          displayDate: 'weekDay',
          startDate: null,
          weekDay: 5,
          description: 'www',
          duration: 5,
        },
        parentNodeId: 1,
        type: 'template',
      };
      expect(props.resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_NODE, {
        payload: {
          node: expectedTemplate,
          keyPath: `${props.parentNodeId}.children`,
        },
        onSuccess: instance.onCreateSuccess,
        onError: instance.onCreateError,
      });
    });
    it('should make displayDate to "startDate" if day has value', () => {
      rendered.setProps({
        parentNodeId: 1,
      });
      rendered.setState({
        date: 5,
      });
      instance.onFormSubmit();
      const expectedTemplate = {
        content: 'qqqq',
        customData: {
          shortDescription: '',
          displayDate: 'startDate',
          startDate: 5,
          weekDay: null,
          description: 'www',
          duration: 5,
        },
        parentNodeId: 1,
        type: 'template',
      };
      expect(props.resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_NODE, {
        payload: {
          node: expectedTemplate,
          keyPath: `${props.parentNodeId}.children`,
        },
        onSuccess: instance.onCreateSuccess,
        onError: instance.onCreateError,
      });
    });
  });
  describe('onTitleChange', () => {
    it('should set the state for the title value', () => {
      instance.onTitleChange('something');
      expect(rendered.state().title).toBe('something');
    });
  });
  describe('durationValidator', () => {
    it('should return the originalResult if keyName is not duration', () => {
      expect(instance.durationValidator(3, 'qweqwe', false)).toBe(false);
    });
    it('should return true if value is > 0', () => {
      expect(instance.durationValidator(3, 'duration', false)).toBe(true);
    });
    it('should return false if value is not > 0', () => {
      expect(instance.durationValidator(0, 'duration', false)).toBe(false);
    });
    it('should return false if value is not > 1', () => {
      expect(instance.durationValidator(1, 'duration', false)).toBe(false);
    });
    it('should return true if day is not none', () => {
      expect(instance.durationValidator('qqq', 'day', false)).toBe(true);
    });
    it('should return false if day is not none', () => {
      expect(instance.durationValidator('none', 'day', false)).toBe(false);
    });
  });
  describe('onDurationChange', () => {
    it('should set the state for the duration value', () => {
      instance.onDurationChange(5);
      expect(rendered.state().duration).toBe(5);
    });
    it('should not parseInt if duration value is NaN', () => {
      instance.onDurationChange(NaN);
      expect(rendered.state().duration).toBe(null);
      expect(rendered.state().isSaveDisabled).toBe(true);
    });
  });
  describe('onDescriptionChange', () => {
    it('should set the state for the description value', () => {
      instance.onDescriptionChange('qqq', { cleanContent: '' });
      expect(rendered.state().description).toBe('qqq');
    });
    it('should set the state for the shortDescription value', () => {
      const expected =
        'Jesus is Lord whether you bow your knee or raise your fist';
      instance.onDescriptionChange('qqq', { plainText: expected });
      expect(rendered.state().shortDescription).toBe(expected);
    });
  });
});
