import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { withGoogleMaps } from '../hoc';

describe('withGoogleMaps', () => {
  let rendered;
  let instance;
  beforeEach(() => {
    const component = () => <div>Yo</div>;
    const placeId = 1;
    const GenericGoogleMap = withGoogleMaps(placeId)(component);
    rendered = shallow(<GenericGoogleMap />);
    instance = rendered.instance();
  });
  it('should return WithGoogleMaps component', () => {
    const component = () => <div>Yo</div>;
    const placeId = 1;
    const GenericGoogleMap = withGoogleMaps(placeId)(component);
    expect(GenericGoogleMap.displayName).toBe('WithGoogleMaps');
  });

  describe('GenericGoogleMaps component', () => {
    describe('renderContent', () => {
      it('should render the wrapped component', () => {
        const content = shallow(<div>{instance.renderContent({ a: 1 })}</div>);
        expect(toJSON(content)).toMatchSnapshot();
      });
    });
    describe('render', () => {
      it('should render GoogleMaps component', () => {
        expect(toJSON(rendered)).toMatchSnapshot();
      });
    });
  });
});
