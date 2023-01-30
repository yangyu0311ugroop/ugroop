/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EVENT_HELPERS } from 'utils/helpers/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightBookingFlights } from '..';

describe('<FlightBookingFlights />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    dataId: 1,
  });

  Date.now = jest.fn(() => 'now');
  EVENT_HELPERS.canCreateEvent = jest.fn(() => true);

  beforeEach(() => {
    wrapper = shallow(<FlightBookingFlights {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FlightBookingFlights).toBeDefined();
  });

  describe('#renderEditableFlights()', () => {
    it('still matches snapshot', () => {
      const flightIds = [1];
      expect(
        toJSON(shallow(<div>{instance.renderEditableFlights(flightIds)}</div>)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if no flightIds', () => {
      const flightIds = [];
      expect(
        toJSON(shallow(<div>{instance.renderEditableFlights(flightIds)}</div>)),
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

  describe('renderLabelHeading()', () => {
    it('should renderLabelHeading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabelHeading);
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
