import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { URL_HELPERS } from 'appConstants';
import { PeopleTabRedirect } from '../index';

describe('<PeopleTabRedirect />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: {},
    children: jest.fn(),
    resaga,
    history,
  };

  beforeEach(() => {
    rendered = shallow(<PeopleTabRedirect {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(PeopleTabRedirect).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getPeopleTabUri', () => {
    it('should return a url with tab index', () => {
      const newProps = {
        peopleTabIndex: 1,
        templateId: 1,
      };
      rendered.setProps(newProps);

      expect(instance.getPeopleTabUri()).toEqual(
        `${URL_HELPERS.tours(1)}?tab=1`,
      );
    });

    it('should return a url with tabId index', () => {
      const newProps = {
        peopleTabIndex: -1,
        templateId: 1,
        peopleTabId: 1,
      };
      rendered.setProps(newProps);

      expect(instance.getPeopleTabUri()).toEqual(
        `${URL_HELPERS.tours(1)}?tabId=1`,
      );
    });
  });

  describe('handleCreateTabSuccess', () => {
    it('should set value of the crucial redux stores to make sure people tab migration work properly', () => {
      const newProps = {
        calculatedVisibleChildren: [1, 2, 3],
        templateId: 1,
      };
      const node = {
        id: 3,
      };
      const args = {
        peopleView: 'aaa',
      };

      rendered.setProps(newProps);
      instance.handleCreateTabSuccess(args)({ node });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('handlePeopleRedirect', () => {
    it('should only set the peopleView and push in history a particular uri', () => {
      rendered.setProps({
        peopleTabIndex: 0,
      });
      instance.handlePeopleRedirect({ peopleView: 'qqq' })();

      expect(history.push).toBeCalled();
      expect(resaga.setValue).toBeCalledWith({ peopleView: 'qqq' });
    });

    it('should only set the peopleView ', () => {
      rendered.setProps({
        nodeChildren: [2],
        peopleTabId: 2,
        redirect: false,
      });
      instance.handlePeopleRedirect({ peopleView: 'qqq' })();
      expect(resaga.setValue).toBeCalledWith({ peopleView: 'qqq' });
    });
    it('should only set the peopleView and push in history a particular uri if people tab exist in tour', () => {
      rendered.setProps({
        nodeChildren: [2],
        peopleTabId: 2,
      });
      instance.handlePeopleRedirect({ peopleView: 'qqq' })();

      expect(history.push).toBeCalled();
      expect(resaga.setValue).toBeCalledWith({ peopleView: 'qqq' });
    });
    it('should dispatch to creating nextNode if peopleTabIndex > -1', () => {
      rendered.setProps({
        peopleTabIndex: -1,
        templateId: 1,
        calculatedVisibleChildren: [2],
      });
      instance.handlePeopleRedirect({ peopleView: 'qqq' })();

      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
