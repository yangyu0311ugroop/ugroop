import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ParticipantPassport } from '../index';

describe('<ParticipantPassport />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<ParticipantPassport />);
    instance = rendered.instance();
  });

  describe('getRestProps', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getRestProps);
    });
  });

  describe('renderItem', () => {
    it('should match snapshot if there is id', () => {
      const snap = shallow(<div>{instance.renderItem({ id: 1 })}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null if there is no id', () => {
      const snap = shallow(<div>{instance.renderItem({ id: null })}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
