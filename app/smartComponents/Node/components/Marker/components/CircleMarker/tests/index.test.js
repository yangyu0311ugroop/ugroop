import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CircleMarker } from 'smartComponents/Node/components/Marker/components/CircleMarker/index';

describe('<CircleMarker />', () => {
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

    rendered = shallow(<CircleMarker {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CircleMarker).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderLine()', () => {
    it('should renderLine', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLine);
    });
  });

  describe('renderDestination()', () => {
    it('should renderDestination', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDestination);
    });

    it('should renderDestination', () => {
      instance.renderLine = jest.fn(() => 'renderLine');
      rendered.setProps({ active: true, line: true });

      instance.renderDestination();

      TEST_HELPERS.expectCalled(instance.renderLine);
    });
  });

  describe('renderWaypoint()', () => {
    it('should renderWaypoint', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderWaypoint);
    });

    it('should renderWaypoint with line', () => {
      instance.renderLine = jest.fn(() => 'renderLine');
      rendered.setProps({ active: true, line: true });

      instance.renderDestination();

      TEST_HELPERS.expectCalled(instance.renderLine);
    });
  });

  describe('render()', () => {
    it('should renderWaypoint', () => {
      instance.renderWaypoint = jest.fn(() => 'renderWaypoint');

      TEST_HELPERS.toBe(instance.render, 'renderWaypoint');
    });

    it('should renderDestination', () => {
      instance.renderDestination = jest.fn(() => 'renderDestination');
      rendered.setProps({ destination: true, hovered: false });

      TEST_HELPERS.toBe(instance.render, 'renderDestination');
    });
  });
});
