/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { FlightBookingFlight } from '..';

describe('<FlightBookingFlight />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
  });

  Date.now = jest.fn(() => 'now');

  beforeEach(() => {
    wrapper = shallow(<FlightBookingFlight {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FlightBookingFlight).toBeDefined();
  });

  describe('#handleEditableClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleEditableClick();
    });
  });

  describe('#renderParts()', () => {
    it('still matches snapshot', () => {
      const dataId = 1;
      expect(
        toJSON(shallow(<div>{instance.renderParts(dataId)}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('renderAirports()', () => {
    it('should renderAirports', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAirports('MEL')('HAN'));
    });
  });

  describe('renderStartAirport()', () => {
    it('should renderStartAirport', () => {
      instance.renderAirports = jest.fn(() => 'renderAirports');

      TEST_HELPERS.expectMatchSnapshot(instance.renderStartAirport(12)());
    });
  });

  describe('renderHeadingParts()', () => {
    it('should renderHeadingParts', () => {
      instance.renderPart = jest.fn(() => 'renderPart');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeadingParts);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot labelHeading', () => {
      instance.renderHeadingParts = jest.fn(() => 'renderHeadingParts');
      wrapper.setProps({ variant: 'labelHeading' });

      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
