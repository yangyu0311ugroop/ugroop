import { shallow } from 'enzyme';
import React from 'react';
import utils from 'datastore/utils';
import { Pub } from '..';

describe('<Pub />', () => {
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
    },
  });
  let props;

  beforeEach(() => {
    utils.removeIdInArrayInsideObject = jest.fn(() => 1);
    utils.removeObjectById = jest.fn(() => 1);
    props = makeProps();
    wrapper = shallow(<Pub {...props} />);
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
});
