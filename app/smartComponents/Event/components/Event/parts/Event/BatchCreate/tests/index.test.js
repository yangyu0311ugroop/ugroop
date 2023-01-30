/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { BatchCreate } from '..';

describe('<BatchCreate />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      root: 'root',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    formBatchCreate: true,
  });

  beforeEach(() => {
    wrapper = shallow(<BatchCreate {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(BatchCreate).toBeDefined();
  });

  describe('#handleChange()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      const checked = false;
      instance.handleChange(null, checked);
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
