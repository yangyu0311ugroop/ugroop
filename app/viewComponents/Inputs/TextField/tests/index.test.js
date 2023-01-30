import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TextField } from '..';

const toOption = (value, children) => ({ value, children });

describe('<TextField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    options: [toOption('1', 'One'), toOption('2', 'Two')],
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<TextField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(TextField).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot when props.error', () => {
      wrapper.setProps({ error: true });
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });
  });
});
