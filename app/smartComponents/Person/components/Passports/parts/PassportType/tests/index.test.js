import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PASSPORT_TYPES } from 'smartComponents/Person/components/Passports/parts/PassportType/constants';
import { VARIANTS } from 'variantsConstants';
import { PassportType } from '../index';

describe('<PassportType />', () => {
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
    rendered = shallow(<PassportType {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PassportType).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getValue', () => {
    it('should return the label for the passportType selected if it exist in our passport list', () => {
      rendered.setProps({
        passportType: PASSPORT_TYPES[1].value,
      });
      const result = instance.getValue();
      expect(result).toBe(PASSPORT_TYPES[1].children);
    });

    it('should return the passportType value as is if it does not exist in our passport list', () => {
      rendered.setProps({
        passportType: 'eternal',
      });
      const result = instance.getValue();
      expect(result).toBe('eternal');
    });
  });

  describe('onChange', () => {
    it('should change showTextField state to true if value passed to it is other', () => {
      instance.onChange(PASSPORT_TYPES[PASSPORT_TYPES.length - 1].value);
      expect(rendered.state().showTextField).toBe(true);
    });
    it('should change showTextField state to false if value passed to it is not other and showTextField is true', () => {
      rendered.setState({
        showTextField: true,
      });
      instance.onChange(PASSPORT_TYPES[0].value);
      expect(rendered.state().showTextField).toBe(false);
    });
    it('should retain state if showTextField is false', () => {
      rendered.setState({
        showTextField: false,
      });
      instance.onChange(PASSPORT_TYPES[0].value);
      expect(rendered.state().showTextField).toBe(false);
    });
  });

  describe('onClose', () => {
    it('should set showTextField state to false if selected passport type is not other', () => {
      rendered.setState({
        showTextField: true,
      });
      instance.onClose();
      expect(rendered.state().showTextField).toBe(false);
    });

    it('should not set showTextField state to false if select passport type is not within the passport types', () => {
      rendered.setProps({
        passportType: 'qqq',
      });
      rendered.setState({
        showTextField: true,
      });
      instance.onClose();
      expect(rendered.state().showTextField).toBe(true);
    });
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

    it('should render correctly if variant is text field and showTextField state is true', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
      });
      rendered.setState({
        showTextField: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text field and showTextField state is true', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
      });
      rendered.setProps({
        passportType: 'eternal',
      });
      rendered.setState({
        showTextField: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text only', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      rendered.setProps({
        passportType: PASSPORT_TYPES[1].value,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text only and variant is other', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      rendered.setProps({
        passportType: PASSPORT_TYPES[PASSPORT_TYPES.length - 1].value,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
