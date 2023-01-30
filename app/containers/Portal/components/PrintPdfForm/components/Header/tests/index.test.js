import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Header } from '../index';

describe('<Header />', () => {
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

    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('subTitle()', () => {
    it('should render', () => {
      rendered.setProps({ showLegend: false });
      TEST_HELPERS.expectMatchSnapshot(instance.subTitle);
    });
  });
  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
