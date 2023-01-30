import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { InterestPage } from '../index';

describe('<InterestPage />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const params = {
    id: 9,
    hashkey: 'abcd',
  };

  const props = {
    history: { push: jest.fn() },
    classes: {},
    resaga,
    match: { params },
  };

  beforeEach(() => {
    rendered = shallow(<InterestPage {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(InterestPage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render loading', () => {
      rendered.setProps({ isFetchingTemplate: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('fetchSuccess', () => {
    const normalisedResults = {
      tabs: { 1: { id: 1, customData: { private: false } } },
    };

    it('should call dispatchTo', () => {
      instance.fetchSuccess(normalisedResults);
      expect(resaga.dispatchTo).toBeCalled();
    });
    it('should call redirect if disable ryi', () => {
      instance.fetchSuccess({ id: 1, templates: { 1: { disableRYI: true } } });
      expect(instance.props.history.push.mock.calls).toMatchSnapshot();
    });
    it('should not call dispatchTo', () => {
      rendered.setProps({ match: null });
      instance.fetchSuccess(normalisedResults);
      expect(resaga.dispatchTo).not.toBeCalled();
    });
  });

  describe('fetchError', () => {
    it('redirects to 404', () => {
      instance.fetchError();
      expect(instance.props.history.push.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderDescription', () => {
    it('should render renderDescription', () => {
      const snapshot = shallow(
        <div>{instance.renderDescription({ content: 'abcd' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('fetchData', () => {
    it('should render properly w/o hashkey', () => {
      rendered.setProps({ match: null });
      const snapshot = shallow(<div>{instance.fetchData()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('fetchTabSuccess', () => {
    it('should dispatchTo if there is hashkey', () => {
      instance.fetchTabSuccess();
      expect(resaga.dispatchTo).toBeCalled();
    });
    it('should not call dispatchTo', () => {
      rendered.setProps({ match: null });
      instance.fetchTabSuccess();
      expect(resaga.dispatchTo).not.toBeCalled();
    });
  });
});
