import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import Button from 'ugcomponents/Buttons/Button';
import { DialogTitleContent } from '../index';

describe('<DialogTitleContent />', () => {
  let rendered;
  beforeEach(() => {
    rendered = shallow(<DialogTitleContent classes={{}} />);
  });

  it('should exists', () => {
    expect(DialogTitleContent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render custom dialog title', () => {
    rendered.setProps({ dialogTitle: 'Something' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('properly calls preventDefault function', () => {
    const mockPreventDefault = jest.fn();
    const e = { preventDefault: mockPreventDefault };
    const closeButton = rendered.find(Button);
    closeButton.props().onClick(e);
    expect(mockPreventDefault).toBeCalled();
  });

  describe('types', () => {
    it('should render custom type', () => {
      rendered.setProps({ type: 'test' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render to tour type', () => {
      rendered.setProps({ type: 'template' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('templates', () => {
    it('should render add template', () => {
      rendered.setProps({ template: 'add' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render delete template', () => {
      rendered.setProps({ template: 'delete' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render confirm template', () => {
      rendered.setProps({ template: 'confirm' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
