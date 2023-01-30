import { shallow } from 'enzyme';
import React from 'react';
import utils from 'datastore/utils';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Template } from '..';

describe('<Template />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;
  const orig = {
    removeIdInArrayInsideObject: utils.removeIdInArrayInsideObject,
    removeObjectById: utils.removeObjectById,
  };

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(),
      analyse: jest.fn(
        (nextProps, requests) =>
          doResagaSnapshot &&
          expect({ analyse: { nextProps, requests } }).toMatchSnapshot(),
      ),
      dispatch: jest.fn(),
    },
  });
  let props;

  beforeEach(() => {
    utils.removeIdInArrayInsideObject = jest.fn(() => 1);
    utils.removeObjectById = jest.fn(() => 1);
    props = makeProps();
    wrapper = shallow(<Template {...props} />);
    instance = wrapper.instance();
    doResagaSnapshot = true;
    jest.clearAllMocks();
  });

  afterEach(() => {
    utils.removeIdInArrayInsideObject = orig.removeIdInArrayInsideObject;
    utils.removeObjectById = orig.removeObjectById;
  });

  it('exists', () => {
    expect(Node).toBeDefined();
  });

  describe('#componentWillReceiveProps()', () => {
    it('still matches snapshot', () => {
      instance.componentWillReceiveProps(null);
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('returns false', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('renders nothing', () => {
      expect(instance.render()).toBeNull();
    });
  });

  describe('onHashKeySuccess()', () => {
    it('should onHashKeySuccess()', () => {
      instance.handleSetHashkey = jest.fn(() => '');

      instance.onHashKeySuccess({ hashkey: 'hashkey' }, { id: 2233 });

      TEST_HELPERS.expectCalled(instance.handleSetHashkey);
    });

    it('should not call onHashKeySuccess()', () => {
      instance.handleSetHashkey = jest.fn(() => '');

      instance.onHashKeySuccess({ hashkey: '' }, { id: 2233 });

      TEST_HELPERS.expectNotCalled(instance.handleSetHashkey);
    });
  });

  describe('onHashKeyError()', () => {
    it('should onHashKeyError()', () => {
      instance.handleSetHashkey = jest.fn(() => '');

      instance.onHashKeyError({ hashkey: 'hashkey' }, { id: 2233 });

      TEST_HELPERS.expectCalled(instance.handleSetHashkey);
    });
  });

  describe('onRemovedHashKeySuccess()', () => {
    it('should onRemovedHashKeySuccess()', () => {
      instance.handleSetHashkey = jest.fn(() => '');

      instance.onRemovedHashKeySuccess({ count: 1 }, { id: 2233 });

      TEST_HELPERS.expectCalled(instance.handleSetHashkey);
    });

    it('should not call onRemovedHashKeySuccess()', () => {
      instance.handleSetHashkey = jest.fn(() => '');

      instance.onRemovedHashKeySuccess({ count: 0 }, { id: 2233 });

      TEST_HELPERS.expectNotCalled(instance.handleSetHashkey);
    });
  });

  describe('handleSetHashkey()', () => {
    it('should handleSetHashkey()', () => {
      doResagaSnapshot = true;

      instance.handleSetHashkey(2233);
    });
  });
});
