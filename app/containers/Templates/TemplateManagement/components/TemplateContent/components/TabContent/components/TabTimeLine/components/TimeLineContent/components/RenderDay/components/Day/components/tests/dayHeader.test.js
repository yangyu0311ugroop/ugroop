import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DayHeader } from '../dayHeader';

describe('<DayHeader />', () => {
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

    rendered = shallow(<DayHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DayHeader).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderActionButtons()', () => {
    it('should return null', () => {
      rendered.setProps({ canEdit: false });

      expect(instance.renderActionButtons()).toBe(null);
    });

    it('should renderActionButtons', () => {
      rendered.setProps({ canEdit: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderActionButtons);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderActionButtons = jest.fn(() => 'renderActionButtons');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
