import React from 'react';
import { REDIRECT } from 'utils/pageRedirect';
import {
  TEMPLATE_API,
  PUB_API,
  GET_PUB_TEMPLATE_HEADER,
  GET_TEMPLATE_DETAIL,
  BATCH_GET_PUB_TEMPLATE_TAB,
  GET_PUB_TEMPLATE_PEOPLE,
  GET_PEOPLE,
} from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PrintTour } from '../index';
import { FETCH_TEMPLATE } from '../config';
const mockedSaga = {
  analyse: jest.fn(),
  dispatch: jest.fn(),
  setValue: jest.fn(),
  isLoading: jest.fn(),
  dispatchTo: jest.fn(),
};

const history = {
  push: jest.fn(),
  location: {
    pathname: 'http:abc.com/',
  },
};

const matchWithHash = {
  params: {
    hashkey: 'abcd',
    id: 9,
  },
};

const match = {
  params: { id: 9 },
};

describe('PrintTour', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(
      <PrintTour
        resaga={mockedSaga}
        currentQueryDayId={1}
        history={history}
        classes={{}}
      />,
    );
    instance = component.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('componentWillMount', () => {
    it('fetchData shall be called', () => {
      instance.fetchData = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchData).toBeCalled();
    });
  });
  describe('fetchData', () => {
    it('no Id', () => {
      instance.fetchData();
      expect(mockedSaga.dispatch).not.toBeCalledWith(9, FETCH_TEMPLATE);
    });
    it('has id', () => {
      component.setProps({ match });
      instance.fetchData();
      const onSuccess = instance.fetchSuccess;
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        TEMPLATE_API,
        GET_TEMPLATE_DETAIL,
        {
          payload: {
            id: 9,
          },
          onSuccess,
        },
      );
    });
    it('has hashkey', () => {
      component.setProps({ match: matchWithHash });
      instance.fetchData();
      const onSuccess = instance.fetchSuccess;
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        PUB_API,
        GET_PUB_TEMPLATE_HEADER,
        {
          payload: {
            hashkey: 'abcd',
          },
          onSuccess,
        },
      );
    });
  });

  describe('fetchSuccess', () => {
    const param = {
      id: 1,
      tabs: {
        1: { id: 1, customData: { private: true } },
        2: { id: 2, customData: { private: false } },
      },
      photos: [2, 4],
      templates: [3, 4],
    };
    it('resaga set value shall call correctly', () => {
      instance.isOwner = jest.fn(() => true);
      instance.fetchSuccess(param);
      expect(mockedSaga.setValue).toBeCalled();
    });
    it('should call dispatch with FETCH_TAB_HASHKEY', () => {
      const hashkey = 'abcd';
      const payload = { hashkey, items: [param.tabs[2]] };
      component.setProps({ match: matchWithHash });
      const onSuccess = instance.fetchTabSuccess;
      instance.fetchSuccess(param);
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        PUB_API,
        BATCH_GET_PUB_TEMPLATE_TAB,
        {
          payload,
          onSuccess,
        },
      );
    });
  });

  describe('fetchError', () => {
    it('shall redirect to 404', () => {
      instance.fetchError({
        response: {
          error: {
            statusCode: 404,
          },
        },
      });
      expect(history.push).toBeCalledWith(REDIRECT.STATUS_RESOURCE_NOT_FOUND);
    });
    it('shall not redirect to 404', () => {
      instance.fetchError({
        response: {
          error: {
            statusCode: 403,
          },
        },
      });
      expect(history.push).not.toBeCalledWith();
    });
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot with activeid is not day tab', () => {
      component.setProps({ location: { search: 'tab=1' } });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot when fetch is loading', () => {
      const saga = {
        analyse: jest.fn(),
        dispatch: jest.fn(),
        setValue: jest.fn(),
        isLoading: () => true,
      };
      component.setProps({ resaga: saga });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
  describe('renderTourFooterButton', () => {
    it('should be called', () => {
      component.setProps({
        classes: {
          grow: 1,
        },
      });
      instance.renderTourFooterButton();
      expect(toJSON(component)).toMatchSnapshot();
    });
  });
  describe('renderLoading', () => {
    it('should be called', () => {
      instance.renderLoading();
      expect(toJSON(component)).toMatchSnapshot();
    });
  });
  describe('fetchTabSuccess', () => {
    it('should dispatchTo if there is hashkey', () => {
      component.setProps({
        match: {
          params: {
            hashkey: 'hashkey',
          },
        },
      });
      instance.fetchTabSuccess({});
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        PUB_API,
        GET_PUB_TEMPLATE_PEOPLE,
        {
          payload: {
            hashkey: 'hashkey',
          },
        },
      );
    });
    it('should dispatchTo if there is no hashkey', () => {
      component.setProps({
        match: {
          params: {
            id: 1,
          },
        },
      });
      instance.fetchTabSuccess({});
      expect(mockedSaga.dispatchTo).toBeCalledWith(TEMPLATE_API, GET_PEOPLE, {
        payload: {
          id: 1,
        },
      });
    });
    it('should dispatchTo not to be called when printing just the custom tab', () => {
      instance.getTabToPrintId = jest.fn(() => 1);
      component.setProps({
        match: {
          params: {
            id: 1,
          },
        },
      });
      instance.fetchTabSuccess({});
      expect(mockedSaga.dispatchTo).toBeCalled();
    });
  });
  describe('loading', () => {
    it('should not render if it is loading with hashkey', () => {
      component.setProps({
        match: {
          params: {
            hashkey: 'hashkey',
          },
        },
        isFetchingTemplateWithHashkey: true,
      });
      instance.render();
      expect(toJSON(component)).toMatchSnapshot();
    });
  });
  describe('isVisible', () => {
    it('check snapshot', () => {
      expect(toJSON(instance.isVisible('public'))).toMatchSnapshot();
    });
  });
  describe('render', () => {
    it('check snapshot with days > 0', () => {
      component.setProps({ days: { 1: {}, 2: {}, 3: {} } });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot when tabOCustomIds is empty', () => {
      component.setProps({ tabOCustomIds: {} });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot when tabOCustomIds is not empty', () => {
      component.setProps({ tabOCustomIds: { 1: {} }, tabIds: [1, 2, 3] });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
