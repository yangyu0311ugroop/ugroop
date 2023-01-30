import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { IsDefault } from '../index';

describe('<IsDefault />', () => {
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
    rendered = shallow(<IsDefault {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(IsDefault).toBeDefined();
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
        variant: VARIANTS.CHECKBOX_FIELD,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is badge', () => {
      rendered.setProps({
        variant: VARIANTS.BADGE,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is badge and isDefault', () => {
      rendered.setProps({
        variant: VARIANTS.BADGE,
        isDefault: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
