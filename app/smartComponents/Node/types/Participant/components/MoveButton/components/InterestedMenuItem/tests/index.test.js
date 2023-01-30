import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { InterestedMenuItem } from '../index';

describe('<InterestedMenuItem />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<InterestedMenuItem classes={{}} />);
    instance = rendered.instance();
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPart);
    });
  });

  describe('renderRowValue', () => {
    it('should match snapshot if there is userId', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowValue('value', 1));
    });
    it('should match snapshot if there is no userId', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowValue('value', null));
    });
  });

  describe('render', () => {
    it('should match snapshot if id is not equal to participantParentId', () => {
      rendered.setProps({
        id: 1,
        participantParentId: 2,
        openDialog: jest.fn(),
      });
      instance.renderPart = jest.fn(() => 'renderPart');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should return null if id is equal to participantParentId', () => {
      rendered.setProps({
        id: 1,
        participantParentId: 1,
        openDialog: jest.fn(),
      });
      expect(instance.render()).toEqual(null);
    });
  });
});
