/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import DayTimeInput from '../components/DayTimeInput';
import DurationInput from '../components/DurationInput';
import MultiInput from '../components/MultiInput';
import { Time } from '..';

describe('<Time />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    resaga: {
      dispatchTo: jest.fn(),
    },
    id: 1,
    templateId: 2,
    inputs: {
      value: { name: 'value' },
      mode: { name: 'mode' },
      timeZoneId: { name: 'timeZoneId' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<Time {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Time).toBeDefined();
  });

  describe('#getInputComponent()', () => {
    it('returns DayTimeInput if formBatchCreate', () => {
      wrapper.setProps({ formBatchCreate: true });
      expect(instance.getInputComponent()).toBe(DayTimeInput);
    });

    it('returns MultiInput if multiMode and mode is relative', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relative;
      wrapper.setProps({ multiMode: true });
      expect(instance.getInputComponent(mode)).toBe(MultiInput);
    });

    it('returns DurationInput if relativeToStart', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relativeStart;
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.end });
      expect(instance.getInputComponent(mode)).toBe(DurationInput);
    });

    it('returns DayTimeInput by default', () => {
      expect(instance.getInputComponent()).toBe(DayTimeInput);
    });
  });

  describe('#hasEditableValue()', () => {
    it('returns correctly', () => {
      wrapper.setProps({ value: 'some value' });
      expect(instance.hasEditableValue()).toBe(true);
    });
  });

  describe('#handleSubmit()', () => {
    const model = { x: 1 };

    beforeEach(() => {
      const templateId = 1;
      const id = 2;
      wrapper.setProps({ templateId, id });
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
    });

    it('calls TEMPLATE_API_HELPERS.patchEvent if changed', () => {
      instance.handleSubmit({ model });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });

    it('calls updateTimes on success', () => {
      instance.updateTimes = jest.fn();
      instance.handleSubmit({ model });
      TEMPLATE_API_HELPERS.patchEvent.mock.calls[0][0].onSuccess();
      expect(instance.updateTimes).toBeCalled();
    });

    it('calls onSuccess on success', () => {
      const onSuccess = jest.fn();
      instance.handleSubmit({ model, onSuccess });
      TEMPLATE_API_HELPERS.patchEvent.mock.calls[0][0].onSuccess();
      expect(onSuccess).toBeCalled();
    });
  });

  describe('#renderParentNodeId()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.start });
      expect(instance.renderParentNodeId()).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot', () => {
      const calculatedTime = MOMENT_HELPERS.createUtc(
        '2018-01-01T00:00:00.000Z',
      );
      wrapper.setProps({ calculatedTime });
      expect(instance.renderEditableValue()).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderEditable()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderInput()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderInput()).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('equals renderInput', () => {
      expect(instance.renderField).toEqual(instance.renderInput);
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabel()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabelValue()}</div>)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if hasTimeComponent returns false', () => {
      NODE_HELPERS.hasTimeComponent = jest.fn(() => false);
      expect(
        toJSON(shallow(<div>{instance.renderLabelValue()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderData()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderData()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('renderValueOnly()', () => {
    it('should return null', () => {
      NODE_HELPERS.hasTimeComponent = jest.fn(() => false);

      expect(instance.renderValueOnly()).toBe(null);
    });

    it('should renderValueOnly', () => {
      NODE_HELPERS.hasTimeComponent = jest.fn(() => true);
      NODE_HELPERS.renderTime = jest.fn(() => 'renderTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderValueOnly);
    });
  });

  describe('renderProp()', () => {
    it('should renderProp', () => {
      const children = jest.fn();
      wrapper.setProps({ children });

      instance.renderProp();

      TEST_HELPERS.expectCalled(children);
    });
  });
});
