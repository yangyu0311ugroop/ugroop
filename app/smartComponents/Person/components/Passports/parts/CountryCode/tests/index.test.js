import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { COUNTRY_LIST_HELPERS } from 'utils/countrylist';
import { VARIANTS } from 'variantsConstants';
import { CountryCode } from '../index';

describe('<CountryCode />', () => {
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
    COUNTRY_LIST_HELPERS.getCountryList = jest.fn(() => []);
    rendered = shallow(<CountryCode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CountryCode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render if variant is default and countryCode is not NONE', () => {
      rendered.setProps({
        countryCode: 'PH',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text field', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text only', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is inline', () => {
      rendered.setProps({
        variant: VARIANTS.INLINE,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render correctly if variant is inline and country code is not none', () => {
      rendered.setProps({
        variant: VARIANTS.INLINE,
        countryCode: 'PH',
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render correctly if variant is text field and country code is not none', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
        countryCode: 'PH',
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
