import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightButton } from '../index';

describe('<FlightButton />', () => {
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

    rendered = shallow(<FlightButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FlightButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick()', () => {
    it('should handleClick()', () => {
      const onClick = jest.fn();

      rendered.setProps({ onClick });

      instance.handleClick();

      TEST_HELPERS.expectCalled(onClick);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
