/**
 * Created by stephenkarpinskyj on 27/6/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EVENT_CONSTANTS } from 'utils/constants/events';
import { NODE_POSITIONS } from 'utils/constants/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EventIcon } from '../index';

describe('<UGEventIcon />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      bold: 'bold',
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(<EventIcon {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(EventIcon).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('render nothing when no type or subtype', () => {
      expect(toJSON(wrapper)).toEqual('');
    });

    it('still matches snapshot with bold icon', () => {
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.ACTIVITY.type,
        subtype: EVENT_CONSTANTS.ACTIVITIES.FOOD.type,
        bold: true,
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render start', () => {
      wrapper.setProps({ position: NODE_POSITIONS.start });
      instance.getShouldRender = jest.fn(() => true);
      instance.showSubIcon = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render end', () => {
      wrapper.setProps({ position: NODE_POSITIONS.end });
      instance.showSubIcon = jest.fn(() => true);
      instance.getShouldRender = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render normal', () => {
      wrapper.setProps({ position: NODE_POSITIONS.middle });
      instance.showSubIcon = jest.fn(() => true);
      instance.getShouldRender = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
