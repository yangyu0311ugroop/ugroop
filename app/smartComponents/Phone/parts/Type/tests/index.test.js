import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { PHONE_TYPES } from 'smartComponents/Phone/constants';
import { Type } from '../index';

describe('<Type />', () => {
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
    rendered = shallow(<Type {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Type).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is editable', () => {
      rendered.setProps({
        variant: VARIANTS.SELECT_FIELD,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is icon only', () => {
      rendered.setProps({
        variant: 'iconOnly',
      });
      Object.keys(PHONE_TYPES).forEach(key => {
        rendered.setProps({
          type: key,
        });
        const snapshot = shallow(<div>{instance.render()}</div>);

        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });
    it('should render correctly if variant is icon only', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
