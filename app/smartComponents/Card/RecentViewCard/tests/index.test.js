import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { GET_RECENT_ACTIVITY, USER_API } from 'apis/constants';
import { RecentViewCard } from '../index';

describe('<RecentViewCard />', () => {
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
    rendered = shallow(<RecentViewCard {...props} />);
    instance = rendered.instance();
  });
  it('fetchRecentActivity', () => {
    instance.fetchRecentActivity();
    expect(resaga.dispatchTo).toBeCalledWith(USER_API, GET_RECENT_ACTIVITY, {});
  });
  it('componentDidMount', () => {
    instance.componentDidMount();
    expect(resaga.dispatchTo).toBeCalledWith(USER_API, GET_RECENT_ACTIVITY, {});
  });
  it('shall match with snapshot', () => {
    const view = shallow(instance.render());
    expect(toJSON(view)).toMatchSnapshot();
  });
  it('with fix height shall match with snapshot', () => {
    rendered = shallow(<RecentViewCard {...props} fixHeight />);
    instance = rendered.instance();
    const view = shallow(instance.render());
    expect(toJSON(view)).toMatchSnapshot();
  });
});
