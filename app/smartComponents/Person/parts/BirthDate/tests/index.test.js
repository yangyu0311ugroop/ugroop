import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { VARIANTS } from 'variantsConstants';
import { BirthDate } from '../index';

describe('<BirthDate />', () => {
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
    MOMENT_HELPERS.getDateLastYear = jest.fn(() => 'lastYear');
    MOMENT_HELPERS.getDateMiddleLastYear = jest.fn(() => 'middlelastYear');
    rendered = shallow(<BirthDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BirthDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
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
  });
});
