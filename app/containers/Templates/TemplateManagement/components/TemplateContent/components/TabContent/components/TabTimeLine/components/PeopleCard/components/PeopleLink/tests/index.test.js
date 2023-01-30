import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PeopleLink } from '../index';

describe('<PeopleLink />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    location: {
      path: 'somewhere',
    },
  };

  beforeEach(() => {
    rendered = shallow(<PeopleLink {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PeopleLink).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getPeopleTabUrl', () => {
    it('should match snapshot', () => {
      rendered.setProps({ peopleTabIndex: -1, calculatedPeopleTabId: 100 });
      const snapshot = shallow(<div>{instance.getPeopleTabUrl()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('setPeopleView', () => {
    it('should match snapshot', () => {
      instance.setPeopleView({ peopleView: 'test' })();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('showLink', () => {
    it('Should return true if has access', () => {
      rendered.setProps({
        calculatedVisibleChildren: [1],
        calculatedPeopleTabId: 1,
      });
      instance.canCreate = jest.fn(() => true);
      expect(instance.showLink()).toEqual(true);
    });
    it('Should return true if person tab is not yet created and has access', () => {
      rendered.setProps({
        calculatedPeopleTabId: -1,
      });
      instance.canCreate = jest.fn(() => true);
      expect(instance.showLink()).toEqual(true);
    });
  });
  /* describe('renderSeeMore', () => {
    it('should match snapshot', () => {
      const innerProps = {
        handlePeopleRedirect: jest.fn(() => jest.fn()),
      };
      ability.can = jest.fn(() => true);

      const snapshot = shallow(
        <div>{instance.renderSeeMore()(innerProps)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot when no people', () => {
      const innerProps = {
        handlePeopleRedirect: jest.fn(() => jest.fn()),
      };
      rendered.setProps({ people: [1] });
      ability.can = jest.fn(() => true);

      const snapshot = shallow(
        <div>{instance.renderSeeMore()(innerProps)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  }); */

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      instance.showLink = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ peopleTabIndex: 1 });
      instance.showLink = jest.fn(() => true);
      instance.canCreate = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
