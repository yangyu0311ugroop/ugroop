/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { ActivityStartEnd } from '..';

describe('<ActivityStartEnd />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<ActivityStartEnd {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(ActivityStartEnd).toBeDefined();
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderEditable()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('renderFieldBatchCreate', () => {
    it('should match snapshot if isCreating is true', () => {
      instance.isCreating = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderFieldBatchCreate()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
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
