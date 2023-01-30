import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { VARIANTS } from 'variantsConstants';

import { IssuedDate } from '../index';

describe('<IssuedDate />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    MOMENT_HELPERS.createUtc = jest.fn(() => 'now');
    rendered = shallow(<IssuedDate {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(IssuedDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange', () => {
    it('should call onChange function and pass the value passed to it', () => {
      const onChange = jest.fn();
      rendered.setProps({ onChange });
      instance.handleChange('value');
      expect(onChange).toBeCalledWith('value');
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

    it('should render correctly if variant is text only', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
