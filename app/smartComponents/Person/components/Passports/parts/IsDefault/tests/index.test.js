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

  describe('renderCheckboxLabel()', () => {
    it('should render correctly based on the passed props', () => {
      const scenarios = [true, false];

      scenarios.forEach(scenario => {
        const snapshot = shallow(
          <div>{instance.renderCheckboxLabel({ isChecked: scenario })}</div>,
        );
        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if isDefault is true and variant is text only', () => {
      rendered.setProps({
        isDefault: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly and variant is string only', () => {
      rendered.setProps({
        variant: VARIANTS.STRING_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly and variant is string only and isDefault is true', () => {
      rendered.setProps({
        variant: VARIANTS.STRING_ONLY,
      });

      rendered.setProps({
        isDefault: true,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant checkbox', () => {
      rendered.setProps({
        variant: VARIANTS.CHECKBOX_FIELD,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant checkbox and isChecked is true', () => {
      rendered.setProps({
        variant: VARIANTS.CHECKBOX_FIELD,
      });
      rendered.setProps({
        isChecked: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
