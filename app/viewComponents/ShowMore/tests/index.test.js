import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { ShowMore } from '..';

describe('<ShowMore />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    initialMore: true,
    renderMore: () => 'more',
  });

  beforeEach(() => {
    wrapper = shallow(<ShowMore {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(ShowMore).toBeDefined();
  });

  describe('#handleShowMoreClick()', () => {
    it('toggles state.more', () => {
      instance.handleShowMoreClick({ preventDefault: jest.fn() });
      expect(instance.state.more).toBe(true);
      expect(instance.getMore()).toBe(true);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if props.initialMore=false', () => {
      wrapper.setProps({ initialMore: false });
      expect(toJSON(instance.render())).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#renderMore()', () => {
      expect(() => {
        ShowMore.defaultProps.renderMore();
      }).not.toThrow();
    });
  });
});
