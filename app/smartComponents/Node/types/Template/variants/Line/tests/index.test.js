import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Line } from '../index';

describe('<Line />', () => {
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
    rendered = shallow(<Line {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Line).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isActive()', () => {
    it('should isActive()', () => {
      expect(instance.isActive()).toBe(false);
    });
  });

  describe('handleClickTour()', () => {
    it('should handleClickTour', () => {
      const onClick = jest.fn();
      rendered.setProps({ onClick });

      instance.handleClickTour();

      expect(onClick).toBeCalled();
    });
  });

  describe('renderStarButton()', () => {
    it('should renderStarButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderStarButton, [{}]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
