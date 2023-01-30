import { shallow } from 'enzyme';
import React from 'react';
import { GoogleMap } from '../index';

describe('<GoogleMap />', () => {
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

    rendered = shallow(<GoogleMap {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(GoogleMap).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render something', () => {
      expect(instance.render()).not.toBe(null);
    });
  });
});
