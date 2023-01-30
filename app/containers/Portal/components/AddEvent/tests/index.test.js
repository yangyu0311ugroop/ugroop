import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddEvent } from '../index';

jest.useFakeTimers();

describe('<AddEvent />', () => {
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

    rendered = shallow(<AddEvent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddEvent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCloseDialog', () => {
    it('should set dialogOpen state to false', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleCloseDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
