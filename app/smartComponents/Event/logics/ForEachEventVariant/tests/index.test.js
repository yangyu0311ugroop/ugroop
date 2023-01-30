/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EVENT_CONSTANTS } from 'utils/constants/events';
import { ForEachEventVariant } from '..';

describe('<ForEachEventVariant />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<ForEachEventVariant {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(ForEachEventVariant).toBeDefined();
  });

  describe('#renderFirst()', () => {
    it('renders props.renderDefault if render=null', () => {
      const renderDefault = 'renderDefault';
      wrapper.setProps({
        renderDefault: () => renderDefault,
      });
      expect(instance.renderFirst(null)).toEqual(renderDefault);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    describe('#render()', () => {
      it('renders null by default', () => {
        expect(instance.render()).toBeNull();
      });
    });

    it('renders props.renderEditableForm if variant=editableForm', () => {
      const renderEditableForm = 'renderEditableForm';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.editableForm,
        renderEditableForm: jest.fn(() => renderEditableForm),
      });
      expect(instance.render()).toEqual(renderEditableForm);
    });

    it('renders props.renderLabelValueWithInfo if variant=labelValueWithHomeTime', () => {
      const renderLabelValueWithInfo = 'renderLabelValueWithInfo';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.labelValueWithHomeTime,
        renderLabelValueWithInfo: jest.fn(() => renderLabelValueWithInfo),
      });
      expect(instance.render()).toEqual(renderLabelValueWithInfo);
    });

    it('renders props.renderLabelValueStacked if variant=labelValueStacked', () => {
      const renderLabelValueStacked = 'renderLabelValueStacked';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.labelValueStacked,
        renderLabelValueStacked: jest.fn(() => renderLabelValueStacked),
      });
      expect(instance.render()).toEqual(renderLabelValueStacked);
    });

    it('renders props.renderLabelValueStacked if variant=singleLocation', () => {
      const renderSingleLocation = 'renderSingleLocation';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.LOCATION_TYPES.SingleLocation,
        renderSingleLocation: jest.fn(() => renderSingleLocation),
      });
      expect(instance.render()).toEqual(renderSingleLocation);
    });

    it('renders props.renderLabelValueStacked if variant=popper', () => {
      const renderLocationPopper = 'renderLocationPopper';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.LOCATION_TYPES.Popper,
        renderLocationPopper: jest.fn(() => renderLocationPopper),
      });
      expect(instance.render()).toEqual(renderLocationPopper);
    });

    it('renders props.renderEditableHeading if variant=editableHeading', () => {
      const renderEditableHeading = 'renderEditableHeading';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.editableHeading,
        renderEditableHeading: jest.fn(() => renderEditableHeading),
      });
      expect(instance.render()).toEqual(renderEditableHeading);
    });

    it('renders props.renderEditableHeadingForm if variant=editableHeadingForm', () => {
      const renderEditableHeadingForm = 'renderEditableHeadingForm';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.editableHeadingForm,
        renderEditableHeadingForm: jest.fn(() => renderEditableHeadingForm),
      });
      expect(instance.render()).toEqual(renderEditableHeadingForm);
    });

    it('renders props.renderField if variant=field', () => {
      const renderField = 'renderField';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.field,
        renderField: jest.fn(() => renderField),
      });
      expect(instance.render()).toEqual(renderField);
    });

    it('renders props.renderLabel if variant=label', () => {
      const renderLabel = 'renderLabel';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.label,
        renderLabel: jest.fn(() => renderLabel),
      });
      expect(instance.render()).toEqual(renderLabel);
    });

    it('renders props.renderLabelHeading if variant=labelHeading', () => {
      const renderLabelHeading = 'renderLabelHeading';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.labelHeading,
        renderLabelHeading: jest.fn(() => renderLabelHeading),
      });
      expect(instance.render()).toEqual(renderLabelHeading);
    });

    it('renders props.renderLabelValue if variant=labelValue', () => {
      const renderLabelValue = 'renderLabelValue';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.labelValue,
        renderLabelValue: jest.fn(() => renderLabelValue),
      });
      expect(instance.render()).toEqual(renderLabelValue);
    });

    it('renders props.renderLabelValueFlag if variant=labelValueFlag', () => {
      const renderLabelValueFlag = 'renderLabelValueFlag';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.labelValueFlag,
        renderLabelValueFlag: jest.fn(() => renderLabelValueFlag),
      });
      expect(instance.render()).toEqual(renderLabelValueFlag);
    });

    it('renders props.renderIcon if variant=icon', () => {
      const renderIcon = 'renderIcon';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.icon,
        renderIcon: jest.fn(() => renderIcon),
      });
      expect(instance.render()).toEqual(renderIcon);
    });

    it('renders props.renderCard if variant=card', () => {
      const renderCard = 'renderCard';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.card,
        renderCard: jest.fn(() => renderCard),
      });
      expect(instance.render()).toEqual(renderCard);
    });

    it('renders props.renderValueOnly if variant=card', () => {
      const renderValueOnly = 'renderValueOnly';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.valueOnly,
        renderValueOnly: jest.fn(() => renderValueOnly),
      });
      expect(instance.render()).toEqual(renderValueOnly);
    });

    it('renders props.renderOption if variant=option', () => {
      const renderOption = 'renderOption';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.option,
        renderOption: jest.fn(() => renderOption),
      });
      expect(instance.render()).toEqual(renderOption);
    });

    it('renders props.renderData if variant=data', () => {
      const renderData = 'renderData';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.data,
        renderData: jest.fn(() => renderData),
      });
      expect(instance.render()).toEqual(renderData);
    });

    it('renders props.renderProp if variant=renderProp', () => {
      const renderProp = 'renderProp';
      wrapper.setProps({
        variant: EVENT_CONSTANTS.VARIANTS.renderProp,
        renderProp: jest.fn(() => renderProp),
      });
      expect(instance.render()).toEqual(renderProp);
    });
  });
});
