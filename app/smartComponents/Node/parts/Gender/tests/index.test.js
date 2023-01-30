import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { Gender } from '../index';

describe('<Gender />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Gender classes={{}} />);
    instance = rendered.instance();
  });

  describe('getValue', () => {
    it('should return value', () => {
      rendered.setProps({
        value: true,
      });
      expect(instance.getValue()).toBe(true);
    });
    it('should return userValue', () => {
      rendered.setProps({
        value: false,
        userValue: 1,
      });
      expect(instance.getValue()).toEqual(1);
    });
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderExtraEditableOptions', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        userValue: 'male',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderExtraEditableOptions);
    });
  });

  describe('renderEditableValue', () => {
    it('should return gender options', () => {
      instance.getValue = jest.fn(() => 'male');
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableValue());
    });
    it('should return value', () => {
      instance.getValue = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableValue());
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot if userConnected && userValue', () => {
      rendered.setProps({
        userConnected: true,
        userValue: true,
      });
      instance.getPersonProps = jest.fn(() => {});
      instance.renderExtraEditableOptions = jest.fn(
        () => 'renderExtraEditableOptions',
      );
      instance.renderEditableValue = jest.fn(() => 'renderEditableValue');
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
    it('should return renderDefault', () => {
      instance.renderDefault = jest.fn(() => 'default');
      rendered.setProps({
        userConnected: false,
        userValue: false,
      });
      expect(instance.renderEditable()).toEqual('default');
    });
  });
});
