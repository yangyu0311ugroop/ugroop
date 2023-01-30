import { URL_HELPERS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Dashboard } from '../index';

describe('<Dashboard />', () => {
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
    history,
    resaga,
    organisationIdFromURL: 2233,
  };

  beforeEach(() => {
    rendered = shallow(<Dashboard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Dashboard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call goToTourPage', () => {
      instance.goToTourPage = jest.fn();

      instance.componentDidMount();

      expect(instance.goToTourPage).toBeCalledWith(2233);
    });
  });

  describe('goToTourPage()', () => {
    it('should call history.push', () => {
      instance.goToTourPage();

      expect(history.push).toBeCalledWith(URL_HELPERS.orgTours(2233));
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
