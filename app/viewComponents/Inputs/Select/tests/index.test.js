import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Select } from '..';

const toOption = (value, children) => ({ value, children });

describe('<Select />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    options: [toOption('1', 'One'), toOption('2', 'Two')],
  });

  beforeEach(() => {
    wrapper = shallow(<Select {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Select).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if not native', () => {
      wrapper.setProps({ native: false });
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });
  });
});
