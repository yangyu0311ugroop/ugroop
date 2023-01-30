import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PlaceDetail } from 'ugcomponents/Google';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Location } from '../index';

jest.useFakeTimers();

describe('<Location />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    location: 'location',
    handleChange: jest.fn(() => jest.fn()),
    classes: {},
    inline: true,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Location {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Location).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange()', () => {
    let key = 'key';
    const value = 'value';

    it('calls props.handleChange()', () => {
      instance.handleChange(key)(value);
      expect(instance.props.handleChange).toHaveBeenCalledWith(key);
    });

    it('handle props.handleChange() not given', () => {
      rendered.setProps({ handleChange: null });
      expect(() => instance.handleChange(key)(value)).not.toThrow();
    });

    it('sets state[key]', () => {
      instance.handleChange(key)(value);
      expect(rendered.state()[key]).toBe(value);
    });

    it('returns nothing if key is equal to name', () => {
      key = 'name';
      instance.handleChange(key)(value);
    });
  });

  describe('handleSelectSuggest()', () => {
    it('should setState', () => {
      instance.handleSelectSuggest({ place_id: 'some place id' });

      expect(rendered.state().placeId).toBe('some place id');
    });
  });

  describe('openTooltip()', () => {
    it('should setState', () => {
      instance.openTooltip();

      expect(rendered.state().tooltip).toBe(true);
    });
  });

  describe('handlePlaceDetailHover', () => {
    it('should setState', () => {
      instance.handlePlaceDetailHover();
      expect(rendered.state().tooltip).toBe(true);
    });
  });

  describe('closeTooltip()', () => {
    it('should setState', () => {
      instance.closeTooltip();

      expect(rendered.state().tooltip).toBe(false);
    });
  });

  describe('closeTooltipAndMouseover', () => {
    it('should make tooltip and mouseOver to false', () => {
      instance.closeTooltipAndMouseover();

      expect(rendered.state().mouseOver).toBe(false);
      expect(rendered.state().tooltip).toBe(false);
    });
  });

  describe('handleMouseEnter()', () => {
    it('should setState', () => {
      instance.handleMouseEnter();

      expect(rendered.state().mouseOver).toBe(true);
    });
  });

  describe('handleMouseLeave()', () => {
    it('should setState', () => {
      instance.handleMouseLeave();

      expect(rendered.state().mouseOver).toBe(false);
    });
  });

  describe('handleLocationChange()', () => {
    it('should reset placeId', () => {
      rendered.setState({ placeId: '999' });

      instance.handleLocationChange('abc');

      expect(rendered.state().placeId).toBe('');
    });

    it('should reset cache', () => {
      const handleChange2 = jest.fn();
      const handleChange = jest.fn(() => handleChange2);

      rendered.setProps({ handleChange });
      rendered.setState({
        icon: 'icon.gif',
        placeId: '999',
        timeZoneId: 'Australia/Victoria',
        longtitude: 1,
        latitude: 1,
      });

      instance.handleLocationChange('abc');

      expect(rendered.state().icon).toBe('');
      expect(rendered.state().placeId).toBe('');
      expect(rendered.state().timeZoneId).toBe('');
      expect(rendered.state().longtitude).toBe(1);
      expect(rendered.state().latitude).toBe(1);
      expect(handleChange).toBeCalled();
      expect(handleChange.mock.calls).toMatchSnapshot();
      expect(handleChange2).toBeCalled();
      expect(handleChange2.mock.calls).toMatchSnapshot();
    });

    it('handles props.handleChange not given', () => {
      rendered.setProps({ handleChange: null });
      expect(() => instance.handleLocationChange()).not.toThrow();
    });
  });

  describe('handleFocus', () => {
    it('should openSuggest state to be true', () => {
      instance.handleFocus();
      expect(rendered.state().openSuggest).toBe(true);
    });
  });

  describe('handleBlur', () => {
    it('should openSuggest state to be false', () => {
      rendered.setState({
        openSuggest: true,
      });
      instance.handleBlur();
      jest.runAllTimers();
      expect(rendered.state().openSuggest).toBe(false);
    });
  });

  describe('renderLocationTooltip()', () => {
    it('should render correctly', () => {
      rendered.setProps({ placeId: '999' });

      const snapshot = shallow(<div>{instance.renderLocationTooltip()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderInputs()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        editing: true,
        iconInputs: { name: 'icon' },
        placeIdInputs: { name: 'placeId' },
        timeZoneIdInputs: { name: 'timeZoneId' },
      });

      const snapshot = shallow(<div>{instance.renderInputs()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderViewModeIcon', () => {
    it('should be called', () => {
      const name = 'Kampung Attap, Kuala Lumpur, Kuala Lumpur, Malaysia';
      const icon =
        'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png';
      const classes = {
        detail: 'detail',
        grow: 'grow',
      };
      instance.renderViewModeIcon(classes, name, icon);
    });
  });

  describe('renderViewModeLink()', () => {
    it('still matches snapshot if not url', () => {
      const url = 'fake-url.com';
      const snapshot = shallow(
        <div>{instance.renderViewModeLink({}, 'someName', url)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('still matches snapshot if url', () => {
      const url = 'https://www.url.com';
      const snapshot = shallow(
        <div>{instance.renderViewModeLink({}, 'someName', url)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should not return link if canEdit', () => {
      rendered.setProps({
        editable: true,
      });
      const url = 'https://www.url.com';
      const snapshot = shallow(
        <div>{instance.renderViewModeLink({}, 'someName', url)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should not return link if canEdit and not link', () => {
      rendered.setProps({
        editable: true,
        link: false,
      });
      const url = 'https://www.url.com';
      const snapshot = shallow(
        <div>{instance.renderViewModeLink({}, 'someName', url)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderViewMode()', () => {
    it('should render !editable', () => {
      rendered.setProps({ editable: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderViewMode);
    });

    it('should return null', () => {
      rendered.setProps({ showViewMode: false });

      expect(instance.renderViewMode()).toBe(null);
    });

    it('should return false', () => {
      rendered.setProps({ editable: true });
      rendered.setState({ name: false });

      expect(instance.renderViewMode()).toBe(false);
    });
  });

  describe('renderEditMode()', () => {
    it('should render correctly', () => {
      rendered.setState({ placeId: '999' });

      const snapshot = shallow(<div>{instance.renderEditMode()}</div>);

      PlaceDetail.displayName = 'PlaceDetail';
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderInputsWithView()', () => {
    it('should render correctly', () => {
      instance.renderInputs = () => 'renderInputs';
      instance.renderViewMode = () => 'renderViewMode';

      const snapshot = shallow(<div>{instance.renderInputsWithView()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render location view mode', () => {
      instance.renderViewMode = () => 'renderViewMode';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render location edit mode with view link', () => {
      instance.renderInputsWithView = () => 'renderInputsWithView';
      rendered.setProps({ editingWithViewLink: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render location edit mode', () => {
      instance.renderEditMode = () => 'renderEditMode';
      rendered.setProps({ editing: true, noGridItem: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
