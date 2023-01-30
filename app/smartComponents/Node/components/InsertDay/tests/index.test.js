import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { InsertDay } from '../index';

describe('<InsertDay />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    insertBefore: 22,
    insertAfter: 33,
    parentId: 2233,
  };

  beforeEach(() => {
    rendered = shallow(<InsertDay {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InsertDay).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('insertBefore()', () => {
    it('should insertBefore()', () => {
      instance.insertBefore();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('insertAfter()', () => {
    it('should insertAfter()', () => {
      instance.insertAfter();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('handleInsert()', () => {
    it('should insertAfter()', () => {
      rendered.setProps({ insertAfter: 1, insertBefore: 0 });

      instance.insertAfter = jest.fn(() => 'insertAfter');

      expect(instance.handleInsert()).toBe('insertAfter');
    });

    it('should insertBefore()', () => {
      rendered.setProps({ insertAfter: 0, insertBefore: 1 });

      instance.insertBefore = jest.fn(() => 'insertBefore');

      expect(instance.handleInsert()).toBe('insertBefore');
    });
  });

  describe('updateTimes()', () => {
    it('should updateTimes()', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();

      instance.updateTimes();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        NODE_API_HELPERS.getTreeAndTimes,
      );
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render children', () => {
      rendered.setProps({ children: jest.fn(() => 'children') });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
