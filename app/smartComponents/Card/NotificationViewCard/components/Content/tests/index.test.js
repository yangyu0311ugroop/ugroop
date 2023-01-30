import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Content } from '../index';

describe('<Content />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Content {...props} />);
    instance = rendered.instance();
  });
  it('renderEmpty', () => {
    expect(toJSON(instance.renderEmpty())).toMatchSnapshot();
  });
  it('renderItem', () => {
    expect(toJSON(instance.renderItem(1))).toMatchSnapshot();
  });
  it('render', () => {
    expect(toJSON(instance.render())).toMatchSnapshot();
  });
  it('while fetch', () => {
    rendered = shallow(<Content {...props} fetching />);
    const inst = rendered.instance();
    expect(toJSON(inst.render())).toMatchSnapshot();
  });
  describe('renderContent', () => {
    it('renderContent with empty array', () => {
      expect(toJSON(instance.renderContent([]))).toMatchSnapshot();
    });
    it('renderContent', () => {
      expect(toJSON(instance.renderContent([1, 2]))).toMatchSnapshot();
    });
  });
});
