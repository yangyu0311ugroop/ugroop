/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EventDataId } from '..';

describe('<EventDataId />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    children: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<EventDataId {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(EventDataId).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('calls render prop with props.dataId', () => {
      instance.render();
      expect(instance.props.children).toBeCalledWith(instance.props.dataId);
    });
  });
});
