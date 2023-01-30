import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MoveDialog } from '../index';

describe('<MoveDialog />', () => {
  let rendered;
  let instance;
  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<MoveDialog {...props} />);
    instance = rendered.instance();
  });

  describe('renderValue', () => {
    it('should return value', () => {
      expect(instance.renderValue(1)).toEqual(1);
    });
  });

  describe('renderDialogContent', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        participantId: 1,
        fromId: 2,
        toId: 3,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDialogContent);
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      instance.renderDialogContent = jest.fn(() => 'renderDialogContent');
      rendered.setProps({
        open: true,
        closeMoveDialog: jest.fn(),
        confirmMove: jest.fn(),
      });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
