/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FlightStartEnd } from '..';

describe('<FlightStartEnd />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      fieldRowTitleItem: 'fieldRowTitleItem',
      time: 'time',
    },
  });

  beforeEach(() => {
    wrapper = shallow(<FlightStartEnd {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(FlightStartEnd).toBeDefined();
  });

  describe('#handleStartAirportChange()', () => {
    it('sets state.start', () => {
      instance.setState = jest.fn();
      const change = { x: 1 };
      instance.handleStartAirportChange(change);
      expect(instance.setState).toBeCalledWith({ start: { ...change } });
    });
  });

  describe('#handleEndAirportChange()', () => {
    it('sets state.end', () => {
      instance.setState = jest.fn();
      const change = { x: 1 };
      instance.handleEndAirportChange(change);
      expect(instance.setState).toBeCalledWith({ end: { ...change } });
    });
  });

  describe('#renderFieldRowItem()', () => {
    it('still matches snapshot with no subtitle', () => {
      const title = 'title';
      const subtitle = null;
      expect(
        toJSON(
          shallow(<div>{instance.renderFieldRowItem(title, subtitle)}</div>),
        ),
      ).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      instance.setState({
        start: { cityName: 'startCityName' },
        end: { cityName: 'endCityName' },
      });
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
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

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
