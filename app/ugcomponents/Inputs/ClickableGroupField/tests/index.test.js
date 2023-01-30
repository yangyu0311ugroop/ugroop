/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Button from 'ugcomponents/Buttons/Button';
import { ClickableGroupField } from '..';

describe('<ClickableGroupField />', () => {
  let wrapper;
  let props;

  const makeProps = () => ({
    name: 'someName',
    onChange: jest.fn(),
    children: [1, 2].map(i => <Button key={i}>child {i}</Button>),
    getValue: () => '1',
    setValue: jest.fn(),
    classes: { unselected: 'unselected' },
  });

  beforeEach(() => {
    props = makeProps();
    wrapper = shallow(<ClickableGroupField {...props} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(ClickableGroupField).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('sets value on click', () => {
      wrapper
        .find(Button)
        .first()
        .simulate('click');
      expect(props.setValue).toBeCalledWith('1');
    });

    it('calls props.onChange on unselected click', () => {
      wrapper.setProps({ getValue: () => '2' });
      wrapper
        .find(Button)
        .first()
        .simulate('click');
      expect(props.onChange).toBeCalledWith('1');
    });

    it('not calls props.onChange on selected click', () => {
      wrapper
        .find(Button)
        .first()
        .simulate('click');
      expect(props.onChange).not.toBeCalled();
    });
  });
});
