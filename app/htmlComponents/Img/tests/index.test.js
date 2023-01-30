import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ImgTest as Img } from '../index';

describe('<Img />', () => {
  let rendered;
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const image =
    'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350';

  const props = {
    classes: {},
    resaga,
  };
  describe('Img/tests/index.test.js', () => {
    beforeEach(() => {
      rendered = shallow(<Img src={image} alt="image" {...props} />);
    });

    describe('smoke tests', () => {
      it('should exist', () => {
        expect(Img).toBeDefined();
      });

      it('should render without exploding', () => {
        expect(rendered.length).toBe(1);
      });

      it('should render properly', () => {
        expect(toJSON(rendered)).toMatchSnapshot();
      });
    });
  });
});
