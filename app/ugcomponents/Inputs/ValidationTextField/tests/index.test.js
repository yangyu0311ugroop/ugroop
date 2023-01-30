/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import PasswordHelpBlock from 'ugcomponents/Form/components/PasswordHelpBlock';
import { ValidationTextField } from '../index';

describe('ValidationTextField/tests/index.test.js', () => {
  const name = 'ThisTextField';
  const event = { target: { type: 'text' } };
  const eventNotText = { target: { type: 'button' } };

  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <ValidationTextField
        classes={{ inputCentered: 'inputCentered' }}
        name={name}
      />,
    );
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(ValidationTextField).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('getInputProps()  ', () => {
    it('still matches snapshot when disabled', () => {
      rendered.setProps({ centered: true });
      expect(instance.getInputProps()).toEqual({
        classes: { input: instance.props.classes.inputCentered },
      });
    });
  });

  describe('getInputLabelProps()  ', () => {
    it('still matches snapshot when disabled', () => {
      expect(instance.getInputLabelProps(true)).toEqual({ shrink: true });
    });
  });

  describe('handleFocus()  ', () => {
    it('should setState', () => {
      instance.handleFocus(event);
      expect(rendered.state().active).toBe(true);
    });
    it('should call onFocus', () => {
      const onFocus = jest.fn();
      rendered = shallow(
        <ValidationTextField classes={{}} name={name} onFocus={onFocus} />,
      );
      instance = rendered.instance();
      instance.handleFocus(event);
      expect(rendered.state().active).toBe(true);
      expect(onFocus).toBeCalledWith(event);
    });
  });

  describe('handleBlur()  ', () => {
    it('should setState', () => {
      instance.handleBlur(event);
      expect(rendered.state().active).toBe(false);
    });
    it('should call onFocus', () => {
      const onBlur = jest.fn();
      rendered = shallow(
        <ValidationTextField classes={{}} name={name} onBlur={onBlur} />,
      );
      instance = rendered.instance();
      instance.setState({ active: true });
      instance.handleBlur(event);
      expect(rendered.state().active).toBe(false);
      expect(onBlur).toBeCalledWith(event);
    });
    it('should not call onFocus if not event.target.text', () => {
      const onBlur = jest.fn();
      rendered = shallow(
        <ValidationTextField classes={{}} name={name} onBlur={onBlur} />,
      );
      instance = rendered.instance();
      instance.setState({ active: true });
      instance.handleBlur(eventNotText);
      expect(rendered.state().active).toBe(true);
      expect(onBlur).not.toBeCalled();
    });
  });

  describe('render()  ', () => {
    it('customHelpBlock', () => {
      const MockDiv = <div>customHelpBlock</div>;
      const customHelpBlock = jest.fn(() => MockDiv);
      rendered = shallow(
        <ValidationTextField
          classes={{}}
          name={name}
          customHelpBlock={customHelpBlock}
        />,
      );
      instance = rendered.instance();

      const renderHelpBlock = shallow(instance.render());
      expect(renderHelpBlock.contains(MockDiv)).toBe(true);
      expect(customHelpBlock).toBeCalled();
    });
    it('passwordHelpBlock true visibility false', () => {
      rendered = shallow(
        <ValidationTextField classes={{}} name={name} passwordHelpBlock />,
      );
      instance = rendered.instance();

      const renderHelpBlock = shallow(instance.render());
      expect(renderHelpBlock.find(PasswordHelpBlock).length).toBe(1);
    });
    it('passwordHelpBlock true visibility true', () => {
      rendered = shallow(
        <ValidationTextField
          classes={{}}
          name={name}
          passwordHelpBlock
          error
        />,
      );
      instance = rendered.instance();

      const renderHelpBlock = shallow(instance.render());
      expect(renderHelpBlock.find(PasswordHelpBlock).length).toBe(1);
    });

    it('not renders when hidden', () => {
      rendered.setProps({ type: 'hidden' });
      expect(instance.render()).toBeNull();
    });
  });
});
