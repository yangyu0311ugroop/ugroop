import React from 'react';
import {
  PUB_API,
  GET_PUB_TEMPLATE_EVENTS,
  GET_PUB_TEMPLATE_PEOPLE,
} from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PublicTemplatePageIndex } from '../index';
const mockedSaga = {
  analyse: jest.fn(),
  dispatch: jest.fn(),
  dispatchTo: jest.fn(),
  setValue: jest.fn(),
  isLoading: jest.fn(),
};

const history = {
  push: jest.fn(),
};

const location = {
  pathname: 'http:abc.com/',
};

describe('PublicTemplatePageIndex', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(
      <PublicTemplatePageIndex
        resaga={mockedSaga}
        currentQueryDayId={1}
        location={location}
        history={history}
        classes={{}}
      />,
    );
    instance = component.instance();
  });
  afterEach(() => jest.clearAllMocks());
  describe('componentWillMount', () => {
    it('fetchData shall be called', () => {
      instance.fetchData = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchData).toBeCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('sets url', () => {
      component.setProps({
        currentQueryDayId: 1,
      });
      const nextProps = {
        currentQueryDayId: 2,
      };
      instance.componentWillReceiveProps(nextProps);
      expect(toJSON(component)).toMatchSnapshot();
    });
  });

  describe('fetchData', () => {
    it('should dispatchTo', () => {
      component.setProps({
        match: {
          params: {
            hashkey: 1,
          },
        },
      });
      instance.fetchData();
      expect(toJSON(component)).toMatchSnapshot();
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        PUB_API,
        GET_PUB_TEMPLATE_EVENTS,
        { payload: { hashkey: 1 } },
      );
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        PUB_API,
        GET_PUB_TEMPLATE_PEOPLE,
        { payload: { hashkey: 1 } },
      );
    });
  });

  describe('render', () => {
    it('check snapshot', () => {
      component.setProps({ templateId: 1, loading: false });
      expect(toJSON(instance.render())).toMatchSnapshot();
    });
    it('check snapshot with activeid is not day tab', () => {
      component.setProps({ location: { search: 'tab=1' } });
      expect(toJSON(instance.render())).toMatchSnapshot();
    });
    it('check snapshot when fetch is loading', () => {
      const saga = {
        analyse: jest.fn(),
        dispatch: jest.fn(),
        setValue: jest.fn(),
        isLoading: () => true,
      };
      component.setProps({ resaga: saga, templateId: 1 });
      expect(toJSON(component.instance().render())).toMatchSnapshot();
    });
  });
  describe('fetchError()  ', () => {
    it('should call resaga.setValue', () => {
      const form = component.instance();
      form.fetchError();
      expect(history.push).toHaveBeenCalled();
    });
  });
});
