import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SelectField } from '..';

const toOption = (value, children) => ({ value, children });

describe('<SelectField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    options: [toOption('1', 'One'), toOption('2', 'Two')],
  });

  beforeEach(() => {
    wrapper = shallow(<SelectField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(SelectField).toBeDefined();
  });

  describe('#renderOptions()', () => {
    it('still matches snapshot if native', () => {
      wrapper.setProps({ SelectProps: { native: true } });
      expect(instance.renderOptions(instance.props.options));
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if not native', () => {
      wrapper.setProps({ SelectProps: { native: false } });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
