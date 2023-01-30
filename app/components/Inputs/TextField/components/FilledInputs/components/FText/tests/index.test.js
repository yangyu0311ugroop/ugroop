import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FText } from '../index';

describe('<FText />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const getValue = jest.fn(() => '1');
  const setValue = jest.fn();
  const name = 'name';

  const props = {
    classes: {},
    resaga,
    getValue,
    setValue,
    name,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<FText {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FText).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidUpdate()', () => {
    it('should componentDidUpdate()', () => {
      rendered.setProps({ forceValue: '1' });
      instance.setValue = jest.fn();

      instance.componentDidUpdate({ forceValue: '2' });

      TEST_HELPERS.expectCalled(instance.setValue);
    });

    it('should NOT componentDidUpdate()', () => {
      rendered.setProps({ forceValue: '1' });
      instance.setValue = jest.fn();

      instance.componentDidUpdate({ forceValue: '1' });

      TEST_HELPERS.expectNotCalled(instance.setValue);
    });
  });

  describe('changeValue()', () => {
    it('should changeValue()', () => {
      instance.setValue = jest.fn();

      instance.changeValue({ currentTarget: { value: '2' } });

      TEST_HELPERS.expectCalled(instance.setValue);
    });
  });

  describe('setValue()', () => {
    it('should return null', () => {
      expect(instance.setValue('1')).toBe(null);
    });

    it('should setValue', () => {
      instance.setValue('2');

      TEST_HELPERS.expectCalled(setValue);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
