import { shallow } from 'enzyme';
import React from 'react';
import iconUtils from 'smartComponents/Event/components/Event/parts/Event/Icon/utils';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { SelectEventIcon } from '../index';

describe('<SelectEventIcon />', () => {
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

    rendered = shallow(<SelectEventIcon {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SelectEventIcon).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('selectMenu()', () => {
    it('should selectMenu()', () => {
      instance.selectMenu({ value: 123 })();

      expect(rendered.state().iconOverride).toBe(123);
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu', () => {
      iconUtils.iconOptions = jest.fn(() => [
        { value: 'icon' },
        [{ value: 'selected' }],
      ]);

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [
        { iconOverride: 'selected' },
      ]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
