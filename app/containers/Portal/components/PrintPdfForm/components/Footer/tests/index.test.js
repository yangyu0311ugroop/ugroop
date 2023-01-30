import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Footer } from '../index';

describe('<Footer />', () => {
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

    rendered = shallow(<Footer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Footer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('renderFooterPage()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFooterPage, [
        { pageNumber: 1, totalPages: 1 },
      ]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
