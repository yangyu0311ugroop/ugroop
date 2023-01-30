import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SelectButton } from '..';

describe('<SelectButton />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      select: 'select',
      selectIcon: 'icon',
      selectValueRoot: 'root',
    },
    renderValue: () => 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<SelectButton {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(SelectButton).toBeDefined();
  });

  describe('#getSelectClasses()', () => {
    it('returns this.SelectClasses if already exists', () => {
      const SelectClasses = 'SelectClasses';
      instance.SelectClasses = SelectClasses;
      expect(instance.getSelectClasses()).toBe(SelectClasses);
    });
  });

  describe('#getSelectMenuProps()', () => {
    it('returns this.SelectMenuProps if already exists', () => {
      const SelectMenuProps = 'SelectMenuProps';
      instance.SelectMenuProps = SelectMenuProps;
      expect(instance.getSelectMenuProps()).toBe(SelectMenuProps);
    });
  });

  describe('#getSelectValueContainerClasses()', () => {
    it('returns this.SelectValueContainer if already exists', () => {
      const SelectValueContainer = 'SelectValueContainer';
      instance.SelectValueContainer = SelectValueContainer;
      expect(instance.getSelectValueContainerClasses()).toBe(
        SelectValueContainer,
      );
    });
  });

  describe('#renderValue()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(instance.renderValue('value'))).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#renderValue()', () => {
      expect(() => {
        SelectButton.defaultProps.renderValue();
      }).not.toThrow();
    });
  });
});
