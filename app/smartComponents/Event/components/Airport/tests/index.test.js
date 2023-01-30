/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Airport } from '..';

describe('<Airport />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      label: 'label',
    },
    resaga: {
      dispatchTo: jest.fn(),
    },
    value: 'Some Airport',
    cityName: 'Some City',
    iataCode: 'ABC',
    timeZoneId: 'Some/Time_Zone_Id',
  });

  beforeEach(() => {
    wrapper = shallow(<Airport {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Airport).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('not calls setState if iataCode not changed', () => {
      const prevProps = { iataCode: instance.props.iataCode };
      instance.setState = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.setState).not.toBeCalled();
    });
  });

  describe('#getValue()', () => {
    it('returns state[key]', () => {
      const key = 'key';
      const value = 'value';
      instance.setState({ [key]: value });
      expect(instance.getValue(key)).toEqual(value);
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

  describe('#handleChange()', () => {
    it('sets state.cityName', () => {
      const cityName = 'Some City';
      instance.setState = jest.fn();
      instance.handleChange({ cityName });
      expect(instance.setState).toBeCalledWith({ cityName });
    });
  });

  describe('#renderTimeData()', () => {
    it('still matches snapshot if position=start', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.start });
      expect(
        toJSON(shallow(<div>{instance.renderTimeData()}</div>)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if position=end', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.end });
      expect(
        toJSON(shallow(<div>{instance.renderTimeData()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderEditable()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabel()}</div>)),
      ).toMatchSnapshot();
    });

    it('returns null if no props.iataCode', () => {
      wrapper.setProps({ iataCode: null });
      expect(instance.renderLabel()).toBeNull();
    });
  });

  describe('#renderLabelHeading()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabelHeading()}</div>)),
      ).toMatchSnapshot();
    });

    it('returns null if no props.iataCode', () => {
      wrapper.setProps({ iataCode: null });
      expect(instance.renderLabelHeading()).toBeNull();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabelValue()}</div>)),
      ).toMatchSnapshot();
    });

    it('returns null if no props.iataCode', () => {
      wrapper.setProps({ iataCode: null });
      expect(instance.renderLabelValue()).toBeNull();
    });
  });

  describe('#renderCard()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderCard()}</div>)),
      ).toMatchSnapshot();
    });

    it('returns null if no props.iataCode', () => {
      wrapper.setProps({ iataCode: null });
      expect(instance.renderCard()).toBeNull();
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
});
