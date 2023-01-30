import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { ViewLayout } from '../index';

describe('<ViewLayout />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    photo: '/FileContainer/asdasdasdasd.jpg',
  };

  beforeEach(() => {
    rendered = shallow(<ViewLayout {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ViewLayout).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleShowMore', () => {
    it('should set showOtherFields state reversed value of the showOtherFields', () => {
      instance.handleShowMore();
      expect(rendered.state().showOtherFields).toBe(true);

      instance.handleShowMore();
      expect(rendered.state().showOtherFields).toBe(false);
    });
  });

  describe('renderInfo', () => {
    it('should render the info properly', () => {
      const snapshot = shallow(<div>{instance.renderInfo()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPhoto', () => {
    it('should render the photo if photo should be shown', () => {
      instance.shouldNotShowPhoto = jest.fn(() => false);
      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should not render the photo if photo should not be shown', () => {
      instance.shouldNotShowPhoto = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderInfo = jest.fn(() => 'renderInfo');
      instance.renderPhoto = jest.fn(() => 'renderPhoto');
      instance.getButtonLabel = jest.fn(() => 'getButtonLabel');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
