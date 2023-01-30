/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { Type } from '..';

describe('<Type />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Type {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Type).toBeDefined();
  });

  describe('#renderType()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderType(Component)()).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('renders Component', () => {
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });
  });

  describe('#renderData()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderData()).toMatchSnapshot();
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
    it('should renderValueOnly', () => {
      EVENT_HELPERS.getEventTypeConstants = jest.fn(() => ({
        name: 'EVENT_HELPERS.getEventTypeConstants',
      }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderValueOnly);
    });
  });
});
