/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EVENT_UTILS } from 'utils/events';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import GoogleMaps from 'utils/hoc/withGoogleMaps';
import { Location } from '..';

describe('<Location />', () => {
  let wrapper;
  let instance;
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  const makeProps = () => ({
    resaga,
    value: 'Some Airport',
    icon: 'someIcon',
    placeId: 'somePlaceId',
    timeZoneId: 'Some/Time_Zone_Id',
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Location {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Location).toBeDefined();
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

  describe('handleViewMap', () => {
    it('should stop propagating the event', () => {
      const mockEv = {
        stopPropagation: jest.fn(),
      };

      instance.handleViewMap(mockEv);

      expect(mockEv.stopPropagation).toBeCalled();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabelValue()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabelValue()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('renders value if not props.readOnly', () => {
      const value = 'value';
      expect(instance.renderEditableValue(value)).toMatchSnapshot();
    });

    it('renders null if props.readOnly', () => {
      wrapper.setProps({ readOnly: true });
      expect(instance.renderEditableValue()).toBeNull();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot if props.readOnly', () => {
      wrapper.setProps({ readOnly: true });
      expect(
        toJSON(shallow(<div>{instance.renderEditable()}</div>)),
      ).toMatchSnapshot();
    });
    it('should return null', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => true);
      expect(instance.renderEditable()).toEqual(null);
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
    });
  });
  describe('onSelect', () => {
    it('setValue should be called', () => {
      instance.onSelect('formPlaceId')({
        place_id: '123123-123123',
      });

      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('handleOnClear', () => {
    it('onSelect should be called', () => {
      instance.onSelect = jest.fn(() => jest.fn());
      instance.handleOnClear();
      expect(instance.onSelect).toBeCalled();
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

  describe('renderMenuItem', () => {
    it('should render button that redirect to google maps via google map url', () => {
      const snapshot = shallow(
        <div>{instance.renderMenuItem('name', 'placeId')}</div>,
      )
        .find(GoogleMaps)
        .renderProp('children')({
        url: 'google maps',
      });
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSingleLocation', () => {
    it('should render button that redirect to google maps via google map url', () => {
      const snapshot = shallow(<div>{instance.renderSingleLocation()}</div>)
        .find(GoogleMaps)
        .renderProp('children')({
        url: 'google maps',
      });
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderNoLocation if no placeId', () => {
      instance.renderNoLocation = jest.fn(() => 'renderNoLocation');
      wrapper.setProps({
        placeId: null,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSingleLocation);
    });
  });

  describe('renderNoLocation', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNoLocation);
    });
  });

  describe('renderDirectionLink', () => {
    it('should renderCyclingDirection', () => {
      wrapper.setProps({
        isCycling: true,
      });
      instance.renderCyclingDirection = jest.fn(() => 'renderCyclingDirection');
      TEST_HELPERS.expectMatchSnapshot(instance.renderDirectionLink);
    });
    it('should renderNoLocation', () => {
      wrapper.setProps({
        isCycling: false,
        startName: null,
        endName: null,
      });
      instance.renderNoLocation = jest.fn(() => 'renderNoLocation');
      TEST_HELPERS.expectMatchSnapshot(instance.renderDirectionLink);
    });
    it('should renderMenuItem if there is only startName', () => {
      wrapper.setProps({
        isCycling: false,
        startName: 'Manila',
        endName: null,
      });
      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');
      TEST_HELPERS.expectMatchSnapshot(instance.renderDirectionLink);
    });
    it('should renderMenuItem if there is only endName', () => {
      wrapper.setProps({
        isCycling: false,
        startName: null,
        endName: 'Manila',
      });
      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');
      TEST_HELPERS.expectMatchSnapshot(instance.renderDirectionLink);
    });
    it('should renderDirectionLinkButton', () => {
      instance.renderDirectionLinkButton = jest.fn(
        () => 'renderDirectionLinkButton',
      );
      wrapper.setProps({
        isCycling: false,
        startName: 'Manila',
        endName: 'Manila',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDirectionLink);
    });
  });

  describe('renderCyclingDirection', () => {
    it('should renderNoLocation', () => {
      const start = JSON.stringify({
        name: null,
      });
      const end = JSON.stringify({
        name: null,
      });
      const values = [start, end];
      wrapper.setProps({
        values,
      });
      instance.renderNoLocation = jest.fn(() => 'renderNoLocation');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCyclingDirection);
    });
    it('should renderMenuItem if there is only startName', () => {
      const start = JSON.stringify({
        name: 'Manila',
      });
      const end = JSON.stringify({
        name: null,
      });
      const values = [start, end];
      wrapper.setProps({
        values,
      });
      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCyclingDirection);
    });
    it('should renderMenuItem if there is only endName', () => {
      const start = JSON.stringify({
        name: null,
      });
      const end = JSON.stringify({
        name: 'Manila',
      });
      const values = [start, end];
      wrapper.setProps({
        values,
      });
      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCyclingDirection);
    });
    it('should renderDirectionLinkButton', () => {
      const start = JSON.stringify({
        name: 'QC',
      });
      const end = JSON.stringify({
        name: 'Manila',
      });
      const values = [start, end];
      wrapper.setProps({
        values,
      });
      instance.renderDirectionLinkButton = jest.fn(
        () => 'renderDirectionLinkButton',
      );
      TEST_HELPERS.expectMatchSnapshot(instance.renderCyclingDirection);
    });
  });
  describe('renderDirectionLinkButton', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderDirectionLinkButton('Manila', 'QC', 'walking'),
      );
    });
  });
});
