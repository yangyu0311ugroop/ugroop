import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Ownership } from '../index';

describe('<Ownership />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Ownership />);
    instance = rendered.instance();
  });

  describe('renderAvatar', () => {
    it('should match snapshot if personUserId', () => {
      rendered.setProps({
        personUserId: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvatar);
    });
    it('should match snapshot if personNodeId', () => {
      rendered.setProps({
        personUserId: null,
        personNodeId: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvatar);
    });
    it('should return null if required props are null', () => {
      rendered.setProps({
        personUserId: null,
        personNodeId: null,
      });
      expect(instance.renderAvatar()).toEqual(null);
    });
  });

  describe('renderMessage', () => {
    it('should match snapshot if personNodeId and futureTense', () => {
      rendered.setProps({
        futureTense: true,
        personUserId: null,
        personNodeId: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMessage);
    });
  });
});
