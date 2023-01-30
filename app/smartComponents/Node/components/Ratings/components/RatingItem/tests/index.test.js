import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Content } from 'smartComponents/Node/parts';

import { RatingItem } from '../index';

describe('<RatingItem />', () => {
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
    rendered = shallow(<RatingItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RatingItem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderRatingComment', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRatingComment()}</div>);
      const renderProp = snapshot.find(Content).renderProp('children')(1);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(toJSON(renderProp)).toMatchSnapshot();
    });
  });

  describe('renderRateDetails', () => {
    it('should match snapshot', () => {
      instance.renderRatingHeader = jest.fn(() => 'renderRatingHeader');
      instance.renderRatingComment = jest.fn(() => 'renderRatingComment');
      instance.renderRatingDate = jest.fn(() => 'renderRatingDate');

      const snapshot = shallow(<div>{instance.renderRateDetails()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRaterAvatar', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRaterAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderRaterAvatar = jest.fn(() => 'renderRaterAvatar');
      instance.renderRateDetails = jest.fn(() => 'renderRateDetails');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
