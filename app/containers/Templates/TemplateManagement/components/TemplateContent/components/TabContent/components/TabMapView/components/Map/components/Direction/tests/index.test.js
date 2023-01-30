import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Direction } from '../index';

describe('<Direction />', () => {
  let rendered;
  let instance;
  let route;

  beforeEach(() => {
    route = jest.fn();
    window.google = jest.fn();
    window.google.maps = {
      DirectionsService: jest.fn(() => ({
        route,
      })),
      LatLng: jest.fn(),
      TravelMode: {
        DRIVING: '',
      },
      DirectionsStatus: {
        OK: '',
      },
    };
    rendered = shallow(<Direction />);
    instance = rendered.instance();
  });

  it('should exist', () => {
    expect(Direction).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getDirections', () => {
    it('should setState to result if status is OK', () => {
      instance.getDirections(null, 'OK');
      expect(rendered.state().directions).toEqual(null);
    });
    it('should show an error if status is not OK', () => {
      const snap = shallow(<div>{instance.render()}</div>);
      instance.getDirections('', '');
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should return null if there are no directions', () => {
      rendered.setState({
        directions: false,
      });
      expect(instance.render()).toEqual(null);
    });
    it('should return match snapshot if there are directions', () => {
      rendered.setState({
        directions: true,
      });
      const snap = shallow(<div>{instance.render()}</div>);
      expect(snap).toMatchSnapshot();
    });
  });
});
