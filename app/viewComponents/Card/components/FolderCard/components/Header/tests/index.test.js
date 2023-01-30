import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;

  const props = {
    id: 1,
    baseUrl: 'baseUrl',
    content: 'content',
    tourCount: 2,
    folderCount: 3,
    images: ['image'],
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
  });

  describe('render', () => {
    it('should match snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
