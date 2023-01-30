import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TransportationForm } from '../index';

describe('<TransportationForm />', () => {
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

    rendered = shallow(<TransportationForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransportationForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
