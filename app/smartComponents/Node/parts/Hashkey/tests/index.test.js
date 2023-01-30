import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Hashkey } from '../index';

describe('<Hashkey />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Hashkey {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Hashkey).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('copy()', () => {
    it('should copy()', () => {
      instance.copy();

      expect(rendered.state().copied).toBe(true);
    });
  });

  describe('resetCopy()', () => {
    it('should resetCopy()', () => {
      instance.resetCopy();

      expect(rendered.state().copied).toBe(false);
    });
  });

  describe('hashkey()', () => {
    it('should return null', () => {
      rendered.setProps({ hashkey: '' });

      expect(instance.render()).toBe(null);
    });

    it('should hashkey', () => {
      rendered.setProps({ hashkey: '2323', expand: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
