import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DisableRyi } from '../index';

describe('<DisableRyi />', () => {
  let rendered;
  let instance;

  const resaga = {
    id: 2233,
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<DisableRyi {...props} />);
    instance = rendered.instance();
  });

  /* describe('isEmpty()', () => {
    it('should return true #1', () => {
      expect(instance.renderDefault()).toBe(true);
    });

    it('should return true #2', () => {
      expect(instance.isEmpty(EMPTY_RTE)).toBe(true);
    });

    it('should return false', () => {
      expect(instance.isEmpty('some value')).toBe(false);
    });
  }); */

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault, []);
    });
  });

  describe('renderButtonText()', () => {
    it('should renderButtonText', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButtonText, [{}, {}]);
    });
  });
  describe('finishEdit()', () => {
    it('should finishEdit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.finishEdit, [{}, {}]);
    });
  });
  describe('onClick()', () => {
    it('should finishEdit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.onClick, [{}, {}]);
    });
  });
});
