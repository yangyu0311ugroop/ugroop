import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NONE, STARTDATE, WEEK_DAY } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DAY } from 'utils/modelConstants';
import { InsertNode } from '../index';

describe('<InsertNode />', () => {
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
    rendered = shallow(<InsertNode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InsertNode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('startDateChanged()', () => {
    it('should startDateChanged()', () => {
      rendered.setProps({ startDate: true, insertBefore: 11, firstChild: 11 });
      instance.type = jest.fn(() => DAY);

      expect(instance.startDateChanged()).toBe(true);
    });
  });

  describe('insertBefore()', () => {
    it('should return null', () => {
      instance.isLoading = jest.fn(() => true);

      expect(instance.insertBefore()).toBe(null);
    });

    it('should insertBefore()', () => {
      instance.insertBefore();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });

    it('should call handleChangeStartDate()', () => {
      instance.startDateChanged = jest.fn(() => true);
      instance.handleChangeStartDate = jest.fn();
      instance.handleInsertBefore = jest.fn();

      instance.insertBefore();

      TEST_HELPERS.expectCalled(instance.startDateChanged);
      TEST_HELPERS.expectCalled(instance.handleChangeStartDate);
      TEST_HELPERS.expectCalled(instance.handleInsertBefore);
    });
  });

  describe('insertAfter()', () => {
    it('should return null', () => {
      instance.isLoading = jest.fn(() => true);

      expect(instance.insertAfter()).toBe(null);
    });

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

  describe('changeStartDate()', () => {
    it('should changeStartDate()', () => {
      instance.changeStartDate({ node: 222 });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('handleChangeStartDate()', () => {
    it('should return null', () => {
      rendered.setProps({ displayDate: NONE });

      expect(instance.handleChangeStartDate()).toBe(null);
    });

    it('should return false', () => {
      rendered.setProps({ displayDate: 'something else' });

      expect(instance.handleChangeStartDate()).toBe(false);
    });

    it('should changeStartDate STARTDATE', () => {
      rendered.setProps({ startDate: 1, displayDate: STARTDATE });
      instance.changeStartDate = jest.fn();

      instance.handleChangeStartDate({ node: 1 });

      TEST_HELPERS.expectCalled(instance.changeStartDate);
    });

    it('should changeStartDate WEEK_DAY', () => {
      rendered.setProps({ startDate: 1, displayDate: WEEK_DAY, weekDay: 1 });
      instance.changeStartDate = jest.fn();

      instance.handleChangeStartDate({ node: 1 });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.changeStartDate);
    });
  });

  describe('updateParentTimes()', () => {
    it('should shouldGetTimes', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();

      instance.updateParentTimes(true)();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.getTreeAndTimes);
    });

    it('should not shouldGetTimes', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();

      instance.updateParentTimes(false)();

      TEST_HELPERS.expectNotCalled(NODE_API_HELPERS.getTreeAndTimes);
    });
  });

  describe('renderInsertButton()', () => {
    it('should return null', () => {
      const renderButton = jest.fn(() => 'renderButton');
      rendered.setProps({ renderButton });

      expect(instance.renderInsertButton()).toBe('renderButton');

      TEST_HELPERS.expectCalledAndMatchSnapshot(renderButton);
    });

    it('should renderInsertButton children', () => {
      rendered.setProps({ children: 'children' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderInsertButton);
    });

    it('should renderInsertButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderInsertButton);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
