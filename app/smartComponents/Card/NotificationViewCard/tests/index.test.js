import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NotificationViewCard } from '../index';

describe('<NotificationViewCard />', () => {
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
    rendered = shallow(<NotificationViewCard {...props} />);
    instance = rendered.instance();
  });
  it('shall match with snapshot', () => {
    const view = shallow(instance.render());
    expect(toJSON(view)).toMatchSnapshot();
  });
  it('with fix height shall match with snapshot', () => {
    rendered = shallow(<NotificationViewCard {...props} fixHeight />);
    instance = rendered.instance();
    const view = shallow(instance.render());
    expect(toJSON(view)).toMatchSnapshot();
  });
});
