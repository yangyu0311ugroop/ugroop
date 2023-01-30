import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { JLocation } from '../index';

describe('<JLocation />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const event = {
    target: { value: 'input' },
  };
  const eventEmpty = {
    target: { value: '' },
  };
  const findPlaces = jest.fn();
  const findTimeZone = jest.fn();
  const findDetail = jest.fn();
  const props = {
    classes: {},
    resaga,
    findPlaces,
    findTimeZone,
    findDetail,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<JLocation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(JLocation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps()', () => {
      rendered.setProps({ timestamp: 123 });
      rendered.setState({ geocode: { lat: 1, lng: 2 } });

      instance.findTimeZoneCallback = jest.fn();

      instance.componentWillReceiveProps({ timestamp: 124 });

      TEST_HELPERS.expectCalled(findTimeZone);
      TEST_HELPERS.expectCalled(instance.findTimeZoneCallback);
    });
  });

  describe('componentDidMount', () => {
    it('should call findPlaceDetail if isEditMode is true', () => {
      instance.findPlaceDetail = jest.fn();
      rendered.setProps({
        isEditMode: true,
      });

      instance.componentDidMount();

      expect(instance.findPlaceDetail).toBeCalled();
    });

    it('should call defaultValue', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      rendered.setProps({
        defaultValue: 'hanoi',
      });

      instance.componentDidMount();

      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
    });

    it('should not call findPlaceDetail if isEditMode is false', () => {
      instance.findPlaceDetail = jest.fn();
      rendered.setProps({
        isEditMode: false,
      });

      instance.componentDidMount();

      expect(instance.findPlaceDetail).not.toBeCalled();
    });
  });

  describe('handleClear()', () => {
    it('should handleClear() !input', () => {
      instance.clearData = jest.fn(() => '');

      instance.handleClear();

      TEST_HELPERS.expectCalled(instance.clearData);
    });

    it('should handleClear() input', () => {
      instance.clearData = jest.fn(() => '');
      instance.input = { focus: jest.fn(() => '') };

      instance.handleClear();

      TEST_HELPERS.expectCalled(instance.clearData);
      TEST_HELPERS.expectCalled(instance.input.focus);
    });
  });

  describe('handleRef()', () => {
    it('should handleRef()', () => {
      instance.handleRef(123);

      expect(instance.input).toBe(123);
    });
  });

  describe('ownProps()', () => {
    it('should ownProps()', () => {
      expect(instance.ownProps()).toBeDefined();
    });
  });

  describe('clearData()', () => {
    it('should clearData() selectedIndex', () => {
      rendered.setState({ inputValue: '123', selectedIndex: 1 });

      instance.clearData();

      expect(rendered.state().inputValue).toBe('123');
      expect(rendered.state().loading).toBe(false);
    });

    it('should clearData() selectedIndex -1', () => {
      rendered.setState({ selectedIndex: -1 });

      instance.clearData();

      expect(rendered.state().inputValue).toBe('');
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('fetchPlaces()', () => {
    it('should fetchPlaces() !input', () => {
      rendered.setProps({});
      instance.mockFunction = jest.fn(() => '');

      instance.fetchPlaces()(eventEmpty);

      expect(rendered.state().loading).toBe(false);
    });

    it('should fetchPlaces() input', () => {
      rendered.setProps({});
      instance.mockFunction = jest.fn(() => '');

      instance.fetchPlaces()(event);

      expect(rendered.state().loading).toBe(true);
    });
  });

  describe('fetchPlacesCallback()', () => {
    it('should fetchPlacesCallback() INVALID', () => {
      instance.fetchPlacesCallback([], 'INVALID');

      expect(rendered.state().suggestions).toEqual([]);
      expect(rendered.state().selectedIndex).toEqual(-1);
    });

    it('should fetchPlacesCallback() INVALID', () => {
      instance.fetchPlacesCallback(
        [
          {
            place_id: 'place_id',
            structured_formatting: {
              main_text: 'main',
              secondary_text: 'secondary',
            },
            distance_meters: 'distance_meters',
            types: 'types',
          },
        ],
        'OK',
      );

      expect(rendered.state().suggestions).toBeDefined();
    });
  });

  describe('handleBlur()', () => {
    it('should return null', () => {
      rendered.setState({ inputValue: 'abc' });

      expect(instance.handleBlur({})()).toBe(null);
    });

    it('should handleBlur()', () => {
      rendered.setState({ inputValue: '' });
      instance.clearData = jest.fn(() => '');

      instance.handleBlur({})();

      TEST_HELPERS.expectCalled(instance.clearData);
    });
  });

  describe('handleFocus()', () => {
    it('should handleFocus()', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.handleFocus({})();

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('selectSuggestion()', () => {
    it('should selectSuggestion()', () => {
      rendered.setState({ suggestions: [1, 2] });
      instance.findPlaceDetail = jest.fn(() => '');

      instance.selectSuggestion({ index: 0 })();

      TEST_HELPERS.expectCalled(instance.findPlaceDetail);
    });

    it('should selectSuggestion() invalid index', () => {
      rendered.setState({ suggestions: [1, 2] });
      instance.findPlaceDetail = jest.fn(() => '');

      instance.selectSuggestion({ index: 3 })();

      TEST_HELPERS.expectNotCalled(instance.findPlaceDetail);
    });
  });

  describe('findPlaceDetail()', () => {
    it('should findPlaceDetail() -1', () => {
      expect(instance.findPlaceDetail(-1)).toBe(null);
    });

    it('should findPlaceDetail() !suggestion', () => {
      rendered.setState({ suggestions: [1, 2] });

      expect(instance.findPlaceDetail(2)).toBe(null);
    });

    it('should use placeId from props when isEditMode is true', () => {
      rendered.setProps({ isEditMode: true, placeId: 'qqqq' });
      instance.findDetailCallback = jest.fn(() => 'findDetailCallback');

      instance.findPlaceDetail();

      expect(findDetail).toBeCalledWith(
        {
          placeId: 'qqqq',
        },
        'findDetailCallback',
      );
    });

    it('should findPlaceDetail() suggestion', () => {
      rendered.setState({ suggestions: [{ name: 'name ' }] });
      instance.findDetailCallback = jest.fn(() => 'findDetailCallback');

      instance.findPlaceDetail(0);

      TEST_HELPERS.expectCalled(findDetail);
    });
  });

  describe('findDetailCallback()', () => {
    const place = {
      geometry: {
        location: {
          lat: jest.fn(),
          lng: jest.fn(),
        },
      },
    };

    it('should findDetailCallback() !place', () => {
      expect(instance.findDetailCallback()()).toBe(null);
    });

    it('should findDetailCallback() !OK', () => {
      expect(instance.findDetailCallback()('place', 'INVALID')).toBe(null);
    });

    it('should findDetailCallback() !lat', () => {
      expect(instance.findDetailCallback()('place', 'OK')).toBe(null);
    });

    it('should findDetailCallback() findTimeZone', () => {
      instance.findTimeZoneCallback = jest.fn();

      instance.findDetailCallback()(place, 'OK');

      TEST_HELPERS.expectCalled(findTimeZone);
      TEST_HELPERS.expectCalled(instance.findTimeZoneCallback);
    });
  });

  describe('findTimeZoneCallback()', () => {
    it('should findTimeZoneCallback()', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      rendered.setProps({});

      instance.findTimeZoneCallback()();

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('handleKey() ArrowUp', () => {
    const openMenu = jest.fn();

    it('should handleKey() open', () => {
      instance.handleKey({ open: true, openMenu })({
        key: 'ArrowUp',
        preventDefault: jest.fn(),
      });

      expect(rendered.state().selectedIndex).toBe(-1);
      TEST_HELPERS.expectNotCalled(openMenu);
    });

    it('should handleKey() !open', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      instance.handleKey({ open: false })({
        key: 'ArrowUp',
        preventDefault: jest.fn(),
      });

      expect(rendered.state().selectedIndex).toBe(-1);
      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('handleKey() ArrowDown', () => {
    const openMenu = jest.fn();

    it('should handleKey()', () => {
      instance.handleKey({ open: true, openMenu })({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
      });

      expect(rendered.state().selectedIndex).toBe(0);
      TEST_HELPERS.expectNotCalled(openMenu);
    });

    it('should handleKey() open', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      instance.handleKey({ open: false })({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
      });

      expect(rendered.state().selectedIndex).toBe(0);
      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('handleKey() Enter', () => {
    it('should handleKey() open', () => {
      instance.selectSuggestion = jest.fn(() => () => true);

      instance.handleKey()({
        key: 'Enter',
        preventDefault: jest.fn(),
      });

      TEST_HELPERS.expectCalled(instance.selectSuggestion);
    });
  });

  describe('handleKey() Escape', () => {
    const closeMenu = jest.fn();

    it('should handleKey() !open', () => {
      instance.selectSuggestion = jest.fn(() => () => true);

      instance.handleKey({ closeMenu })({
        key: 'Escape',
        preventDefault: jest.fn(),
      });

      TEST_HELPERS.expectNotCalled(closeMenu);
    });

    it('should handleKey() open', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      instance.selectSuggestion = jest.fn(() => () => true);

      instance.handleKey({ open: true })({
        key: 'Escape',
        preventDefault: jest.fn(),
      });

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('handleKey() Other', () => {
    it('should handleKey() open', () => {
      instance.selectSuggestion = jest.fn(() => () => true);

      expect(
        instance.handleKey()({
          key: 'Other',
          preventDefault: jest.fn(),
        }),
      ).toBe(true);
    });
  });

  describe('handleSelectManually()', () => {
    it('should handleSelectManually()', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.handleSelectManually()();

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('renderSelectText()', () => {
    it('should return allowInput', () => {
      rendered.setProps({ allowInput: true });

      expect(instance.renderSelectText('input')).toBeDefined();
    });

    it('should renderSelectText !allowInput', () => {
      expect(instance.renderSelectText('input')).toBeDefined();
    });
  });

  describe('renderIcons()', () => {
    it('should renderIcons food', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcons, ['food']);
    });
    it('should renderIcons lodging', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcons, ['lodging']);
    });
    it('should renderIcons airport', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcons, ['airport']);
    });
    it('should renderIcons cafe', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcons, ['cafe']);
    });
  });

  describe('renderSuggestion()', () => {
    it('should renderSuggestion', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSuggestion({}), [
        { types: ['1_2'] },
      ]);
    });

    it('should renderSuggestion !types', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSuggestion({}), [{}]);
    });
  });

  describe('renderSuggestions()', () => {
    it('should renderSuggestions', () => {
      rendered.setProps({ allowInput: true });

      instance.renderSuggestion = jest.fn(() => () => 'renderSuggestion');
      instance.renderSelectText = jest.fn(() => 'renderSelectText');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSuggestions, [
        { suggestions: [1] },
      ]);
    });
  });

  describe('clearSelected()', () => {
    it('should clearSelected()', () => {
      instance.clearSelected();

      expect(rendered.state().inputValue).toBe('');
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      expect(instance.renderButton({})).toBeDefined();
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu', () => {
      instance.renderSuggestions = jest.fn();

      expect(
        instance.renderMenu({
          inputValue: '1',
          suggestions: [2],
        }),
      ).toBeDefined();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      expect(instance.render()).toBeDefined();
    });
  });
});
