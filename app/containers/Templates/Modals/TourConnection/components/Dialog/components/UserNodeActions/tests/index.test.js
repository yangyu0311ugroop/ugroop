import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';

import { UserNodeActions } from '../index';

describe('UserNodeActions', () => {
  const resagaMock = {
    setValue: jest.fn(),
  };

  const props = {
    classes: {},
    resaga: resagaMock,
  };

  let rendered;
  beforeEach(() => {
    rendered = shallow(<UserNodeActions userId={1} nodeId={1} {...props} />);
    jest.clearAllMocks();
  });

  describe('<UserNodeActions />', () => {
    it('should exists', () => {
      expect(UserNodeActions).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('render()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
