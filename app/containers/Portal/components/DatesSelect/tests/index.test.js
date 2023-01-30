import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DatesSelect } from '../index';

describe('<DatesSelect />', () => {
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

    rendered = shallow(<DatesSelect {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DatesSelect).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCloseDialog()', () => {
    it('should setState', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleCloseDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should return null', () => {
      expect(instance.handleValidSubmit(123)).toBe(123);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
