import { EMPTY_RTE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Description } from '../index';

describe('<Description />', () => {
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
    rendered = shallow(<Description {...props} />);
    instance = rendered.instance();
  });

  describe('isEmpty()', () => {
    it('should return true #1', () => {
      expect(instance.isEmpty('')).toBe(true);
    });

    it('should return true #2', () => {
      expect(instance.isEmpty(EMPTY_RTE)).toBe(true);
    });

    it('should return false', () => {
      expect(instance.isEmpty('some value')).toBe(false);
    });
  });

  describe('renderView()', () => {
    it('should return null', () => {
      expect(instance.renderView({ showEmpty: false })).toBe(null);
    });

    it('should renderView', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderView, [
        { value: 'some value' },
      ]);
    });
  });

  describe('renderEdit()', () => {
    it('should renderEdit', () => {
      instance.renderEdit({}, {});
    });
  });

  describe('render editable rte()', () => {
    it('should render correctly', () => {
      rendered.setProps({ useEditableRTE: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
